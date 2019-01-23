import { targets, getTargetVar, clearTargets } from "../../app/recorder/webview/service/target";
import { JSDOM } from "jsdom";

function render( html ) {
  const dom = new JSDOM( html );
  global.document = dom.window.document;
  global.window = dom.window;
}

describe( "Recorder.target", () => {


  describe( "getTargetVar", () => {

    beforeEach(() => {
      clearTargets();
    });

    it( "registers a bare element", () => {
      render( `<div><a>Link</a></div>` );
      const el = document.querySelector( "a" ),
            v = getTargetVar( el );

      expect( v ).toBe( "A" );
      expect( targets[ v ] ).toBe( `/html[1]/body[1]/div[1]/a[1]` );
    });

    it( "registers an element with ID", () => {
      render( `<div><a id="foo">Link</a></div>` );
      const el = document.querySelector( "a" ),
            v = getTargetVar( el );

      expect( v ).toBe( "A_ID_FOO" );
      expect( targets[ v ] ).toBe( `#foo` );
    });

    it( "registers an element with CLASS", () => {
      render( `<div><a class="foo bar baz-quiz">Link</a></div>` );
      const el = document.querySelector( "a" ),
            v = getTargetVar( el );

      expect( v ).toBe( "A_CLASS_FOO_BAR_BAZ_QUIZ" );
      expect( targets[ v ] ).toBe( `/html[1]/body[1]/div[1]/a[1]` );
    });

    it( "registers an element with NAME", () => {
      render( `<div><input name="email" value="value" /></div>` );
      const el = document.querySelector( "input" ),
            v = getTargetVar( el );

      expect( v ).toBe( "INPUT_NAME_EMAIL" );
      expect( targets[ v ] ).toBe( `INPUT[name="email"]` );
    });

    it( "registers an element with mixed attrs", () => {
      render( `<div><input name="email" value="value" id="uniqueOne" class="foo bar baz-quiz" /></div>` );
      const el = document.querySelector( "input" ),
            v = getTargetVar( el );

      expect( v ).toBe( "INPUT_ID_UNIQUEONE" );
      expect( targets[ v ] ).toBe( `#uniqueOne` );
    });

    it( "registers elements with same ids as separate varibales & XPATH", () => {
      render( `<div><a id="foo">Link 1</a><a id="foo">Link 2</a></div>` );

      Array.from ( document.querySelectorAll( "a" ) )
        .forEach( el => getTargetVar( el ) );

      expect( targets[ `A_ID_FOO` ] ).toBe( `/html[1]/body[1]/div[1]/a[1]` );
      expect( targets[ `A_ID_FOO_1` ] ).toBe( `/html[1]/body[1]/div[1]/a[2]` );
    });

     it( "registers elements with same names as separate varibales & XPATH", () => {
      render( `<div><input name="email" value="value" /><input name="email" value="value" /></div>` );

      Array.from ( document.querySelectorAll( "input" ) )
        .forEach( el => getTargetVar( el ) );

      expect( targets[ `INPUT_NAME_EMAIL` ] ).toBe( `/html[1]/body[1]/div[1]/input[1]` );
      expect( targets[ `INPUT_NAME_EMAIL_1` ] ).toBe( `/html[1]/body[1]/div[1]/input[2]` );
    });


  });


});