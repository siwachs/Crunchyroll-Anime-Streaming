import { KeyboardEvent, MouseEvent } from "react";

function triggerCallbackOnClickOrOnKeydown(
  e: MouseEvent | KeyboardEvent,
  callback: () => void,
) {
  if (e.type === "click") return callback();

  const keyboardEvent = e as KeyboardEvent;
  if (keyboardEvent.key === "Enter" || keyboardEvent.key === " ") callback();
}

export { triggerCallbackOnClickOrOnKeydown };
