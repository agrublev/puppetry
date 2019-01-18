import React from "react";
import { render, shallow } from "enzyme";
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
    testForm = render( <ParamsForm schema={ schema } record={ record } />, {
      context: {
        schema,
        record
      }
    } );
  });

  it( "renders a form", () => {
    expect( testForm.is( ".ant-form.command-form" ) ).toBe( true );
  });

  it( "renders params.foo", () => {
    const [ field ] = schema.params[ 0 ].rows[ 0 ].fields,
          label = testForm.find( `label[for="${ field.name }"]` ),
          input = testForm.find( `input[id="${ field.name }"]` );
          
    // render label for params.foo
    expect( label ).toHaveLength( 1 );
    // render input
    expect( input ).toHaveLength( 1 );
    // has placeholder
    expect( input.is( `[placeholder="${ field.placeholder }"]` ) ).toBe( true );
    // has tooltip icon
    expect( label.find( `svg[data-icon="question-circle"]`) ).toHaveLength( 1 );
  });


});