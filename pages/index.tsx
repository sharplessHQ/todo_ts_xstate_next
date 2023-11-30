import { DupTodo } from "@/components/dupTodo";
import { MouseAction } from "@/components/mouseAction";
import {
  TodoMachineSend,
  TodoMachine,
  todoMachine,
} from "@/machines/todoAppMachine";
import { useMachine } from "@xstate/react";
import type { NextPage } from "next";
import { createContext, useContext } from "react";

type MachineContextStore = {
  machine: TodoMachine;
  send: TodoMachineSend;
};
export const MachineContext = createContext<null | MachineContextStore>(null);

export function useStore(): MachineContextStore {
  const rootStore = useContext(MachineContext);
  if (rootStore === null) {
    throw new Error("store cannot be null, please add a context provider");
  }
  return rootStore;
}

const Home: NextPage = () => {
  const [machine, send] = useMachine(todoMachine, { devTools: true });

  return (
    <MachineContext.Provider value={{ machine, send }}>
      <MouseAction />
      <DupTodo />
      <p>Todos Demo</p>
      <div>
        <div>
          ---------------------------Todo State---------------------------
        </div>
        <pre>{JSON.stringify(machine.value)}</pre>
        <pre>{JSON.stringify(machine.context)}</pre>
        <div>
          ---------------------------Todo List---------------------------
        </div>
        {machine.matches("idle") && (
          // {machine.context.todos.length > 0 && (
          <>
            {machine.context.todos.map((todo, i) => (
              <div
                key={i}
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <p>{todo}</p>
                <button
                  disabled={!machine.can({ type: "DELETE", todo })}
                  onClick={() => send({ type: "DELETE", todo })}
                >
                  Delete
                </button>
              </div>
            ))}
          </>
        )}

        {machine.matches("deleting") && (
          <>
            <p>Something went wrong: {machine.context.errorMessage}</p>
            <button
              onClick={() => {
                send({
                  type: "Speed up",
                });
              }}
            >
              Go back to List
            </button>
          </>
        )}

        {machine.matches("idle") && (
          <form
            action="submit"
            onSubmit={(e) => {
              e.preventDefault();
              send({ type: "SAVE" });
            }}
          >
            <input
              type="text"
              value={machine.context.createNewTodoFormInput}
              onChange={(e) =>
                send({
                  type: "INPUT_CHANGE",
                  value: e.target.value,
                })
              }
            />
            <button disabled={!machine.can({ type: "SAVE" })} type="submit">
              Add
            </button>
          </form>
        )}
      </div>
    </MachineContext.Provider>
  );
};

export default Home;
