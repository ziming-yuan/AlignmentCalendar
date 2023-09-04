"use client";
import TipTap from './tiptap'
import { useState } from "react";
import parser from "html-react-parser";

export default function RTE() {
  const [desc, setDesc] = useState('');
  return (
    <>
          <TipTap setDesc={setDesc}/>
        <div className='m-4 p-3 border'>
          {desc}
          {parser(desc)}
        </div>
    </>
  )
}

