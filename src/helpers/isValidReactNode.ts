import React, { ReactElement } from "react";

function isValidReactNode<P>(
  object: {} | null | undefined
): object is ReactElement<P> {
  if (React.isValidElement(object)) return true;
  else return false;
}

export default isValidReactNode;
