import React from "react";
import PropTypes from "prop-types";
import If from "component/Global/If";
import ErrorBoundary from "component/ErrorBoundary";
import { Form, Input, InputNumber, Checkbox, Row, Col, Select, Radio  } from "antd";
import validate from "oproba";
import Tooltip from "component/Global/Tooltip";
import { TEXTAREA, RADIO_GROUP, INPUT, INPUT_NUMBER, CHECKBOX, SELECT } from "component/Schema/constants";
const FormItem = Form.Item,
      Option = Select.Option,
      RadioGroup = Radio.Group,
      { TextArea } = Input,

      getLabel = ( desc, tooltip ) => (
        <span>
          { desc }
          <Tooltip
            title={ tooltip }
            icon="question-circle"
          />
        </span>
      );

export class ParamsFormBuilder extends React.Component {

  static propTypes = {
    form: PropTypes.shape({
      getFieldDecorator: PropTypes.func.isRequired,
      setFieldsValue: PropTypes.func.isRequired
    }),

    record: PropTypes.object.isRequired,
    schema: PropTypes.any
  }

  renderControl = ( field ) => {
    const { setFieldsValue } = this.props.form,
          onSelect = ( value ) => {
            setFieldsValue({ [ field.name ]: value });
          },
          width = field.inputWidth || "100%";
    switch ( field.control ) {
    case INPUT:
      return ( <Input placeholder={ field.placeholder } style={{ width }} /> );
    case TEXTAREA:
      return ( <TextArea
        placeholder={ field.placeholder }
        style={{ width }}
        rows={ field.textareaRows || 4 } /> );
    case INPUT_NUMBER:
      return ( <InputNumber  style={{ width }} /> );
    case SELECT:
      return ( <Select
        showSearch
        placeholder={ field.placeholder }
        optionFilterProp="children"
        onSelect={ onSelect }
         style={{ width }}
        filterOption={( input, option ) => option.props.children.toLowerCase().indexOf( input.toLowerCase() ) >= 0}
      >
        {
          field.options.map( ( option, inx ) => {
            return typeof option === "string"
              ? ( <Option key={inx} value={ option }>{ option }</Option> )
              : ( <Option key={inx} value={ option.value }>{ option.description }</Option> );
          })

        }
      </Select> );
    case CHECKBOX:
      return ( <Checkbox>
        { field.label }
        { field.tooltip && ( <Tooltip
          title={ field.tooltip }
          icon="question-circle"
        /> )}

      </Checkbox> );
    case RADIO_GROUP:
      return (<RadioGroup>
        {
          field.options.map( ( option, inx ) => {
            return typeof option === "string"
              ? ( <Radio key={inx} value={ option }>{ option }</Radio> )
              : ( <Radio key={inx} value={ option.value }>{ option.description }</Radio> );
          })
        }
      </RadioGroup>);
    default:
      return null;
    }
  }

  getInitialValue( field ) {
    const { record } = this.props,
          initialValue = field.control === CHECKBOX ? false : field.initialValue,
          key = field.name.replace( /^params\./, "" );

    return ( ( record.params && record.params.hasOwnProperty( key ) )
      ? record.params[ key ]
      : initialValue );
  }


  renderField = ( field, inx ) => {
     const { getFieldDecorator } = this.props.form,
          labelNode = field.tooltip ? getLabel( field.label, field.tooltip ) : field.label,
          initialValue = this.getInitialValue( field ),
          decoratorOptions =  {
            initialValue,
            rules: field.rules
          };

    validate.obj({
      span: "N?",
      name: "S",
      control: "S",
      label: "S",
      tooltip: "S?",
      placeholder: "S?",
      inputWidth: "N|S?",
      textareaRows: "N?",
      options: "A?",
      rules: "A?"
    }, field );

    if ( field.control === CHECKBOX ) {
      decoratorOptions.valuePropName = ( initialValue ? "checked" : "data-ok" );
      decoratorOptions.initialValue = true;
    }
    return (<Col span={ field.span || 12 } key={ `field_${ inx }` }>
      <FormItem
        label={ field.control !== CHECKBOX ? field.label : "" }>
        { getFieldDecorator( field.name, decoratorOptions )( this.renderControl( field ) ) }
        { field.description ? <div className="command-opt-description">{ field.description }</div> : "" }
      </FormItem>
    </Col>);
  };

  renderRow = ( row, inx ) => {
    validate.obj({
      fields: "A"
    }, row );
    return (<Row gutter={16} key={ `row_${ inx }` } className="ant-form-inline edit-command-inline">
      { row.fields.map( this.renderField ) }
    </Row>);
  };

  mapFieldsToRow = ( field ) => ({
    fields: [ field ]
  });

  renderSection = ( section, inx ) => {
    validate.obj({
      legend: "S?",
      tooltip: "S?",
      description: "S?",
      fields: "A?",
      rows: "A?"
    }, section );
    return (<fieldset className="command-form__fieldset" key={ `section_${ inx }` }>
      <legend>
        <span>{ section.legend || "Parameters" }</span>

        { section.tooltip && <Tooltip title={ section.tooltip } icon="question-circle" /> }

      </legend>
      <If exp={ section.description }>
        <p>{ section.description }</p>
      </If>

       { section.fields && section.fields
          .map( this.mapFieldsToRow )
          .map( this.renderRow ) }

      { section.rows && section.rows.map( this.renderRow ) }
    </fieldset>);
  }


  render() {
    const { schema } = this.props;

    return (
      <ErrorBoundary>
        { schema.params.map( this.renderSection ) }
      </ErrorBoundary>
    );
  }
};