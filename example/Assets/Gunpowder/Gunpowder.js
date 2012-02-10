// State information for specs
static var currentSimulation = {};
static var currentSpecContext;
static var specsToRun = new Array();
static var beforesToRun = new Array();
static var aftersToRun = new Array();
static var simulationsToRun = new Array();
static var specMessageContext = new Array();
static var failedExpectations = new Array();
static var specCount = 0;
static var failCount = 0;
static var pendingCount = 0;
static var failedExpectation = false;
static var specsFinished = false;
static var sceneName;

// Selector methods
function find(objectName) { 
  return selector.find(objectName); 
}

// Simulate methods
function move(direction, milliseconds, callback) {
  simulate.move(direction, milliseconds, callback);
}

function pressButton(button, milliseconds, callback) {
  simulate.buttonPress(button, milliseconds, callback);
}

function pressKey(key, milliseconds, callback) {
  simulate.keyPress(key, milliseconds, callback);
}

function waits(milliseconds, callback) {
  simulate.waits(milliseconds, callback);
}

// Spec DSL
function loadScene(name) { 
  sceneName = name; 
};

function beforeEach(func) { 
  beforesToRun.Push(func); 
};

function afterEach(func) {
  aftersToRun.Push(func);
}

function context(name, func) { 
  describe(name, func); // Alias 
};

function describe(name, func) {
  specMessageContext.Push(name);
  
  runTestPreparatorsAround(func);
  
  specMessageContext.Pop();
};

function expect(actual) { 
  return new Matcher(actual); 
};

function match(actual) { 
  return new Matcher(actual, {'showErrors': false}); 
};

function xit(name, func) { 
  it(name); // Alias 
}

function it(name) { 
  it(name, function(){});
  pendingCount++;
}

function it(name, func) {
  specsToRun.Push({
    'befores': new Array(beforesToRun),
    'afters': new Array(aftersToRun),
    'spec': func,
    'context': buildContextString(name)
  });
}

// Will be overridden by spec
function run() {}

function Start() {
  if(!specsFinished) {
    if(specsToRun.length == 0) {
      beginSpecs();
    } else {
      runNextSpec();
      updateSpecResults();
      yield runSimulations();
      resetScene();
    }
  } else {
    Debug.Log(specResults());
  }
}

static var Input = new Wrapper();

private

var simulate = new Simulate();

var selector = new Selector();

function runSimulations() {
  while(simulationsToRun.length != 0) {
    currentSimulation = simulationsToRun.Shift();
    yield WaitForSeconds(currentSimulation['milliseconds']/1000.0);
    currentSimulation['callback']();
    currentSimulation = {};
  }
}

function resetScene() {
  Application.LoadLevel(sceneName);
}

function beginSpecs() {
  Debug.Log('Running Gunpowder specs...');
  run();
  specCount += specsToRun.length;
  Start();
}

function runNextSpec() {
  if(specsToRun.length == 1) { specsFinished = true; }
  
  var nextSpec = specsToRun.Shift();
  
  for(var before in nextSpec['befores']) { before(); }
  
  currentSpecContext = nextSpec['context'];
  nextSpec['spec']();
  
  for(var after in nextSpec['afters']) { after(); }
  
  while(failedExpectations.length != 0) {
    var error = failedExpectations.Pop();
    Debug.LogError(error);
  }
}

function updateSpecResults() {
  if(failedExpectation) { 
    failCount++;
    failedExpectation = false;
  }
}

function buildContextString(name) {
  var context = '';
  for(var index = 0; index < specMessageContext.length; index++) {
    context += (specMessageContext[index] + ' > ');
  }
  return context + name;
}

function runTestPreparatorsAround(func) {
  var beforeDescribeBeforesLength = beforesToRun.length;
  var beforeDescribeAftersLength = aftersToRun.length;
  
  func();
  
  var afterDescribeBeforesLength = beforesToRun.length;
  var afterDescribeAftersLength = aftersToRun.length;
  
  var index;
  
  for(index = 0; index < (afterDescribeBeforesLength - beforeDescribeBeforesLength); index++) { 
    beforesToRun.Pop(); 
  }
  
  for(index = 0; index < (afterDescribeAftersLength - beforeDescribeAftersLength); index++) { 
    aftersToRun.Pop(); 
  }
}

function specResults() {
  var passOrFail = failCount > 0 ? 'FAIL: ' : 'PASS: ';
  var output = passOrFail + specCount + ' specs, ' + failCount + ' failures, ' + pendingCount + ' pending, ' + Time.time + ' secs.';
  return output;
}