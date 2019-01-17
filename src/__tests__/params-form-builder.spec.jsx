import React from "react";
import { render } from "enzyme";
import schema from "./mock/schema";
import ParamsForm from "./mock/ParamsForm";

const record = {
      params: {
        foo: "FOO",
        bar: "BAR",
        baz: "BAZ",
        textarea: "lorem impsum",
        radio: "opt2"
      }
    };

let testForm;

describe( "ParamsForm", () => {

  beforeAll(() => {
    testForm = render( <ParamsForm schema={ schema } record={ record } /> );
  });

  it( "renders a form", () => {
    expect( testForm.is( ".ant-form.command-form" ) ).toBe( true );
  });

    it( "...", () => {
      const [ field ] = schema.params[ 0 ].rows[ 0 ].fields;
      console.log(field);

      expect( testForm.find( `label[for="${ field.name }"]` ) ).toHaveLength( 1 );
      expect( testForm.find( `input#${ field.name }` ) ).toHaveLength( 1 );

//      placeholder="foo placeholder"
    });


});