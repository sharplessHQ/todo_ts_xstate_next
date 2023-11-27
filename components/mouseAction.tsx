import { mouseActionMachine } from "@/machines/mouseActionMachine";
import { useMachine } from "@xstate/react";
import type { NextPage } from "next";

const MouseAction: NextPage = () => {
  const [state, send] = useMachine(mouseActionMachine);
  return (
    <div>
      <p>Mouse Action Demo</p>
      <p>{JSON.stringify(state.value)}</p>
      <button onClick={() => send("MOUSEOVER")}>Mouse Over</button>
      <button onClick={() => send("MOUSEOUT")}>Mouse Out</button>
      <p>============================</p>
    </div>
  );
};

export default MouseAction;
