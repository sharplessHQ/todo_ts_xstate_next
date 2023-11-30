import { todoMachine } from "@/machines/todoAppMachine";
import { useStore } from "@/pages";
import { useMachine } from "@xstate/react";
import type { NextPage } from "next";

export const DupTodo: NextPage = () => {
  const [machine, send] = useMachine(todoMachine, { devTools: true });

  const store = useStore();
  return (
    <div>
      <p>Dup Todo - store</p>
      <pre>{JSON.stringify(store.machine.context)}</pre>
      <button
        onClick={() =>
          store.send({
            type: "INPUT_CHANGE",
            value: "test update in dup machineCtx?",
          })
        }
      >
        store update?
      </button>
      <p>============================</p>
      <p>Dup Todo - machine</p>
      <pre>{JSON.stringify(machine.context)}</pre>
      <button
        onClick={() =>
          send({
            type: "INPUT_CHANGE",
            value: "test update in dup?",
          })
        }
      >
        machine update?
      </button>
      <p>============================</p>
    </div>
  );
};
