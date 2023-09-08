"use client";
import { useState } from "react";
import parser from "html-react-parser";
import TipTap from "/components/rte/TipTap";

export default function RTE() {
    const [desc, setDesc] = useState("");
    return (
        <>
            <TipTap desc="<p>Hello</p>" setDesc={setDesc} />
            <div className="m-4 p-3 border">
                {desc}
                {parser(desc)}
            </div>
        </>
    );
}
