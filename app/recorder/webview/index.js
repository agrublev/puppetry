(function(){

  const { ipcRenderer } = require( "electron" ),
        debounce = require( "lodash.debounce" ),
        { targets, getTargetVar } = require( "./service/target" ),
        commands = [];

    ipcRenderer.on( "pull", () => {
      ipcRenderer.sendToHost( "logData",  targets, commands );
    });

    function on( el, ev, cb ) {
      el.removeEventListener( ev, cb );
      el.addEventListener( ev, cb, false );
    }

    function log( command, params ) {
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
        log( "move", { x: e.screenX, y: e.screenY } );
      }
    }

    Recorder.onInputInput = debounce( ( e ) => {
      log( "input", { target: getTargetVar( e.target ), value: e.target.value } );
    }, 200 );

    function onDomModified() {
      Array.from( document.querySelectorAll( "input, textarea, select" ) ).forEach( el => {
        on( el, "focus", Recorder.onFocusInput );
        on( el, "input", Recorder.onInputInput );
      });
    }

    document.addEventListener( "DOMContentLoaded", () => {
      document.body.addEventListener( "click", Recorder.onElClick );

      document.addEventListener("mousemove", debounce( Recorder.onMouseMove, 200 ), false);
      window.addEventListener("resize", debounce( Recorder.onWindowResize, 200 ), false);
      onDomModified();

      try {
        const observer = new MutationObserver( onDomModified );
        observer.observe( document.body, { attributes: false, childList: true, subtree: true });
      } catch ( err ) {
        ipcRenderer.sendToHost( "console", "MutationObserver ERROR", err.message );
      }
    });



}());