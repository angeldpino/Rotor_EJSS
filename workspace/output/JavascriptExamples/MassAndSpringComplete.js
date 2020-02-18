/* _inputParameters: an object with different values for the model parameters */
function MassAndSpringComplete(_topFrame,_libraryPath,_codebasePath, _inputParameters) {
  var _model = EJSS_CORE.createAnimationLMS();
  var _view;
  var _isPlaying = false;
  var _isPaused = true;
  var _isMobile = (navigator===undefined) ? false : navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i);

var _stringProperties = {};
  var _tools = {
    showInputDialog : EJSS_INTERFACE.BoxPanel.showInputDialog,
    showOkDialog : EJSS_INTERFACE.BoxPanel.showOkDialog,
    showOkCancelDialog : EJSS_INTERFACE.BoxPanel.showOkCancelDialog,
    downloadText: EJSS_TOOLS.File.downloadText,
    uploadText: function(action) { EJSS_TOOLS.File.uploadText(_model,action); } 
  };

  function _play()  { _isPaused = false; _isPlaying = true;  _model.play();  }
  function _pause() { _isPaused = true;  _isPlaying = false; _model.pause(); }
  function _step()  { _pause();  _model.step(); }
  function _reset() { _model.reset();  _isPaused = _model.isPaused(); _isPlaying = _model.isPlaying(); }
  _model._play  = _play;
  _model._pause = _pause;
  _model._step  = _step;
  _model._reset = _reset;
  function _update() { _model.update(); }
  function _initialize() { _model.initialize(); }
  function _setFPS(_fps) { _model.setFPS(_fps); }
  function _setDelay(_delay) { _model.setDelay(_delay); }
  function _setStepsPerDisplay(_spd) { _model.setStepsPerDisplay(_spd); }
  function _setUpdateView(_updateView) { _model.setUpdateView(_updateView); }
  function _setAutoplay(_auto) { _model.setAutoplay(_auto); }
  function _println(_message) { console.log(_message); }

  function _breakAfterThisPage() { _model.setShouldBreak(true); }

  function _resetSolvers() { if (_model.resetSolvers) _model.resetSolvers(); }

  function _saveText(name,type,content) { if (_model.saveText) _model.saveText(name,type,content); }

  function _saveState(name) { if (_model.saveState) _model.saveState(name); }

  function _saveImage(name,panelname) { if (_model.saveImage) _model.saveImage(name,panelname); }

  function _readState(url,type) { if (_model.readState) _model.readState(url,type); }

  function _readText(url,type,varname) { if (_model.readText) _model.readText(url,type,varname); }

  function _getStringProperty(propertyName) {
    var _value = _stringProperties[propertyName];
    if (_value===undefined) return propertyName;
    else return _value;
  }
  var __pagesEnabled = [];
  function _setPageEnabled(pageName,enabled) { __pagesEnabled[pageName] = enabled; }

  var x; // EjsS Model.Variables.Dynamical Vars.x
  var vx; // EjsS Model.Variables.Dynamical Vars.vx
  var t; // EjsS Model.Variables.Dynamical Vars.t
  var dt; // EjsS Model.Variables.Dynamical Vars.dt

  var showPlot; // EjsS Model.Variables.Constants.showPlot
  var y; // EjsS Model.Variables.Constants.y
  var m; // EjsS Model.Variables.Constants.m
  var k; // EjsS Model.Variables.Constants.k
  var L; // EjsS Model.Variables.Constants.L

  var T; // EjsS Model.Variables.Constrained Vars.T
  var V; // EjsS Model.Variables.Constrained Vars.V
  var E; // EjsS Model.Variables.Constrained Vars.E

  var b; // EjsS Model.Variables.Damping and Driving Vars.b
  var amp; // EjsS Model.Variables.Damping and Driving Vars.amp
  var freq; // EjsS Model.Variables.Damping and Driving Vars.freq

  var _privateOdesList;
  var _ODEi_evolution1;
  var userEvents1=[];

  _model.getOdes = function() { return [_ODEi_evolution1]; };

  _model.removeEvents = function(){
    userEvents1=[];
  };

  function _serialize() { return _model.serialize(); }

  _model._userSerialize = function() {
    return {
      x : x,
      vx : vx,
      t : t,
      dt : dt,
      showPlot : showPlot,
      y : y,
      m : m,
      k : k,
      L : L,
      T : T,
      V : V,
      E : E,
      b : b,
      amp : amp,
      freq : freq
    };
  };

  function _serializePublic() { return _model.serializePublic(); }

  _model._userSerializePublic = function() {
    return {
      x : x,
      vx : vx,
      t : t,
      dt : dt,
      showPlot : showPlot,
      y : y,
      m : m,
      k : k,
      L : L,
      T : T,
      V : V,
      E : E,
      b : b,
      amp : amp,
      freq : freq
    };
  };

  _model._readParameters = function(json) {
    if(typeof json.x != "undefined") x = json.x;
    if(typeof json.vx != "undefined") vx = json.vx;
    if(typeof json.t != "undefined") t = json.t;
    if(typeof json.dt != "undefined") dt = json.dt;
    if(typeof json.showPlot != "undefined") showPlot = json.showPlot;
    if(typeof json.y != "undefined") y = json.y;
    if(typeof json.m != "undefined") m = json.m;
    if(typeof json.k != "undefined") k = json.k;
    if(typeof json.L != "undefined") L = json.L;
    if(typeof json.T != "undefined") T = json.T;
    if(typeof json.V != "undefined") V = json.V;
    if(typeof json.E != "undefined") E = json.E;
    if(typeof json.b != "undefined") b = json.b;
    if(typeof json.amp != "undefined") amp = json.amp;
    if(typeof json.freq != "undefined") freq = json.freq;
  };

  _model._readParametersPublic = function(json) {
    if(typeof json.x != "undefined") x = json.x;
    if(typeof json.vx != "undefined") vx = json.vx;
    if(typeof json.t != "undefined") t = json.t;
    if(typeof json.dt != "undefined") dt = json.dt;
    if(typeof json.showPlot != "undefined") showPlot = json.showPlot;
    if(typeof json.y != "undefined") y = json.y;
    if(typeof json.m != "undefined") m = json.m;
    if(typeof json.k != "undefined") k = json.k;
    if(typeof json.L != "undefined") L = json.L;
    if(typeof json.T != "undefined") T = json.T;
    if(typeof json.V != "undefined") V = json.V;
    if(typeof json.E != "undefined") E = json.E;
    if(typeof json.b != "undefined") b = json.b;
    if(typeof json.amp != "undefined") amp = json.amp;
    if(typeof json.freq != "undefined") freq = json.freq;
  };

  function _unserializePublic(json) { return _model.unserializePublic(json); }

  _model._userUnserializePublic = function(json) {
    _model._readParametersPublic(json);
   _resetSolvers();
   _model.update();
  };

  function _unserialize(json) { return _model.unserialize(json); }

  _model._userUnserialize = function(json) {
    _model._readParameters(json);
   _resetSolvers();
   _model.update();
  };

  _model.addToReset(function() {
    __pagesEnabled["Equations"] = true;
    __pagesEnabled["Energy"] = true;
  });

  _model.addToReset(function() {
    x = 1.5; // EjsS Model.Variables.Dynamical Vars.x
    vx = 0.0; // EjsS Model.Variables.Dynamical Vars.vx
    t = 0.0; // EjsS Model.Variables.Dynamical Vars.t
    dt = 0.05; // EjsS Model.Variables.Dynamical Vars.dt
  });

  _model.addToReset(function() {
    showPlot = true; // EjsS Model.Variables.Constants.showPlot
    y = 0.0; // EjsS Model.Variables.Constants.y
    m = 1.0; // EjsS Model.Variables.Constants.m
    k = 1.0; // EjsS Model.Variables.Constants.k
    L = 1.0; // EjsS Model.Variables.Constants.L
  });

  _model.addToReset(function() {
    T = 0.5*m*vx*vx; // EjsS Model.Variables.Constrained Vars.T
    V = 0.5*k*(x-L)*(x-L); // EjsS Model.Variables.Constrained Vars.V
    E = T + V; // EjsS Model.Variables.Constrained Vars.E
  });

  _model.addToReset(function() {
    b = 0.1; // EjsS Model.Variables.Damping and Driving Vars.b
    amp = 0.2; // EjsS Model.Variables.Damping and Driving Vars.amp
    freq = 2.0; // EjsS Model.Variables.Damping and Driving Vars.freq
  });

  if (_inputParameters) {
    _inputParameters = _model.parseInputParameters(_inputParameters);
    if (_inputParameters) _model.addToReset(function() { _model._readParameters(_inputParameters); });
  }

  _model.addToReset(function() {
    _privateOdesList=[];
    _ODEi_evolution1 = _ODE_evolution1();
    _privateOdesList.push(_ODEi_evolution1);
  });

  _model.addToReset(function() {
    _model.setAutoplay(false);
    _model.setPauseOnPageExit(true);
    _model.setFPS(20);
    _model.setStepsPerDisplay(1);
  });

  function force (time) {  // > CustomCode.Force:1
    return amp*Math.sin(freq*time);   // > CustomCode.Force:2
  }  // > CustomCode.Force:3

  _model.addToInitialization(function() {
    _initializeSolvers();
  });

  _model.addToEvolution(function() {
    if (!__pagesEnabled["Equations"]) return;
    _ODEi_evolution1.step();
  });

  _model.addToFixedRelations(function() { _isPaused = _model.isPaused(); _isPlaying = _model.isPlaying(); });

  _model.addToFixedRelations(function() {
    if (!__pagesEnabled["Energy"]) return;
    T = 0.5*m*vx*vx;  // > FixedRelations.Energy:1
    V = 0.5*k*(x-L)*(x-L);  // > FixedRelations.Energy:2
    E = T + V;  // > FixedRelations.Energy:3
  });

  _model.addToFixedRelations(function() { _isPaused = _model.isPaused(); _isPlaying = _model.isPlaying(); });

  function _initializeSolvers() {
    for (var i=0,n=_privateOdesList.length; i<n; i++) _privateOdesList[i].initializeSolver();
  }

  function _automaticResetSolvers() {
    for (var i=0,n=_privateOdesList.length; i<n; i++) _privateOdesList[i].automaticResetSolver();
  }

  _model.resetSolvers = function() {
    for (var i=0,n=_privateOdesList.length; i<n; i++) _privateOdesList[i].resetSolver();
  };

  _getODE = function (_odeName) {
    if (_odeName=="Equations") return _ODEi_evolution1;
    return null;
  }

  function _getEventSolver(_odeName) {
    var ode = _getODE(_odeName);
    if (ode===null) return null;
    return ode.getEventSolver();
  }

  function _setSolverClass(_odeName, _engine) {
    var ode = _getODE(_odeName);
    if (ode===null) return;
    if (!_engine.setODE) {
      var classname = _engine.toLowerCase();
      if      (classname.indexOf("boga")>=0)   _engine = EJSS_ODE_SOLVERS.bogackiShampine23;
      else if (classname.indexOf("cash")>=0)   _engine = EJSS_ODE_SOLVERS.cashKarp45;
      else if (classname.indexOf("dopri5")>=0) _engine = EJSS_ODE_SOLVERS.dopri5;
      else if (classname.indexOf("dopri8")>=0) _engine = EJSS_ODE_SOLVERS.dopri853;
      else if (classname.indexOf("richa")>=0)  _engine = EJSS_ODE_SOLVERS.eulerRichardson;
      else if (classname.indexOf("euler")>=0)  _engine = EJSS_ODE_SOLVERS.euler;
      else if (classname.indexOf("fehlberg87")>=0) _engine = EJSS_ODE_SOLVERS.fehlberg87;
      else if (classname.indexOf("fehlberg8")>=0)  _engine = EJSS_ODE_SOLVERS.fehlberg8;
      else if (classname.indexOf("radau")>=0)   _engine = EJSS_ODE_SOLVERS.radau5;
      else if (classname.indexOf("runge")>=0)  _engine = EJSS_ODE_SOLVERS.rungeKutta4;
      else if (classname.indexOf("rk4")>=0)    _engine = EJSS_ODE_SOLVERS.rungeKutta4;
      else if (classname.indexOf("verlet")>=0) _engine = EJSS_ODE_SOLVERS.velocityVerlet;
    }
    if (_engine) ode.setSolverClass(_engine);
  }

  function _ODE_evolution1() {
    var __odeSelf = {};
    var __eventSolver;
    var __solverClass = EJSS_ODE_SOLVERS.rungeKutta4;
    var __state=[];
    var __ignoreErrors=false;
    var __mustInitialize=true;
    var __isEnabled=true;
    var __mustUserReinitialize=false;
    var __mustReinitialize=true;


    __odeSelf._getOdeVars = function (){ return["x","vx","t"]};

    __odeSelf.setSolverClass = function(__aSolverClass) {
      __solverClass = __aSolverClass;
      __instantiateSolver();
    };

    function __instantiateSolver() {
      __state=[];
      __pushState();
      __eventSolver = EJSS_ODE_SOLVERS.interpolatorEventSolver(__solverClass(),__odeSelf);
      __mustInitialize = true;
    }

    __odeSelf.setEnabled = function(_enabled) { __isEnabled = _enabled; };

    __odeSelf.getIndependentVariableValue = function() { return __eventSolver.getIndependentVariableValue(); };

    __odeSelf.getInternalStepSize = function() { return __eventSolver.getInternalStepSize(); };

    __odeSelf.isAccelerationIndependentOfVelocity = function() { return false; };

    __odeSelf.initializeSolver = function() {
      if (__arraysChanged()) { __instantiateSolver(); __odeSelf.initializeSolver(); return; }
      __pushState();
      __eventSolver.initialize(dt);
      __eventSolver.setBestInterpolation(false);
      __eventSolver.setMaximumInternalSteps(10000);
      __eventSolver.removeAllEvents();
      for(k in userEvents1){__eventSolver.addEvent(userEvents1[k]);}
      __eventSolver.setEstimateFirstStep(false);
      __eventSolver.setEnableExceptions(false);
      __mustReinitialize = true;
      __mustInitialize = false;
    };

    function __pushState() {
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        if (__state[__cIn]!=x) __mustReinitialize = true;
        __state[__cIn++] = x;
        if (__state[__cIn]!=vx) __mustReinitialize = true;
        __state[__cIn++] = vx;
        if (__state[__cIn]!=t) __mustReinitialize = true;
        __state[__cIn++] = t;
    }

    function __arraysChanged () {
      return false;
    }

    __odeSelf.getEventSolver = function() {
      return __eventSolver;
    };

    __odeSelf.resetSolver = function() {
      __mustUserReinitialize = true;
    };

    __odeSelf.automaticResetSolver = function() {
      __mustReinitialize = true;
    };

    function __errorAction () {
      if (__ignoreErrors) return;
      console.log (__eventSolver.getErrorMessage());
      _pause();
      // Make sure the solver is reinitialized;
      __mustReinitialize = true;
    }

    __odeSelf.step = function() { return __privateStep(false); };

    __odeSelf.solverStep = function() { return __privateStep(true); };

    function __privateStep(__takeMaximumStep) {
      if (!__isEnabled) return 0;
      if (dt===0) return 0;
      if (__mustInitialize) __odeSelf.initializeSolver();
      if (__arraysChanged()) { __instantiateSolver(); __odeSelf.initializeSolver(); }
      __eventSolver.setStepSize(dt);
      __eventSolver.setInternalStepSize(dt);
      __eventSolver.setMaximumInternalSteps(10000);
      __pushState();
      if (__mustUserReinitialize) { 
        __eventSolver.userReinitialize();
        __mustUserReinitialize = false;
        __mustReinitialize = false;
        if (__eventSolver.getErrorCode()!=EJSS_ODE_SOLVERS.ERROR.NO_ERROR) __errorAction();
      }
      else if (__mustReinitialize) { 
        __eventSolver.reinitialize();
        __mustReinitialize = false;
        if (__eventSolver.getErrorCode()!=EJSS_ODE_SOLVERS.ERROR.NO_ERROR) __errorAction();
      }
      var __stepTaken = __takeMaximumStep ? __eventSolver.maxStep() : __eventSolver.step();
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        x = __state[__cOut++];
        vx = __state[__cOut++];
        t = __state[__cOut++];
      // Check for error
      if (__eventSolver.getErrorCode()!=EJSS_ODE_SOLVERS.ERROR.NO_ERROR) __errorAction();
      return __stepTaken;
    }

    __odeSelf.getState = function() { return __state; };

    __odeSelf.getRate = function(_aState,_aRate) {
      // Extract our variables from _aState
        var __i=0;
        var __cOut=0;
        var x = _aState[__cOut++];
        var vx = _aState[__cOut++];
        var t = _aState[__cOut++];
      // Compute the rate
        var __cRate=0;
        _aRate[__cRate++] = vx; // Rate for ODE: Equations:x
        _aRate[__cRate++] = -k/m *(x-L) - b*vx/m + force(t)/m; // Rate for ODE: Equations:vx
        _aRate[__cRate++] = 1; // independent variable
        return _aRate;
    }; //end of getRate

    __odeSelf._addEvent = function(userCondition,userAction,eventType,eventMethod,maxIter,eventTolerance,endAtEvent){
    var User_Event = function (userCondition,userAction,eventType,eventMethod,maxIter,eventTolerance,endAtEvent) {
      var _eventSelf = {};

      _eventSelf.getTypeOfEvent = function() { return eventType; };

      _eventSelf.getRootFindingMethod = function() { return eventMethod; };

      _eventSelf.getMaxIterations = function() { return maxIter; };

      _eventSelf.getTolerance = function() { return eventTolerance; };

      _eventSelf.evaluate = function(_aState) { 
      // Extract our variables from _aState
        var __i=0;
        var __cOut=0;
        var x = _aState[__cOut++];
        var vx = _aState[__cOut++];
        var t = _aState[__cOut++];
      return eval(userCondition);
      };

      _eventSelf.action = function() { 
      // Extract our variables from __state
        var __i=0;
        var __cOut=0;
        x = __state[__cOut++];
        vx = __state[__cOut++];
        t = __state[__cOut++];
        var _returnValue = __userDefinedAction();
      // Copy our variables to __state[] 
        var __j=0;
        var __n=0;
        var __cIn=0;
        __state[__cIn++] = x;
        __state[__cIn++] = vx;
        __state[__cIn++] = t;
        return _returnValue;
      };

      function __userDefinedAction() {
        if (undefined != functions) eval(functions.toString());
        eval(userAction);
        return endAtEvent;
      }

      return _eventSelf;
    }; // End of event

   userEvents1.push(User_Event(userCondition,userAction,eventType,eventMethod,maxIter,eventTolerance,endAtEvent));
   }

    __instantiateSolver();

    return __odeSelf;
  }

  function _historic_x(__time) {
    var __index = 0;
    return _ODEi_evolution1.getEventSolver().getStateHistory().interpolate(__time,__index);
  }

  function _historic_vx(__time) {
    var __index = 0 + 1;
    return _ODEi_evolution1.getEventSolver().getStateHistory().interpolate(__time,__index);
  }

    _model._fontResized = function(iBase,iSize,iDelta) {
      _view._fontResized(iBase,iSize,iDelta);
  }; // end of _fontResized

  function _getViews() {
    var _viewsInfo = [];
    var _counter = 0;
    _viewsInfo[_counter++] = { name : "HtmlView Page", width : 1024, height : 768 };
    return _viewsInfo;
  } // end of _getViews

  function _selectView(_viewNumber) {
    _view = null;
    _view = new MassAndSpringComplete_View(_topFrame,_viewNumber,_libraryPath,_codebasePath);
    var _view_super_reset = _view._reset;
    _view._reset = function() {
      _view_super_reset();
      switch(_viewNumber) {
        case -10 : break; // make Lint happy
        default :
        case 0:
          _view.drawingPanel.linkProperty("BLMessage",  function() { return "time="+_view._format(t,"0.000"); } ); // HtmlView Page linking property 'BLMessage' for element 'drawingPanel'
          _view.spring.linkProperty("SizeX",  function() { return x-0.2; } ); // HtmlView Page linking property 'SizeX' for element 'spring'
          _view.spring.linkProperty("SizeY",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'SizeY' for element 'spring'
          _view.massShape.setAction("OnRelease", function(_data,_info) {
  vx = 0.0; 
  _view._reset();

}); // HtmlView Page setting action 'OnRelease' for element 'massShape'
          _view.massShape.linkProperty("X",  function() { return x; }, function(_v) { x = _v; } ); // HtmlView Page linking property 'X' for element 'massShape'
          _view.massShape.linkProperty("Y",  function() { return y; }, function(_v) { y = _v; } ); // HtmlView Page linking property 'Y' for element 'massShape'
          _view.displacementTrail.linkProperty("InputX",  function() { return t; }, function(_v) { t = _v; } ); // HtmlView Page linking property 'InputX' for element 'displacementTrail'
          _view.displacementTrail.linkProperty("InputY",  function() { return x-L; } ); // HtmlView Page linking property 'InputY' for element 'displacementTrail'
          _view.velocityTrail.linkProperty("InputX",  function() { return t; }, function(_v) { t = _v; } ); // HtmlView Page linking property 'InputX' for element 'velocityTrail'
          _view.velocityTrail.linkProperty("InputY",  function() { return vx; }, function(_v) { vx = _v; } ); // HtmlView Page linking property 'InputY' for element 'velocityTrail'
          _view.playPauseButton.setAction("OffClick", _pause); // HtmlView Page setting action 'OffClick' for element 'playPauseButton'
          _view.playPauseButton.linkProperty("State",  function() { return _isPaused; } ); // HtmlView Page linking property 'State' for element 'playPauseButton'
          _view.playPauseButton.setAction("OnClick", _play); // HtmlView Page setting action 'OnClick' for element 'playPauseButton'
          _view.stepButton.setAction("OnClick", function(_data,_info) {
  _step();

}); // HtmlView Page setting action 'OnClick' for element 'stepButton'
          _view.resetButton.setAction("OnClick", function(_data,_info) {
  _reset();

}); // HtmlView Page setting action 'OnClick' for element 'resetButton'
          _view.kField.linkProperty("Value",  function() { return k; }, function(_v) { k = _v; } ); // HtmlView Page linking property 'Value' for element 'kField'
          _view.kField.setAction("OnChange", function(_data,_info) {
  _initialize();

}); // HtmlView Page setting action 'OnChange' for element 'kField'
          _view.eField.linkProperty("Value",  function() { return E; }, function(_v) { E = _v; } ); // HtmlView Page linking property 'Value' for element 'eField'
          _view.showPlotCheckBox.linkProperty("Checked",  function() { return showPlot; }, function(_v) { showPlot = _v; } ); // HtmlView Page linking property 'Checked' for element 'showPlotCheckBox'
          _view.showPlotCheckBox.setAction("OnCheckOff", function(_data,_info) {
  _view.plottingPanel.setProperty("Display","none");
  _view.bottomPanel.setProperty("Width",450);

}); // HtmlView Page setting action 'OnCheckOff' for element 'showPlotCheckBox'
          _view.showPlotCheckBox.setAction("OnCheckOn", function(_data,_info) {
  _view.plottingPanel.setProperty("Display","");
  _view.bottomPanel.setProperty("Width",850);

}); // HtmlView Page setting action 'OnCheckOn' for element 'showPlotCheckBox'
          _view.freqField.linkProperty("Value",  function() { return freq; }, function(_v) { freq = _v; } ); // HtmlView Page linking property 'Value' for element 'freqField'
          _view.ampField.linkProperty("Value",  function() { return amp; }, function(_v) { amp = _v; } ); // HtmlView Page linking property 'Value' for element 'ampField'
          _view.phaseSpaceTrail2D.linkProperty("InputX",  function() { return x-L; } ); // HtmlView Page linking property 'InputX' for element 'phaseSpaceTrail2D'
          _view.phaseSpaceTrail2D.linkProperty("InputY",  function() { return vx; }, function(_v) { vx = _v; } ); // HtmlView Page linking property 'InputY' for element 'phaseSpaceTrail2D'
          break;
      } // end of switch
    }; // end of new reset

    _model.setView(_view);
    _model.reset();
    _view._enableEPub();
  } // end of _selectView

  _model.setAutoplay(false);
  _model.setFPS(20);
  _model.setStepsPerDisplay(1);
  _selectView(-1); // this includes _model.reset()
  return _model;
}
function MassAndSpringComplete_View (_topFrame,_viewNumber,_libraryPath,_codebasePath) {
  var _view;
  switch(_viewNumber) {
    case -10 : break; // make Lint happy
    default :
    case 0: _view = MassAndSpringComplete_View_0 (_topFrame); break;
  } // end of switch

  if (_codebasePath) _view._setResourcePath(_codebasePath);

  if (_libraryPath) _view._setLibraryPath(_libraryPath);

  _view._addDescriptionPage('Introduction','./MassAndSpringComplete_Intro_1.html');
  _view._addDescriptionPage('Activities','./MassAndSpringComplete_Intro_2.html');

  return _view;
} // end of main function

function MassAndSpringComplete_View_0 (_topFrame) {
  var _view = EJSS_CORE.createView(_topFrame);

  _view._reset = function() {
    _view._clearAll();
    _view._addElement(EJSS_INTERFACE.panel,"labelPanel", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'labelPanel'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"label", _view.labelPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'label'
      .setProperty("Foreground","Blue") // EJsS HtmlView.HtmlView Page: setting property 'Foreground' for element 'label'
      .setProperty("Text","Mass and Spring") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'label'
      .setProperty("Font","normal bold 30px ") // EJsS HtmlView.HtmlView Page: setting property 'Font' for element 'label'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"centerPanel", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'centerPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.drawingPanel,"drawingPanel", _view.centerPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'drawingPanel'
      .setProperty("Height",350) // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'drawingPanel'
      .setProperty("Width",350) // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'drawingPanel'
      .setProperty("MinimumX",0) // EJsS HtmlView.HtmlView Page: setting property 'MinimumX' for element 'drawingPanel'
      .setProperty("MinimumY",-1) // EJsS HtmlView.HtmlView Page: setting property 'MinimumY' for element 'drawingPanel'
      .setProperty("Enabled",true) // EJsS HtmlView.HtmlView Page: setting property 'Enabled' for element 'drawingPanel'
      .setProperty("SquareAspect",true) // EJsS HtmlView.HtmlView Page: setting property 'SquareAspect' for element 'drawingPanel'
      .setProperty("MaximumY",1) // EJsS HtmlView.HtmlView Page: setting property 'MaximumY' for element 'drawingPanel'
      .setProperty("MaximumX",2) // EJsS HtmlView.HtmlView Page: setting property 'MaximumX' for element 'drawingPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"wallShape", _view.drawingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'wallShape'
      .setProperty("FillColor","DarkGray") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'wallShape'
      .setProperty("SizeX",0.2) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'wallShape'
      .setProperty("ShapeType","RECTANGLE") // EJsS HtmlView.HtmlView Page: setting property 'ShapeType' for element 'wallShape'
      .setProperty("X",0) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'wallShape'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'wallShape'
      .setProperty("SizeY",0.6) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'wallShape'
      ;

    _view._addElement(EJSS_DRAWING2D.spring,"spring", _view.drawingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'spring'
      .setProperty("RelativePosition","WEST") // EJsS HtmlView.HtmlView Page: setting property 'RelativePosition' for element 'spring'
      .setProperty("X",0.1) // EJsS HtmlView.HtmlView Page: setting property 'X' for element 'spring'
      .setProperty("Y",0) // EJsS HtmlView.HtmlView Page: setting property 'Y' for element 'spring'
      ;

    _view._addElement(EJSS_DRAWING2D.shape,"massShape", _view.drawingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'massShape'
      .setProperty("FillColor","Magenta") // EJsS HtmlView.HtmlView Page: setting property 'FillColor' for element 'massShape'
      .setProperty("SizeX",0.2) // EJsS HtmlView.HtmlView Page: setting property 'SizeX' for element 'massShape'
      .setProperty("SizeY",0.2) // EJsS HtmlView.HtmlView Page: setting property 'SizeY' for element 'massShape'
      .setProperty("EnabledPosition","ENABLED_X") // EJsS HtmlView.HtmlView Page: setting property 'EnabledPosition' for element 'massShape'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"plottingPanel", _view.centerPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'plottingPanel'
      .setProperty("Height",350) // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'plottingPanel'
      .setProperty("Width",500) // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'plottingPanel'
      .setProperty("TitleY","Disp (b), Vel (r)") // EJsS HtmlView.HtmlView Page: setting property 'TitleY' for element 'plottingPanel'
      .setProperty("TitleX","time") // EJsS HtmlView.HtmlView Page: setting property 'TitleX' for element 'plottingPanel'
      .setProperty("AutoScaleY",true) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleY' for element 'plottingPanel'
      .setProperty("AutoScaleX",true) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleX' for element 'plottingPanel'
      .setProperty("TitleFont","normal normal 18px ") // EJsS HtmlView.HtmlView Page: setting property 'TitleFont' for element 'plottingPanel'
      .setProperty("Title","Displacement and Velocity vs time") // EJsS HtmlView.HtmlView Page: setting property 'Title' for element 'plottingPanel'
      .setProperty("TitleColor","rgba(null)") // EJsS HtmlView.HtmlView Page: setting property 'TitleColor' for element 'plottingPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.trail,"displacementTrail", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'displacementTrail'
      .setProperty("Maximum",300) // EJsS HtmlView.HtmlView Page: setting property 'Maximum' for element 'displacementTrail'
      .setProperty("LineColor","Blue") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'displacementTrail'
      ;

    _view._addElement(EJSS_DRAWING2D.trail,"velocityTrail", _view.plottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'velocityTrail'
      .setProperty("Maximum",300) // EJsS HtmlView.HtmlView Page: setting property 'Maximum' for element 'velocityTrail'
      .setProperty("LineColor","red") // EJsS HtmlView.HtmlView Page: setting property 'LineColor' for element 'velocityTrail'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"bottomPanel", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'bottomPanel'
      .setProperty("Width",850) // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'bottomPanel'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"bottomLeftPanel", _view.bottomPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'bottomLeftPanel'
      .setProperty("CSS",{ "float":"left"}) // EJsS HtmlView.HtmlView Page: setting property 'CSS' for element 'bottomLeftPanel'
      ;

    _view._addElement(EJSS_INTERFACE.twoStateButton,"playPauseButton", _view.bottomLeftPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'playPauseButton'
      .setProperty("Tooltip","Play/Pause") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'playPauseButton'
      .setProperty("ImageOnUrl","/org/opensourcephysics/resources/controls/images/play.gif") // EJsS HtmlView.HtmlView Page: setting property 'ImageOnUrl' for element 'playPauseButton'
      .setProperty("ImageOffUrl","/org/opensourcephysics/resources/controls/images/pause.gif") // EJsS HtmlView.HtmlView Page: setting property 'ImageOffUrl' for element 'playPauseButton'
      ;

    _view._addElement(EJSS_INTERFACE.button,"stepButton", _view.bottomLeftPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'stepButton'
      .setProperty("ImageUrl","/org/opensourcephysics/resources/controls/images/stepforward.gif") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'stepButton'
      ;

    _view._addElement(EJSS_INTERFACE.button,"resetButton", _view.bottomLeftPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'resetButton'
      .setProperty("ImageUrl","/org/opensourcephysics/resources/controls/images/reset.gif") // EJsS HtmlView.HtmlView Page: setting property 'ImageUrl' for element 'resetButton'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"bottomRightPanel", _view.bottomPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'bottomRightPanel'
      .setProperty("CSS",{ "float":"right"}) // EJsS HtmlView.HtmlView Page: setting property 'CSS' for element 'bottomRightPanel'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"kLabel", _view.bottomRightPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'kLabel'
      .setProperty("Text","k =") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'kLabel'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"kField", _view.bottomRightPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'kField'
      .setProperty("Width",50) // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'kField'
      .setProperty("Format","0.000") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'kField'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"eLabel", _view.bottomRightPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'eLabel'
      .setProperty("CSS",{ "border-width": "0" }) // EJsS HtmlView.HtmlView Page: setting property 'CSS' for element 'eLabel'
      .setProperty("Text","E =") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'eLabel'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"eField", _view.bottomRightPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'eField'
      .setProperty("Width",50) // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'eField'
      .setProperty("Format","0.000") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'eField'
      .setProperty("Editable",false) // EJsS HtmlView.HtmlView Page: setting property 'Editable' for element 'eField'
      ;

    _view._addElement(EJSS_INTERFACE.checkBox,"showPlotCheckBox", _view.bottomRightPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'showPlotCheckBox'
      .setProperty("Text","Show Plot") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'showPlotCheckBox'
      ;

    _view._addElement(EJSS_INTERFACE.separator,"separator", _view.bottomPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'separator'
      ;

    _view._addElement(EJSS_INTERFACE.panel,"forceParamPanel", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'forceParamPanel'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"freqLabel", _view.forceParamPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'freqLabel'
      .setProperty("Text","frequency =") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'freqLabel'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"freqField", _view.forceParamPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'freqField'
      .setProperty("Width",50) // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'freqField'
      .setProperty("Format","0.00") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'freqField'
      .setProperty("Tooltip","external driving frequency") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'freqField'
      ;

    _view._addElement(EJSS_INTERFACE.imageAndTextButton,"ampLabel", _view.forceParamPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'ampLabel'
      .setProperty("Text","amplitude =") // EJsS HtmlView.HtmlView Page: setting property 'Text' for element 'ampLabel'
      ;

    _view._addElement(EJSS_INTERFACE.numberField,"ampField", _view.forceParamPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'ampField'
      .setProperty("Width",50) // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'ampField'
      .setProperty("Format","0.00") // EJsS HtmlView.HtmlView Page: setting property 'Format' for element 'ampField'
      .setProperty("Tooltip","external driving amplitude") // EJsS HtmlView.HtmlView Page: setting property 'Tooltip' for element 'ampField'
      ;

    _view._addElement(EJSS_DRAWING2D.plottingPanel,"phaseSpacePlottingPanel", _view._topFrame) // EJsS HtmlView.HtmlView Page: declaration of element 'phaseSpacePlottingPanel'
      .setProperty("Height",350) // EJsS HtmlView.HtmlView Page: setting property 'Height' for element 'phaseSpacePlottingPanel'
      .setProperty("Width",500) // EJsS HtmlView.HtmlView Page: setting property 'Width' for element 'phaseSpacePlottingPanel'
      .setProperty("MinimumX",-1) // EJsS HtmlView.HtmlView Page: setting property 'MinimumX' for element 'phaseSpacePlottingPanel'
      .setProperty("MinimumY",-1) // EJsS HtmlView.HtmlView Page: setting property 'MinimumY' for element 'phaseSpacePlottingPanel'
      .setProperty("TitleY","Velocity") // EJsS HtmlView.HtmlView Page: setting property 'TitleY' for element 'phaseSpacePlottingPanel'
      .setProperty("TitleX","Displacement") // EJsS HtmlView.HtmlView Page: setting property 'TitleX' for element 'phaseSpacePlottingPanel'
      .setProperty("AutoScaleY",true) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleY' for element 'phaseSpacePlottingPanel'
      .setProperty("AutoScaleX",true) // EJsS HtmlView.HtmlView Page: setting property 'AutoScaleX' for element 'phaseSpacePlottingPanel'
      .setProperty("Title","Phase Space") // EJsS HtmlView.HtmlView Page: setting property 'Title' for element 'phaseSpacePlottingPanel'
      .setProperty("MaximumY",1) // EJsS HtmlView.HtmlView Page: setting property 'MaximumY' for element 'phaseSpacePlottingPanel'
      .setProperty("MaximumX",1) // EJsS HtmlView.HtmlView Page: setting property 'MaximumX' for element 'phaseSpacePlottingPanel'
      ;

    _view._addElement(EJSS_DRAWING2D.trail,"phaseSpaceTrail2D", _view.phaseSpacePlottingPanel) // EJsS HtmlView.HtmlView Page: declaration of element 'phaseSpaceTrail2D'
      .setProperty("NoRepeat",true) // EJsS HtmlView.HtmlView Page: setting property 'NoRepeat' for element 'phaseSpaceTrail2D'
      ;

  };

  return _view;
}



      var _model;
      var _scorm;
      window.addEventListener('load',
        function () { 
          _model =  new MassAndSpringComplete("_topFrame","file:/F:/Angel%20del%20Pino/Documents/MEGA/Uni/Fisica/TFG/JavaScript_EJS_examples/bin/javascript/lib/","file:/F:/Angel%20del%20Pino/Documents/MEGA/Uni/Fisica/TFG/JavaScript_EJS_6.0/workspace/source/JavascriptExamples/");
          if (typeof _isApp !== "undefined" && _isApp) _model.setRunAlways(true);
          TextResizeDetector.TARGET_ELEMENT_ID = '_topFrame';
          TextResizeDetector.USER_INIT_FUNC = function () {
            var iBase = TextResizeDetector.addEventListener(function(e,args) {
              _model._fontResized(args[0].iBase,args[0].iSize,args[0].iDelta);
              },null);
            _model._fontResized(iBase);
          };
          _model.onload();
        }, false);
