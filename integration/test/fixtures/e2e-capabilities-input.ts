import { render, Text, useApp, useCapabilities, useInput } from "@alchemy.run/sigil";
// A prompt that triggers the capability query on mount and then waits for
// keys (no JSX — see e2e-hyperlink.ts).
import { createElement, useState } from "react";

function Prompt() {
  const { exit } = useApp();
  const { supports } = useCapabilities();
  const [moved, setMoved] = useState(false);

  useInput((input, key) => {
    if (key.downArrow) {
      setMoved(true);
    } else if (input === "q") {
      exit();
    }
  });

  const queried = supports.kittyKeyboard !== undefined;
  return createElement(
    Text,
    null,
    `${queried ? "queried" : "querying"} ${moved ? "moved" : "waiting"}`,
  );
}

render(createElement(Prompt));
