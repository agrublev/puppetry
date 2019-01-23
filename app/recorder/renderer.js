const { remote } = require ( "electron" ),
      webview = document.querySelector( "webview" );

console.log("Hello here WEBVIEW");

webview.addEventListener( "ipc-message", e => {
//  if ( e.channel !== "data" ) {
//    return;
//  }
  console.log( e.channel, e.args );
});

  document.querySelector( "#pull" )
    .addEventListener( "click", ( e ) => {
      e.preventDefault();
      webview.send( "pull" );
    }, false );


 document.querySelector( "#url" )
    .addEventListener( "keyup", ( e ) => {
      if ( e.which === 13 ) {
        e.preventDefault();
        webview.src = e.target.value;
      }

    }, false );
