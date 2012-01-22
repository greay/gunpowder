// Statinformation for specs
static var currentSimulation = {};
static var testsToRun = new Array();
static var beforesToRun = new Array();
static var simulationsToRun = new Array();
static var testCount = 0;
static var failCount = 0;
static var pendingCount = 0;
static var failedExpectation = false;
static var testsFinished = false;
static var sceneName;

// Selector methods
function _() { 
  return new Selector(''); 
}

function _(selector) { 
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
  var before = beforesToRun.length;
  func();
  var after = beforesToRun.length;
  for(var index = 0; index < (after-before); index++) { 
    beforesToRun.Pop(); 
  }
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
  testCount++;
  pendingCount++; 
}

function it(name, func) {
  testsToRun.Push({'befores': new Array(beforesToRun), 'test': func}); 
}

// Will be overridden by spec
function run() {}

function Start() {
  if(!testsFinished) {
    if(testsToRun.length == 0) {
      beginTests();
    } else {
      runNextTest();
      updateTestResults();
      if(simulationsToRun.length == 0) { resetScene(); }
    }
  } else {
    var passOrFail = failCount > 0 ? 'FAIL: ' : 'PASS: ';
    Debug.Log(passOrFail + testCount + ' tests, ' + failCount + ' failures, ' + pendingCount + ' pending, ' + Time.time + ' secs.');
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

function beginTests() {
  Debug.Log('Running Gunpowder specs...');
  run();
  testCount += testsToRun.length;
  Start();
}

function runNextTest() {
  if(testsToRun.length == 1) { testsFinished = true; }
  var nextTest = testsToRun.Shift();
  for(var before in nextTest['befores']) { before(); }
  nextTest['test']();
}

function updateTestResults() {
  if(failedExpectation) { 
    failCount++;
    failedExpectation = false;
  }
}