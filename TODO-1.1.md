# Snippet system
- snippet is a JSON Schema like definition (e.g. ``./src/component/Schema/Params/`) for the form builder that allows user to create custom commands. Namely that consists of code template for Puppeteer, description and layout for the command parameters / assertions  form.
- can be placed in `tools/snippets` menu
- Puppetry will store enable/disable/remove snippet list in JSON file in app asset directory
- Shared snippets also available via public repo e.g. `puppetry-snippets`
  - new snippets can be published like (Homebrew casks)[https://github.com/Homebrew/homebrew-cask/tree/master/Casks] with a PR on a separate git repo

## Implementation ideas
- injects custom snippets via await `import("")` (? or Electron native require - `global.require` ?)

## Snippet JSON Schema

- existing schema (e.g. `./src/component/Schema/Params/Element/toggleClass.js` must be refactored) to something like that:

```js


module.exports = ( EXTERNAL_DEPENDENCIES ) => ({
  template: ( command ) => `
    Puppeteer code .. ${ command.params.name }, ${ command.targetSeletor }
  ` ),
  description: `Toggles the specified class value (adds or removes)`,
  assert: {
    node: EXTERNAL_DEPENDENCIES.AssertValue
  },
  params: [{
    title: "", // Section title e.g. Options
    rows: [{  // Grid layout (https://ant.design/components/form/)
      description: "",
      cols: [{
        span: 12, // https://ant.design/components/grid/
        name: "params.name",
        control: EXTERNAL_DEPENDENCIES.INPUT,
        label: "CSS class value",
        help: "",
        placeholder: "e.g. .has-error",
        initialValue: "",
        rules: [{
          required: true,
          message: "Class value required"
        }]
      }]
    }]
  }]
})
```

- where EXTERNAL_DEPENDENCIES, can be ant.design input components, assertion components and helper functions

# Links

- https://code.visualstudio.com/docs/extensions/overview
- https://code.visualstudio.com/docs/extensionAPI/overview
- https://itnext.io/how-to-make-a-visual-studio-code-extension-77085dce7d82
- https://code.visualstudio.com/docs/extensionAPI/extension-manifest
