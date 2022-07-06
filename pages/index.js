import dynamic from 'next/dynamic'
// import { UniverseEditor } from "@osn/rich-text-editor";

const Editor = dynamic(() => import("@osn/rich-text-editor"), {ssr: false})
dynamic(() => import("@osn/rich-text-editor").then(mod => {
  console.log(1111)
   return  mod.UniverseEditor
  }
), {ssr: false})
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
    value: "[@abd](abc-polkadot) ",
    forSearch: "abc",
  },
  {
    preview: <span>def</span>,
    value: "[@def](def-kusama) ",
    forSearch: "def",
  }
];

const html = `
<a href="osn-address/JFArxqV6rqPSwBok3zQDnj5jL6vwsZQDwYXXqb1cFygnYVt/kusama" osn-polka-address="Ff3u3eNGBjHyHqvPd3qEeZg51UqJa6AFJRRqJTTj29sp4ST" osn-polka-network="karura">
    @JFArx...gnYVt
  </a>
`;

export default function Home() {
  const [content, setContent] = useState(html);

  const loadSuggestions = (text) => {
    return suggestions.filter(i =>
      i.forSearch.toLowerCase().includes(text.toLowerCase())
    );
  };

  return (
    <div style={{maxWidth: "90%", margin: "auto"}}>
      <h1>Universe Editor (for subSquare mainly)</h1>
      <UniverseEditor value={content} contentType={"Html"} identifier={<h1>fuck</h1>} loadSuggestions={loadSuggestions}/>
      <br/>
      <Editor value={content} onChange={(value) => {
        setContent(value)
      }} loadSuggestions={loadSuggestions}/>
    </div>
  )
}
