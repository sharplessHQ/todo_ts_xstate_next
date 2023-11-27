import { actions, createMachine, assign } from "xstate";

export const todoMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAIC2BDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogDMAJgCMFACwA2FwHZHADgCs9l62ni4ANCAAnoj29j4Ubm72fn5utsFJjo5+AL7Z4UI4BCScEvSkjEJsYABO1ajVFEYANioAZvXYFAUixeK0ZRUycgpK5pq6+pYmsGZqpJY2CI62zkk+AJyJ9rYevi4+4VEIKy4UPk6Osalabn5eufkyhaKclZilkKwAwtVgKpgAOTAAHdJkgQNNZhZwYsnLYKLZ1jd7B5glo0u5Doh1itXDdfD4Qlp7DcHiBukUxF0hu9+p8ACJgJpgZRgMHGUxjBaIRxuTwUewhBIuTJuYlaG5YpZaTYUPzrFyC5aeGLrHFkikvSg-P6qcqAkHSDAUADKhFQwKk7Wq2EwZCMAFdlKwAGIdO2kR3KTBEXDlSDsiGcubchD7OIuGW3fZ3ew4u5SzJafnbFyIvyeTw+XxaFwap49Kk6lRSIHAo2oU3my36622+1O1gmh0AI2wZkDkK5MMQngSFC0G1iLhSgUJnkTWmW8SRlyz+0zbnW+Ywz16FGLesYZYrptw3CkQnY6koCgE1NXhc4m9LhqEe4P+qE8lIvFGc30neD0NAiwAtLYWgUJs6yOH2grDouUo+DKZwJEkLjhku-grsIlLXr8Jb6ju94mvuh4yKwNR1A0zRtB0F5oVqG6YVuBrlrh+FPjIL5viW6ifroUzfvMPYID4tinOsGYrCcjjuLYUo4vCkZuI46zeBmKLyqha5UoyzJ0UexH1I0LTKHWlFqZwGksgRGCsYo7HjHoXHgl2IZ8dsbhyhK+xJHc6xJG4iYovy5yBMm3hqp4qlXpQplaYRHCnq+-CCAW6ERUyZnMRZIzWZxBj2TxoZ-pc8LJLYnmeCsAleROkQ8iSQEKdJ2yIhsCq5HkICkOgcCWJqvTcTM3a-og+XeHKfjFS4CllYigqJn4FCOFOATJLypUqnmrXdVSpTmbIvVQrxA1hvYk72PEC3FR4fiXIhbhhUl1D9NtsCYAAorU9SQLt-XWNVJ2Id5OJ9lO2Y+VVCBLuscqgYSAReQkOy3dRbwfBAn2OQdgSnA4yabCEsTEpioNqs4fKgeiCReWkCPrje2F3jIqM-t9YaRnimx3P4irxmEoOKQiy0eEihJxrYVNFrRt4MTIVYWla7oNsoDP7UzPh8mcgWeKBiHLY4iZZHEXn7Eutg+P4vg3etiXUTT2508aeGPoMGCK6GfLwsVWQyhrKtigcoMwSdwOeJdZvJIEosmSlUVOzlfVo0zDhzeKo18k443rL7RyXB4AqiX2KzpyF4fJZpUjKE8Om-CjMd7ZYZdGDyDj+TEkaZvJCnhMyrQKwgcZxEKKSgUHIrp9zLaoMoZfYA3Qdq+rwXtyA1TEFAhDdyKffuAPYF3PJPjc5aEDKIQ1VaOEhBgMvq+IPs4SwunFD90u2-D3viaN7PLfz6FLVAA */

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
      events: {} as
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
          },
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

      "Deleting todo errored": {},
    },
  },
  {
    actions: {
      // consoleLogTodos: (context, event) => alert(JSON.stringify(event.todos)),
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
