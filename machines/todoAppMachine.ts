import { actions, createMachine, assign, StateFrom } from "xstate";

type EventType =
  | {
      type: "SAVE";
    }
  | {
      type: "INPUT_CHANGE";
      value: string;
    }
  | {
      type: "DELETE";
      todo: string;
    }
  | {
      type: "Speed up";
    };

type ContextType = {
  todos: string[];
  errorMessage: string | undefined;
  createNewTodoFormInput: string;
};

export type TodoMachine = StateFrom<typeof todoMachine>;
export type TodoMachineSend = (arg: TodoMachine["events"][number]) => void;

export const todoMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAIC2BDAxgBYCWAdmAHQA2quEZUAxBuRWQG6oDWlaGOBEqxp0GCDqny4ALsVSkA2gAYAuspWJQAB1Sxis+ZpAAPRACYLFAGwAOAKx2A7DaV2rAFntWANCACeiA52FADMHo7uAIw2AJxmMZGRMQC+yb58WHhEZJQi9KRMYABORahFFFpUMgBmZdgUGQLZwrT5UOKknFIGiqrqRjp6PUamCGZWIRRmdpHu7kpKjh4h0SG+AQghNlZTdjFRMQmLjjGOqenomYI5bBBUYIwAkgByAAoAqsgA+gDCABIAQWeAHEAKL9JAgQb6OSkEaIRxmRwUOxKSJmGzRE5uFbrRAhQ6hGJWOLbRZmeYhc4gRpZISUYh3B4AZQBADVwaoBroYYZIaMrIkKEowu54hFIlZpj5-Ih7MEIjM3EpxnYQp5qbTrqxGfdGAARUEAGVByE5Gkh0OG-MCMUmdhs9gxSlO8XceIQNncFE8hwx6KUUTRNk1lya9IosFw7AYzHkDM63F4YbpNyjMYKHS6Mlh6gh2h51tAo0iDp9TilzlmkRCuNlCEcISUoSUXr2JKlUpDaRpKe1lHTseKpXKlRqdQafeaA+jYgk3VzfS5lsLsPhCCikxiixCjkbVhOjj2HsFwRJNhCMz3pdc7lD-FTrAgYHusgKcZ1iZ4k4f-Yoz9fOdEwXeQ82XAshjXG0N0bKZHEDFUVnRdxGw9JJvRrWZxiWMwXVie8rmnf8XzAN9ChKMoKiqaRaiKeotSIgDSKA7MejAi0IN5OFoPGGIfXVI87HcBJ0Q9cZJjmbDIkDMwQlwuwCPDG5hzKRhmS0MBIEwABXLR8yhVc+WLRBpJdFFTn2aY0UlWsPTcZEkiPWTG3cFZhMUx9KBUopGGMWBpBkShcGqaRigACibBYAEpGAYiNvP0q0oOMhAHUiawMUdRxpIxKwpTs9wdkvI9BOJXc3FSHtSHQOAjDinJuUgoyTEQABaMxZgoQ5CopRZ7JiBwPVayY0QWbKYi9SVDiSDy-zyBhGq49dWslb0HTmIS8qiGxsrssywiWOSq3guwzFmojdTARaixaz0FgoE4LFiSVW1sRwPWEviD0lWwRTtClL3OiNBwKa7ktulaCQe045MxDw4hck9hIoFxHQxClBWcFIe3qp8SLIsHmtGFa8q6-YpXmI8DwGuwxPmYVBXQzxxilO0geUiiikJ7iUs8ZExXgySHCQg8PQJZFAyQlxZhFClKuSIA */
    tsTypes: {} as import("./todoAppMachine.typegen").Typegen0,
    schema: {
      services: {} as {
        loadTodos: {
          data: string[];
        };
        saveTodo: {
          data: string; // no need to save/return anything here
        };
        deleteTodo: {
          data: string; // no need to save/return anything here
        };
      },
      events: {} as EventType,
      context: {} as ContextType,
    },
    context: {
      todos: [],
      errorMessage: undefined,
      createNewTodoFormInput: "",
    },
    id: "Todo machine",
    initial: "loading",

    states: {
      loading: {
        invoke: {
          src: "loadTodos",
          onDone: [
            {
              target: "idle",
              actions: "assignServiceTodoResult",
            },
          ],
          onError: {
            target: "error",
            actions: "assignErrorToContext",
          },
        },
      },
      idle: {
        on: {
          INPUT_CHANGE: {
            actions: "assignFormInputToContext",
          },
          SAVE: {
            target: "saving",
            cond: "canSave",
          },
          DELETE: {
            target: "deleting",
          },
        },
      },

      saving: {
        invoke: {
          src: "saveTodo",
          onError: {
            target: "error",
            actions: "assignErrorToContext",
          },
          onDone: {
            target: "idle",
            actions: ["assignSavedTodo", "clearInput"],
          },
        },
      },

      deleting: {
        invoke: {
          src: "deleteTodo",
          onError: {
            target: "error",
            actions: "assignErrorToContext",
          },
          onDone: {
            target: "idle",
            actions: ["assignDeleteTodo"],
          },
        },
      },

      error: {
        after: {
          "3000": "idle",
        },

        on: {
          "Speed up": "idle",
        },
      },
    },
  },
  {
    guards: {
      canSave: (ctx): boolean => {
        if (ctx.createNewTodoFormInput.trim().length === 0) return false;
        if (ctx.todos.includes(ctx.createNewTodoFormInput.trim())) return false;

        return true;
      },
    },
    actions: {
      assignErrorToContext: assign((ctx, event) => {
        return { errorMessage: (event.data as Error).message };
      }),
      assignFormInputToContext: assign((ctx, event) => {
        return { createNewTodoFormInput: event.value };
      }),
      clearInput: assign({
        createNewTodoFormInput: "",
      }),
      assignServiceTodoResult: assign((_ctx, event) => ({
        todos: event.data,
      })),
      assignSavedTodo: assign((ctx, event) => {
        return { todos: [...ctx.todos, event.data] };
      }),
      assignDeleteTodo: assign((ctx, event) => {
        return { todos: ctx.todos.filter((todo) => todo !== event.data) };
      }),
    },
    services: {
      loadTodos: async () => {
        // throw new Error("oh no... can't load...");
        // query
        return ["a", "b"];
      },
      saveTodo: async (ctx, event): Promise<string> => {
        // throw new Error("oh no... can't add...");
        // save to db
        return ctx.createNewTodoFormInput;
      },
      deleteTodo: async (ctx, event): Promise<string> => {
        // throw new Error("oh no... can't delete...");
        // const filtered = ctx.todos.filter((todo) => todo !== event.todo);
        // if (filtered.length === ctx.todos.length) return Promise.reject();
        // delete in db?
        if (!ctx.todos.includes(event.todo)) return Promise.reject();
        return event.todo;
      },
    },
  }
);
