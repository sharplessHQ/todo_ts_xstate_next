import { actions, createMachine, assign } from "xstate";

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
export const todoMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAIC2BDAxgBYCWAdmAHQA2quEZUAxBuRWQG6oDWlaGOBEqxp0GCDqny4ALsVSkA2gAYAuspWJQAB1Sxis+ZpAAPRACYLFAGwAOAKx2A7DaV2rAFntWANCACeiA52FADMHo7uAIw2AJxmMZGRMQC+yb58WHhEZJQi9KRMYABORahFFFpUMgBmZdgUGQLZwrT5UOKknFIGiqrqRjp6PUamCGZWIRRmdpHu7kpKjh4h0SG+AQghNlZTdjFRMQmLjjGOqenomYI5bBBUYIwAkgByAAoAqsgA+gDCABIAQWeAHEAKL9JAgQb6OSkEaIRxmRwUOxKSJmGzRE5uFbrRAhQ6hGJWOLbRZmeYhc4gRpZISUYh3B4AZQBADVwaoBroYYZIaMrIkKEowu54hFIlZpj5-Ih7MEIjM3EpxnYQp5qbTrqxGfdGAARUEAGVByE5Gkh0OG-MCMUmdhs9gxSlO8XceIQNncFE8hwx6KUUTRNk1lya9IosFw7AYzHkDM63F4YbpNyjMYKHS6Mlh6gh2h51tAo0iDp9TilzlmkRCuNlCEcISUoSUXr2JKlUpDaRpKe1lHTseKpXKlRqdQafeaA+jYgk3VzfS5lsLsPhCCikxiixCjkbVhOjj2HsFwRJNhCMz3pdc7lD-FTrAgYHusgKcZ1iZ4k4f-Yoz9fOdEwXeQ82XAshjXG0N0bKZHEDFUVnRdxGw9JJvRrWZxiWMwXVie8rmnf8XzAN9ChKMoKiqaRaiKeotSIgDSKA7MejAi0IN5OFoIAWlLMwfRWKwRUSKwuzWeskQE6ZSViGxD2cAjwxuYcykYZktDASBMAAVy0fMoVXPli0QSIFhiFFTn2aY0UlWsPTcZEkiPMxd3VFZ3BSHsGIjVSikYYxYGkGRKFwappGKAAKJsFgASkYHyVIoooDKtKCTIQB1ImsDFHUcMyMTEswHPcHZLyPI9213NxUh7Uh0DgIxEvIblIOMkxEB4sx0RRL13DsUqPCxSIPR44JDgmjta1RL0rCUx9claBhWq49c+I8Xq5gGsSonkkb61RCywiWEIkUxeC7DMea-11MAVqLDrPQWCgTgsWJJVbWxHA9TyLIPSVbBFO0KUva6iMHAp7vSx6+IJF7TlOzEPDiRt3XrZGKBcR0MQpQVnC8i5f0YkiyKh9rRjFD1MVCCwEgG4lhMKsHfOSsnuIyzxkTFeC5mmNVRO++sCWRQMkJcWYRQpWrkiAA */
    tsTypes: {} as import("./todoAppMachine.typegen").Typegen0,
    schema: {
      services: {} as {
        loadTodos: {
          data: string[];
        };
        saveTodo: {
          data: string[]; // no need to save/return anything here
        };
        deleteTodo: {
          data: string[]; // no need to save/return anything here
        };
      },
      events: {} as EventType,
      context: {} as {
        todos: string[];
        errorMessage: string | undefined;
        createNewTodoFormInput: string;
      },
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
              actions: "assignTodosToContext",
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
            actions: ["assignServiceTodoResult", "clearInput"],
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
            actions: ["assignServiceTodoResult"],
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
    actions: {
      assignTodosToContext: assign((ctx, event) => {
        return { todos: event.data };
      }),
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
    },
    services: {
      loadTodos: async () => {
        // throw new Error("oh no... can't load...");
        return [];
      },
      saveTodo: async (ctx, event) => {
        // throw new Error("oh no... can't add...");
        return [...ctx.todos, ctx.createNewTodoFormInput];
      },
      deleteTodo: async (ctx, event): Promise<string[]> => {
        // throw new Error("oh no... can't delete...");
        const filtered = ctx.todos.filter((todo) => todo !== event.todo);
        if (filtered.length === ctx.todos.length) return Promise.reject();
        return filtered;
      },
    },
  }
);
