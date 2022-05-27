import dynamic from 'next/dynamic'
// const Editor = dynamic(() => import("@osn/rich-text-editor"),{ssr:false})
import Editor from "@osn/rich-text-editor";
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

export default function Home() {
  const [content, setContent] = useState(markdown);
  return (
    <div>
      <Editor value={content} onChange={(value)=>{setContent(value)}}/>
    </div>
  )
}
