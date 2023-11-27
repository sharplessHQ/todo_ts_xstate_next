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
    /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAIC2BDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogDMAJgCMFACwA2FwHZHADgCs9l62ni4ANCAAnoj29j4Ubm72fn5utsFJjo5+AL7Z4UI4BCScEvSkjEJsYABO1ajVFEYANioAZvXYFAUixeK0ZRUycgpK5pq6+pYmsGZqpJY2CI62zkk+AJyJ9rYevi4+4VEIKy4UPk6Osalabn5eufkyhaKclZilkKwAwtVgKpgAOTAAHdJkgQNNZhZwYsnLYKLZ1jd7B5glo0u5Doh1itXDdfD4Qlp7DcHiBukUxF0hu9+p8ACJgJpgZRgMHGUxjBbYrSuTwOHy2Fx+QUuFzorFLLQ41zilyBfEbQVkikvSg-P6qcqAkHSDAUADKhFQwKk7Wq2EwZCMAFdlKwAGIdK2kW3KTBEXDlSDsiGcubchD7OLizZ3fzynF3SWZLSeCjbFyIvyeTw+XxaFwqp49KkalRSIHAvWoQ3G03a82W6121gGm0AI2wZl9kK5MMQngSFC0G1iwsS+1TMa0y3iSMuaaHXfW2Ywz16FHzWsYRZLhtw3CkQnY6koCgE1Pnuc4y8LuqEG632qE8lIvFGc30rf90NAiwAtLZeZt1o4u-Ynj9qmbiSj40pnAkSRij4PhuOs-hzsIlKnr8Bbamul4Gpu24yKwNR1A0zRtB0R7IWqS5oSuOrFlhOE3jId4PgW6jProUyvvMHYIKKFDrCmKwnI47i2JKOLwuKbiOOs3gpiifiznk5I5ihlCMsy1E7hw+73vwggqRR6ksrhGBMYoLHjHo7Hgm2AbcR+lzwskth3DJKyCusgExiSP6eOJ2yIhs6xZkpqqLkZml4QR9SNC0yhVmRC5UhFJmoGZj6sRM1kcjM7bvtEiJ8Y4bhwZ4IpSZmXmRIgwkpBQARdlofiXCkgGOEhSWcCl2rKE80W-BArBWLAygqJQuCtKy1QABRJFoWgAJSsGFyVMsZPV9bU9Q+tlfq5XZ+UILEfgJr4gH2Ah0rNZ4Mb-vYCKpP+A5NWVtgdSealrdRvXzv1nwGkYYCQJgNpGC++1vtYNUyfVo6wSKQqXNJoHVUsTjrBQaaZI4vbwZmfhvWSpDoHAlgreQHEQ1xh0Od49UE65-K+IiVVHFkFA41kXgpiK5xJJ472qdQ-SpfANmcYG8ojvdbijgzHjNYE7iCxRpSi5gACiW0DZTULU1DaP3WKSTwcEsu+MVkrwRjCm+GVF0oqkbgq4ubwfBAut5QbSsIiSfluCEsTEpiqPrH+8R+TjOzwQFLt5lR560TInsHQbYq8qGtz7HcF0uWEqOyQixXeH5E7CvYceoZqifrkaJpms6NbKCnkOLKVZwKpHYrF44t0inxgRwTi8O+M7oUGYuZ4YReMhXqlLf64sAfwi5WTSn5cGywcqPgfd6YB81o-JIElefRp8-i1TgZfhjsSZH5lWjgH9gxoF9UuQpPMyeip8UN1jA-SwH9D2l89aBmOqdQCzVCS9hkt5MO9MkSChCApTyuRchAA */

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
        invoke: {
          src: "loadTodos",
          onDone: {
            target: "Todos Loaded",
            // actions: "consoleLogTodos",
            actions: "assignTodosToContext",
          },
          onError: {
            target: "Loading Todos Errored",
            actions: "assignErrorToContext",
          },
        },
        // on: {
        //   "Loading todos failed": { target: "Loading Todos Errored" },
        // },
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
