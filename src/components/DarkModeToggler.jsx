import React, { useState } from "react";
import DarkModeToggle from "react-dark-mode-toggle";
import Themes from "../Themes";

export default () => {
  const [isDarkMode, setIsDarkMode] = useState(() => false);
  return (
    <DarkModeToggle onChange={setIsDarkMode} checked={isDarkMode} size={80} />
  );
};
