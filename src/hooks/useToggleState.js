import React, { useState } from "react";

export const useToggleState = (initialState = true) => {
  const [state, setState] = useState(true);
  const toggleState = () => {
    setState((state) => !state);
  };

  return [state, toggleState];
};
