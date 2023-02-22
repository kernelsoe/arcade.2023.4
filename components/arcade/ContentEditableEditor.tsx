/**
 * From awesome https://github.com/lovasoa/react-contenteditable/issues/161
 */

import { DependencyList, useCallback, useEffect, useRef } from "react";
import ReactContentEditable, { Props } from "react-contenteditable";

export const useRefCallback = <T extends any[]>(
  value: ((...args: T) => void) | undefined,
  deps?: DependencyList,
): ((...args: T) => void) => {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  const result = useCallback((...args: T) => {
    ref.current?.(...args);
  }, []);

  return result;
};

export default function ContentEditableEditor({
  ref,
  onChange,
  onInput,
  onBlur,
  onKeyPress,
  onKeyDown,
  className,
  ...props
}: Props) {
  const onChangeRef = useRefCallback(onChange);
  const onInputRef = useRefCallback(onInput);
  const onBlurRef = useRefCallback(onBlur);
  const onKeyPressRef = useRefCallback(onKeyPress);
  const onKeyDownRef = useRefCallback(onKeyDown);

  return (
    <ReactContentEditable
      {...props}
      onChange={onChangeRef}
      onInput={onInputRef}
      onBlur={onBlurRef}
      onKeyPress={onKeyPressRef}
      onKeyDown={onKeyDownRef}
      className={className}
    />
  );
}
