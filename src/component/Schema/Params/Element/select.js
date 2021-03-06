import { justify } from "service/assert";
import { INPUT } from "../../constants";

export const select = {
  template: ({ params, targetSeletor }) => justify(
    `// Emulating select\n`
    + `await bs.page.select( "${ targetSeletor }", "${ params.value }" );` ),
  description: `Sets value on select element`,
  params: [
    {
      inline: false,
      legend: "",
      tooltip: "",
      items: [
        {
          name: "params.value",
          control: INPUT,
          label: "Text of an option to look for",
          help: "",
          placeholder: "e.g. foo",
          initialValue: "",
          rules: [{
            required: true,
            message: "Text required"
          }]
        }
      ]
    }
  ]
};
