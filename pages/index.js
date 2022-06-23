import dynamic from 'next/dynamic'
const Editor = dynamic(() => import("@osn/rich-text-editor"),{ssr:false})
const UniverseEditor = dynamic(() => import("@osn/rich-text-editor").then(mod=> mod.UniverseEditor),{ssr:false})
import React, { useState } from "react";

const markdown = `
[https://www.baidu.com/](https://www.baidu.com/)
# heading 1

## heading 2

**bold text**

_italic text_

- bullet 1
- bullet 2

1. numbered 1
2. numbered 2

|table|example|index|
|-|-|-|
|table|column|1|
|table|column|2|

\`\`\`bash
echo "hello"
\`\`\`

\`inline code\`

> quote text
`.trim();

const suggestions = [
  {
    preview: <span>abc</span>,
    value: "[abd](abc-polkadot) "
  },
  {
    preview: <span>edf</span>,
    value: "[def](def-kusama) "
  }
];

export default function Home() {
  const [content, setContent] = useState(markdown);

  const loadSuggestions = (text) => {
    return suggestions.filter(i =>
      i.value.toLowerCase().includes(text.toLowerCase())
    );
  };

  return (
    <div style={{maxWidth:"90%", margin:"auto"}}>
      <h1>Universe Editor (for subSquare mainly)</h1>
      <UniverseEditor/>
      <h1>Based on React-MDE</h1>
      <Editor value={content} onChange={(value)=>{setContent(value)}} loadSuggestions={loadSuggestions}/>
    </div>
  )
}
