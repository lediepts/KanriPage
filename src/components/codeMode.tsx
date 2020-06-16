import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/theme/neat.css";
import "codemirror/mode/xml/xml.js";
import "codemirror/mode/javascript/javascript.js";

interface Props {
  value?: string;
  setValue: (value: string) => void;
  mode?: "xml" | "javascript" | "strings";
}

export default function CodeMode({ value, setValue, mode }: Props) {
  return (
    <CodeMirror
      value={value || ""}
      onBeforeChange={(editor, data, value) => {
        setValue(value);
      }}
      options={{
        mode: mode || "xml",
        theme: "material",
        lineNumbers: true,
      }}
      onChange={(editor, data, value) => {}}
    />
  );
}
