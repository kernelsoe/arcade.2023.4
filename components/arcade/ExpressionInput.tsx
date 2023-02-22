"use client";

import { Expression } from "@/lib/store/objects";
import { KeyboardEvent, useCallback, useEffect, useState } from "react";
import { range } from "../../lib/math";
import ContentEditableEditor, { useRefCallback } from "./ContentEditableEditor";

export const parseExpression = (v: string) => {
  const tokens = v.split(",");
  if (tokens.length !== 3) return undefined;

  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i].trim();
    tokens[i] = t;
  }

  const head = tokens[0];

  switch (head) {
    case "range":
      return {
        type: "range",
        result: tokens,
      };

    case "map":
      return {
        type: "map",
        result: tokens,
      };

    default:
      return undefined;
  }
};

function computeRange(startExpr: string, endExpr: string) {
  return range(parseInt(startExpr), parseInt(endExpr), 1);
}

interface Props {
  updateStore: (data: string) => void;
}
export default function ExpressionInput({
  expr,
  updateStore,
}: Expression & Props) {
  // const [{ nat }, set] = useControls(() => ({
  //   nat: {
  //     value: 1,
  //     step: 1,
  //   },
  // }));

  const [computed, setComputed] = useState<Computed | undefined>(undefined);

  const evaluateExpr = useCallback(() => {
    // setComputed(parseExpression(expr));
    // const tokens = parseExpression(expr);
    console.log("eval: ", expr);
    // if (expr.f === "range")
    //   setComputed({
    //     type: "list",
    //     value: expr.o as number[],
    //   });
    // setRawExpr();
  }, [expr]);

  function handleEditorKeydown(e: KeyboardEvent<HTMLDivElement>) {
    switch (e.key) {
      case "Meta":
        e.preventDefault();
        break;
      case "Escape":
        // editor.current?.blur();
        break;
      case "Enter":
        // if (!e.shiftKey) return;
        e.preventDefault();
        // editor.current?.blur();
        evaluateExpr();
        break;

      default:
        break;
    }
  }

  const handleBlur = useRefCallback(() => {}, [expr]);

  const handleChange = useRefCallback((evt) => {
    // setRawExpr(evt.target.value);
    updateStore(evt.target.value);
  }, []);

  useEffect(() => {
    evaluateExpr();
  }, [evaluateExpr]);

  return (
    <div className="rounded-sm border border-stone-600 bg-stone-800 font-mono text-sm">
      <ContentEditableEditor
        html={expr}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleEditorKeydown}
        className="px-1 text-stone-100 outline-none"
      />
      {computed && <ComputedResult data={computed} />}
    </div>
  );
}

type Computed = {
  type: "list";
  value: number[];
};

export function ComputedResult({ data }: { data: Computed }) {
  return (
    <div className="max-w-[600px] overflow-auto p-1">
      {JSON.stringify(data)}
    </div>
  );
}
