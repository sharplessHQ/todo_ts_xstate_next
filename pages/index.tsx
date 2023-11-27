import MouseAction from "@/components/mouseAction";
import { todoMachine } from "@/machines/todoAppMachine";
import { useMachine } from "@xstate/react";
import type { NextPage } from "next";

const todos = new Set<string>(["learn xstate", "learn maplibre"]);

const Home: NextPage = () => {
  const [state, send] = useMachine(todoMachine, {
    services: {
      loadTodos: async () => {
        // throw new Error("oh no...");
        return Array.from(todos);
      },
      saveTodo: async (context, event) => {
        // throw new Error("oh no...");
        todos.add(context.createNewTodoFormInput);
      },
      deleteTodo: async (context, event) => {
        // throw new Error("oh no...");
        todos.delete(event.todo);
      },
    },
  });

  return (
    <>
      <MouseAction />
      <p>Todos Demo</p>
      <div>
        <pre>{JSON.stringify(state.value)}</pre>
        <pre>{JSON.stringify(state.context)}</pre>
        <div>
          ---------------------------Todo List---------------------------
        </div>
        {state.context.todos.map((todo, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center" }}>
            <p>{todo}</p>
            <button onClick={() => send({ type: "Delete", todo })}>
              Delete
            </button>
          </div>
        ))}
        <div>
          {state.matches("Todos Loaded") && (
            <button
              onClick={() => {
                send({ type: "Creat New" });
              }}
            >
              Create New Todo
            </button>
          )}
        </div>
        {state.matches("Creating New Todo.Showing form input") && (
          <form
            action="submit"
            onSubmit={(e) => {
              e.preventDefault();
              send({ type: "Submit" });
            }}
          >
            <input
              type="text"
              onChange={(e) =>
                send({
                  type: "Form input changed",
                  value: e.target.value,
                })
              }
            />
            <button type="submit">Add</button>
          </form>
        )}
        {/* <button
          onClick={() =>
            send({
              type: "Todos loaded",
              todos: ["learn xstate", "learn maplibre"],
            })
          }
        >
          Todos loaded
        </button>
        <button
          onClick={() =>
            send({ type: "Loading todos failed", errorMessage: "failed" })
          }
        >
          Loading todos failed
        </button> */}
      </div>
    </>
  );
};

export default Home;
