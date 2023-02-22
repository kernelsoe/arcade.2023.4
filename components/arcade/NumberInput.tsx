import { parseNumber } from "@/lib/leva/utils";
import { useCallback, useEffect, useRef } from "react";
// import { useInputContext } from '../../context'

export type ValueInputProps = {
  id?: string;
  value: string;
  type?: "number";
  inputType?: string;
  onUpdate: (value: any) => void;
  onChange: (value: string) => void;
  // innerLabel?: false | React.ReactNode
  // rows?: number
};

export function ValueInput({
  value,
  onUpdate,
  onChange,
  type,
  id,
  inputType = "text",
  // innerLabel,
  // rows = 0,
  ...props
}: ValueInputProps) {
  // const { id: _id, emitOnEditStart, emitOnEditEnd, disabled } = useInputContext()
  const inputId = id; // || _id
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // const isTextArea = rows > 0;
  // const asType = isTextArea ? "textarea" : "input";

  const update = useCallback(
    (fn: (value: string) => void) => (event: any) => {
      const _value = event.currentTarget.value;
      fn(_value);
    },
    [],
  );

  /**
   * We need to add native blur handler because of this issue in React, where
   * the onBlur handler isn't called during unmount:
   * https://github.com/facebook/react/issues/12363
   */

  useEffect(() => {
    const ref = inputRef.current;
    const _onUpdate = update((value) => {
      onUpdate(value);
      // emitOnEditEnd();
    });
    ref?.addEventListener("blur", _onUpdate);
    return () => ref?.removeEventListener("blur", _onUpdate);
  }, [update, onUpdate]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        update(onUpdate)(event);
        // event.currentTarget.blur()
      }

      const dir =
        event.key === "ArrowUp" ? 1 : event.key === "ArrowDown" ? -1 : 0;
      if (dir) {
        event.preventDefault();
        const step = event.altKey ? 0.1 : event.shiftKey ? 10 : 1;
        onUpdate((v: any) => parseFloat(v) + dir * step);
      }
    },
    [update, onUpdate],
  );

  // It's a bit sad but we're passing the `as` prop here to avoid Typescript
  // complaining.
  const inputProps = Object.assign(
    // { as: asType },
    // isTextArea ? { rows } : {},
    props,
  );

  return (
    <div>
      {/* {innerLabel && typeof innerLabel === "string" ? (
        <InnerLabel>{innerLabel}</InnerLabel>
      ) : (
        innerLabel
      )} */}
      <input
        // @ts-ignore
        ref={inputRef}
        id={inputId}
        type={inputType}
        autoComplete="off"
        spellCheck="false"
        value={value}
        onChange={update(onChange)}
        // onFocus={() => emitOnEditStart()}
        onKeyDown={onKeyDown}
        // disabled={disabled}
        {...inputProps}
      />
    </div>
  );
}

export function NumberInput({ onUpdate, ...props }: ValueInputProps) {
  const _onUpdate = useCallback(
    (v: any) => onUpdate(parseNumber(v)),
    [onUpdate],
  );

  return <ValueInput {...props} onUpdate={_onUpdate} type="number" />;
}
