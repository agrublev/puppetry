const { remote } = require ( "electron" ),
      devices = require( "../src/vendor/puppeteer/DeviceDescriptors" ),
      webview = document.querySelector( "webview" ),
      okBtn = document.querySelector( "#pull" ),
      urlInput = document.querySelector( "#url" ),
      emulateSelect = document.querySelector( "#select" ),
      options = devices.map( i =>  ({
        value: i.name,
        description: `${i.name} (${i.viewport.width}x${i.viewport.height})`
      }) );

console.log("Hello here WEBVIEW");

webview.addEventListener( "ipc-message", e => {
//  if ( e.channel !== "data" ) {
//    return;
//  }
  console.log( e.channel, e.args );
});

okBtn.addEventListener( "click", ( e ) => {
  e.preventDefault();
  webview.send( "pull" );
}, false );


urlInput.addEventListener( "keyup", ( e ) => {
  if ( e.which === 13 ) {
    e.preventDefault();
    webview.src = e.target.value;
  }

}, false );


options.forEach( data => {
  const opt = document.createElement( "option" );
  opt.value= data.value;
  opt.innerHTML = data.description;
   emulateSelect.appendChild( opt );
});

emulateSelect.classList.remove( "is-hidden" );

emulateSelect.addEventListener( "input", ( e ) => {
  const val = e.target.value;
  e.preventDefault();
  if ( val === "default" ) {

  }
  //devices.map.find( data => data.name === val )
  console.log("??", e.target.value);
}, false );