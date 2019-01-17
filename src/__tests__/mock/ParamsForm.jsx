import React from "react";
import PropTypes from "prop-types";
import { Form, Row, Col, Alert, Button } from "antd";
import If from "component/Global/If";
import { ParamsFormBuilder } from "component/AppLayout/Main/GroupTable/TestTable/CommandTable/Params/ParamsFormNewBuilder";
import { TEXTAREA, RADIO_GROUP, INPUT, INPUT_NUMBER, CHECKBOX, SELECT } from "component/Schema/constants";

const FormItem = Form.Item,
      connectForm = Form.create();

@connectForm
export default class ParamsForm extends React.Component {

  state = {
    formError: ""
  };

  validateForm( values ) {
    const { schema } = this.props;
    if ( !schema.validate ) {
      return true;
    }
    const err = schema.validate( values );
    if ( !err ) {
      return true;
    }
    this.setState({
      formError: err
    })
    return false;
  }

  handleSubmit = ( e ) => {
    const { schema } = this.props,
          validate = schema.validate ? schema.validate : () => true;
    e && e.preventDefault();
    this.props.form.validateFieldsAndScroll( ( err, values ) => {
      if ( err ) {
        return;
      }
      if ( !this.validateForm( values ) ) {
        return;
      }
      console.log( "DONE", values );
    });
  }

  render() {
    const { schema, record } = this.props;

    return (
      <Form onSubmit={ this.handleSubmit } className="command-form">
        { this.state.formError && <Alert message={ this.state.formError }
        className="command-form-alert" type="error" /> }
        <ParamsFormBuilder
            schema={ schema }
            record={ record }
            form={ this.props.form }
         />
        <button>OK</button>
      </Form> );
  }

};

