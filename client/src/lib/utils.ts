import { KeyboardEvent, MouseEvent } from "react";

function triggerCallbackOnClickOrOnKeydown(
  e: MouseEvent | KeyboardEvent,
  callback: () => void,
) {
  if (e.type === "click") return callback();

  const keyboardEvent = e as KeyboardEvent;
  if (keyboardEvent.key === "Enter" || keyboardEvent.key === " ") callback();
}

function getAttribute(
  e: MouseEvent,
  closest: string,
  attribute: string,
): string {
  const { target } = e;

  const element = (target as HTMLAreaElement).closest(closest);
  return element?.getAttribute(attribute) ?? "";
}

export { triggerCallbackOnClickOrOnKeydown, getAttribute };
