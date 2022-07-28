# @huelet/pencil.js

> A quick, light, easy-to-use RTE for React

[![NPM](https://img.shields.io/npm/v/@huelet/pencil.js.svg)](https://www.npmjs.com/package/@huelet/pencil.js) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn add @huelet/pencil.js
```

## Basic Usage

Without any options, the component will render a styled textarea.

```tsx
import { Editor } from "@huelet/pencil.js";

const App = () => (
  <Editor
    value="Hello, world!"
    onChange={value => console.log(value)}
  />
);
```
Full documentation is available in the [wiki](https://github.com/huelet/pencil.js/wiki).

## License

GPL-3.0 © [Levi R.](https://github.com/lerichardson) and contributors
```
