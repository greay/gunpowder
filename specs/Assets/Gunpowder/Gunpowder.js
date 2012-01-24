// Statinformation for specs
static var currentSimulation = {};
static var currentSpecContext;
static var specsToRun = new Array();
static var beforesToRun = new Array();
static var simulationsToRun = new Array();
static var specMessageContext = new Array();
static var specCount = 0;
static var failCount = 0;
static var pendingCount = 0;
static var failedExpectation = false;
static var specsFinished = false;
static var sceneName;

// Selector methods
function _() { 
  return new Selector(''); 
}

function find(selector) { 
  return new Selector(selector); 
}

// Spec DSL
function loadScene(name) { 
  sceneName = name; 
};

function beforeEach(func) { 
  beforesToRun.Push(func); 
};

function context(name, func) { 
  describe(name, func); // Alias 
};

function describe(name, func) {
  specMessageContext.Push(name);
  var before = beforesToRun.length;
  func();
  var after = beforesToRun.length;
  for(var index = 0; index < (after-before); index++) { 
    beforesToRun.Pop(); 
  }
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
  specCount++;
  pendingCount++; 
}

function it(name, func) {
  specsToRun.Push({
    'befores': new Array(beforesToRun), 
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
      if(simulationsToRun.length == 0) { resetScene(); }
    }
  } else {
    var passOrFail = failCount > 0 ? 'FAIL: ' : 'PASS: ';
    Debug.Log(passOrFail + specCount + ' specs, ' + failCount + ' failures, ' + pendingCount + ' pending, ' + Time.time + ' secs.');
  }
}

function Update() {
  if(simulationsToRun.length != 0 || currentSimulation != {}) {
    if(currentSimulation == {}) { currentSimulation = simulationsToRun.Shift(); }

    if(currentSimulation['duration'] != 0) {
      currentSimulation['duration'] -= 1;
    } else {
      currentSimulation['callback']();
      currentSimulation = {};
      if(simulationsToRun.length == 0) {
        resetScene();
      }
    }
  }
}

static var Input = new Decorator();

private

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