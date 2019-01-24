(function(){

  const { ipcRenderer } = require( "electron" ),
        debounce = require( "lodash.debounce" ),
        { targets, getTargetVar } = require( "./service/target" ),
        commands = [];

  let recording = true, observer = null;

  ipcRenderer.on( "pull", () => {
    ipcRenderer.sendToHost( "session",  targets, commands );
  });

  ipcRenderer.on( "recording", ( ev, toggle ) => {
    recording = toggle;
    ipcRenderer.sendToHost( "recording",  toggle );
  });

  function on( el, ev, cb, useCapture = false ) {
    el.removeEventListener( ev, cb );
    el.addEventListener( ev, cb, useCapture );
  }

  function log( command, params ) {
    if ( !recording ) {
      return;
    }
    const last = commands[ commands.length - 1 ];
    // click normally accompanies focusm so no need to keep in the log
    if ( command === "click" &&  last.command === "focus" && params.target === last.params.target ) {
      commands.pop();
    }
    // repeating input, take only the last commmand as it will be used with el.type()
    if ( command === "input" &&  last.command === command && params.target === last.params.target ) {
      commands.pop();
    }
    commands.push({ command, params });
  }

  class Recorder {
    static onFocusInput( e ) {
      log( "focus", { target: getTargetVar( e.target ) } );
    }

    static onElClick( e ) {
      log( "click", { target: getTargetVar( e.target ) } );
    }
    static onWindowResize() {
      log( "resize", { width: window.innerWidth, height: window.innerHeight } );
    }
    static onMouseMove( e ) {
      log( "moveMouse", { x: e.screenX, y: e.screenY } );
    }
    static onKeyUp( e ) {
      // Ctrl-Shift-S - make a screenshot
      if ( e.which === 83 && e.ctrlKey && e.shiftKey ) {
        log( "screenshot", {} );
      }
    }
  }

  Recorder.onInputInput = debounce( ( e ) => {
    log( "type", { target: getTargetVar( e.target ), value: e.target.value } );
  }, 200 );

  function onDomModified() {
    Array.from( document.querySelectorAll( "input, textarea, select" ) ).forEach( el => {
      on( el, "focus", Recorder.onFocusInput );
      on( el, "input", Recorder.onInputInput );
    });
  }

  ipcRenderer.on( "dom-ready", () => {
    log( "goto", { url: location.href } );
    on( document.body, "click", Recorder.onElClick );
    on( window, "keyup", Recorder.onKeyUp );

    on( document, "mousemove", debounce( Recorder.onMouseMove, 200 ) );
    on ( window, "resize", debounce( Recorder.onWindowResize, 200 ) );


    onDomModified();

    try {
      observer && observer.disconnect();
      observer = new MutationObserver( onDomModified );
      observer.observe( document.body, { attributes: false, childList: true, subtree: true });
    } catch ( err ) {
      ipcRenderer.sendToHost( "console", "MutationObserver ERROR", err.message );
    }
  });


}());