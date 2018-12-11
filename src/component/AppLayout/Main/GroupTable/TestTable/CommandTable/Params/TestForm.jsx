import React from "react";
import PropTypes from "prop-types";
import { Form, Row, Col, Alert, Button } from "antd";
import If from "component/Global/If";
import { ParamsFormBuilder } from "./ParamsFormNewBuilder";
import { TEXTAREA, RADIO_GROUP, INPUT, INPUT_NUMBER, CHECKBOX, SELECT } from "component/Schema/constants";

const FormItem = Form.Item,
      connectForm = Form.create(),

schema = {
  validate: ( values ) => {
    return "Message";
  },
  params: [
    {
      legend: "Section legend",
      description: "Section description",
      tooltip: "Section tooltip",

      rows: [
        {
          fields: [
            {
              span: 6,
              name: "params.foo",
              control: INPUT,
              label: "Foo",
              tooltip: "Foo tooltip",
              placeholder: "foo placeholder",
              rules: [{
                required: true,
                message: "???"
              }]
            },

            {
              span: 6,
              name: "params.bar",
              control: INPUT_NUMBER,
              label: "Bar",
              rules: [{
                required: true,
                message: "???"
              }]
            }
          ]
        }
      ]
    },

    {
      legend: "Section 2",
      description: "Section 2 description",
      fields: [
        {
          name: "params.baz",
          control: INPUT,
          label: "Baz",
          tooltip: "Baz tooltip",
          placeholder: "Baz placeholder",
          inputWidth: 100,
          rules: [{
            required: true,
            message: "???"
          }]
        },

        {
          name: "params.quix",
          control: CHECKBOX,
          label: "Quix"
        },

        {
          name: "params.textarea",
          control: TEXTAREA,
          label: "Textarea"
        },

        {
          name: "params.radio",
          control: RADIO_GROUP,
          label: "Radio",
          options: [ "opt1", "opt2", "opt3" ]
        }

      ]
    }

  ]
};

@connectForm
export default class TestForm extends React.Component {

  state = {
    formError: ""
  };

  handleSubmit = ( e ) => {
    e && e.preventDefault();
    this.props.form.validateFieldsAndScroll( ( err, values ) => {
      if ( !err ) {
        console.log( values );
      }
    });
  }

  render() {
    const record = {
      params: {
        foo: "FOO",
        bar: "BAR",
        baz: "BAZ",
        textarea: "lorem impsum",
        radio: "opt2"
      }
    };

    return (
      <Form onSubmit={ this.handleSubmit } className="command-form">
        { this.props.formError && <Alert message={ this.props.formError } type="error" /> }
        <ParamsFormBuilder
            schema={ schema }
            record={ record }
            form={ this.props.form }
         />
        <button>OK</button>
      </Form> );
  }

};
