import React from 'react'

import { Editor } from '@huelet/pencil.js'
import '@huelet/pencil.js/dist/index.css'

const App = () => {
  const [value, setValue] = React.useState('')
  return <Editor value={value} onChange={setValue} />
}

export default App
