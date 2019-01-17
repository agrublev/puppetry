import { TEXTAREA, RADIO_GROUP, INPUT, INPUT_NUMBER, CHECKBOX, SELECT } from "component/Schema/constants";

const schema = {

  template: ( command ) => `
    Puppeteer code .. ${ command.params.name }, ${ command.targetSeletor }
  `,

  description: `Toggles the specified class value (adds or removes)`,

  assert: {
  },

  validate: ( values ) => {
    if ( values.params.foo === values.params.bar ) {
      return "FOO must not equal BAR";
    }
    return null;
  },

  params: [
    {
      legend: "Section legend",
      description: "Section description",
      tooltip: "Section tooltip",

      rows: [
        {
          description: "You can use available tags like \"{{BASE_URL}}/foo\" [Manage stagging tags](http://dsheiko.com)",
          fields: [
            {
              span: 6,
              name: "params.foo",
              control: INPUT,
              label: "Foo",
              tooltip: "FOO TOOLTIP",
              placeholder: "foo placeholder",
              rules: [{
                required: true,
                message: "???"
              }]
            },

            {
              span: 6,
              name: "params.bar",
              tooltip: "Foo tooltip Foo tooltip Foo tooltip Foo tooltip Foo tooltip Foo tooltip Foo tooltip",
              control: INPUT,
              label: "Bar",
              rules: [{
                required: true,
                message: "???"
              }]
            }
          ]
        },

        {
          description: "Within URL you can use available tags like \"{{BASE_URL}}/foo\" [Manage stagging tags](http://dsheiko.com)",
          fields: [
            {
              span: 24,
              name: "params.goto",
              control: INPUT,
              label: "URL",
              placeholder: "https://puppetry.app",
              rules: [{
               type: "string",
               required: true,
               message: "Hey invalid URL!"
             }]
            }
          ]
        },

        {
          description: "You can use available tags like {{BASE_URL}} see [link](http://dsheiko.com)",
          fields: [
            {
              span: 24,
              name: "params.select",
              control: SELECT,
              label: "Select",
              options: [
                { value: 1, description: "ONE "},
                { value: 2, description: "TWO "},
                { value: 3, description: "THREE "}
              ]
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
          control: INPUT_NUMBER,
          label: "Baz",
          tooltip: "Baz tooltip",
          placeholder: "Baz placeholder",
          inputWidth: 100
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

export default schema;