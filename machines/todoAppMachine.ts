import { actions, createMachine, assign } from "xstate";

type EventType =
  | {
      type: "Creat New";
    }
  | {
      type: "Form input changed";
      value: string;
    }
  | {
      type: "Submit";
    }
  | {
      type: "Delete";
      todo: string;
    }
  | {
      type: "Speed up";
    };
export const todoMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAIC2BDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogDMAJgCMFACwA2FwHZHADgCs9l62ni4ANCAAnoj29j4Ubm72fn5utsFJjo5+AL7Z4UI4BCScEvSkjEJsHJQKAhQFIsXitGUVMnIKSuaauhqOBkggJrBmaqSWNgi2iRRavn5aAT4AnD4r9uFRU37Ls56pnlrLblpujp45eSANRWLULVKVrGAATi+oLxRGADYqAGYfbD1GSFUQlB7laQseSkXhdMb6fSWYajCyDSaOWzOJIrRL2aYuXwuHybOyOFwUHxORyxVKnPxeXL5EGNO6VTClSCsADCLzAKkwADkwAB3JGDFHdCbRTEUWzLU72DzBLRpdykhDLLGuU6+HwhLT2U5M64s26cdmciCsAAiYG+YGUYHFxlMUvRiAVrk8Dh8thcfj9Lhcqo1jiOtlcIZcgV1Kz9JpuYMovP5qkhwpFUNQFAAyoRUCKpACXthMGQjABXZSsABigPLpCrykwRFw5UgLqGbrG0oQxLiIeODP8Ma1DLD4c8FHxLnlfk8nh8vi0LkTZuTFFTKikmezeYLRchJbLFerrFzlYARtgzF3Jb2PQh9m5ZusfAHEsTF2G5pG3AqNJLt++zLOuGCgk0W58juGaivuua4NwjwyOw6g1LC-CCBuUHbumjB7kIeZIShGAwnCO7qIiujIj2aKgJMAC0thaBQxzLOciSeLEXj7BqPhHJSCRJMGawAf44HCOaKYwfhQrwURiHIZCQjPG8HxfL8ygnsCEGspweG7gpMjEcpbRkZ0lE9HoNESnR4xPkGbELliWKEu4tgalqkYhmcyzeAuSo7JJkF3HaDpyap1RcJhdRJlB4WOqRqDkYoVnUQMrojO6DGIIxNKRsktgMv5WJ+ss9ieGGRqsf53n4vKKzLGuVzxWF9pJSpqGvO8nw-P8gK6VJm6JZFMipfCVG9LZWWog5uUIPiuwcW4PhuBca3hjGVWRIg5IpBQAT7IsNIpJVjghfplCjVIyggj1HxcrmRhgJAmCVkY972X2jj+YdcxrIG-o0r9bjVb9FBLpk4ZrQqAa2Jd0kUDdkJ3RBD18taViwMoKiULgfxOi8AAULFaFoACUrBtZwKOMGjWAY52M3dtlj4LTs9iQ7EwSrYcKw7VsNIAa4gSw7YgO+G4uRXKQ6BwJYNNgLRbP0dYeXnM4RUlT6vjypVYZ+BQ4ZZEB3jhixF2tThdylMl8B2ar83q-2Gy7Qg4ZcycWTFR4fg0sG0vW3pSN211LCYAAoupmMq3NP0xFGSQAbzAOOGD7sAbsOy+Bc9gVQk0yI5ulotJAcc5S7gQUg4WieMcISxIa6ru8sHHxPXFsJBVaTF7hslGVmQgV+zLvBqxQ5uCODL58VYTuwFcrp3nHj7AulzMiHm6GXBQ8mfmhbFg2Z7KCPauTGt05UiGnfBsvjiToGbFiynktrX3dw7wRxkYKZyVn87SY61IzFSyEceua0TgkndgJLmy51r+ylskQIH9aYdTGhgABfZmK7FiJkeuq4jTLzdkLRqh1io7HXv5VUqDrroNuvdGO5dHbxyfLEI2ThKr+31FoAW1U26HR2Lw4IAY272BltkIAA */

    tsTypes: {} as import("./todoAppMachine.typegen").Typegen0,
    schema: {
      // events: {} as
      //   | { type: "Todos loaded"; todos: string[] }
      //   | { type: "Loading todos failed"; errorMessage: string },
      services: {} as {
        loadTodos: {
          data: string[];
        };
        saveTodos: {
          data: void; // no need to save/return anything here
        };
        deleteTodo: {
          data: void; // no need to save/return anything here
        };
      },
      events: {} as EventType,
    },
    context: {
      todos: [] as string[],
      errorMessage: undefined as string | undefined,
      createNewTodoFormInput: "",
    },
    id: "Todo machine",
    initial: "Loading Todos",

    states: {
      "Loading Todos": {
        // on: {
        //   "Loading todos failed": { target: "Loading Todos Errored" },
        // },
        invoke: {
          src: "loadTodos",
          onDone: [
            {
              target: "Todos Loaded",

              // actions: "consoleLogTodos",
              actions: "assignTodosToContext",

              cond: "Has todos",
            },
            { target: "Creating New Todo" },
          ],
          onError: {
            target: "Loading Todos Errored",
            actions: "assignErrorToContext",
          },
        },
      },

      "Loading Todos Errored": {},

      "Todos Loaded": {
        on: {
          "Creat New": "Creating New Todo",
          Delete: "Deleting Todo",
        },
      },

      "Creating New Todo": {
        initial: "Showing form input",
        states: {
          "Showing form input": {
            on: {
              "Form input changed": {
                // target: "Showing form input",
                // internal: true,
                actions: "assignFormInputToContext",
              },

              Submit: "Saving Todo",
            },
          },

          "Saving Todo": {
            invoke: {
              src: "saveTodo",
              onError: {
                target: "Showing form input",
                actions: "assignErrorToContext",
              },
              onDone: { target: "#Todo machine.Loading Todos" },
            },
          },
        },
      },

      "Deleting Todo": {
        invoke: {
          src: "deleteTodo",
          onError: {
            target: "Deleting todo errored",
            actions: "assignErrorToContext",
          },
          onDone: "Loading Todos",
        },
      },

      "Deleting todo errored": {
        after: {
          "3000": "Todos Loaded",
        },

        on: {
          "Speed up": "Todos Loaded",
        },
      },
    },
  },
  {
    guards: {
      "Has todos": (context, event) => {
        return event.data.length > 0;
      },
    },
    actions: {
      assignTodosToContext: assign((context, event) => {
        return { todos: event.data };
      }),
      assignErrorToContext: assign((context, event) => {
        return { errorMessage: (event.data as Error).message };
      }),
      assignFormInputToContext: assign((context, event) => {
        return { createNewTodoFormInput: event.value };
      }),
    },
  }
);
