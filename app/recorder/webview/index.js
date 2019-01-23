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
      const last = commands[ commands.length - 1 ];
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
        log( "move", { x: e.screenX, y: e.screenY } );
      }
      static onKeyUp( e ) {
        // Ctrl-Shift-S - make a screenshot
        if ( e.which === 83 && e.ctrlKey && e.shiftKey ) {

        }
        log( "screenshot", {} );
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

      window.addEventListener( "keyup", onKeyUp );

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