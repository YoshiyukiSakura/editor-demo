import dynamic from 'next/dynamic'
// const Editor = dynamic(() => import("@osn/rich-text-editor"),{ssr:false})
import Editor from "@osn/rich-text-editor";
import React from "react";

export default function Home() {
  return (
    <div>
      <Editor/>
    </div>
  )
}
