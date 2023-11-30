// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.Todo machine.deleting:invocation[0]": {
      type: "done.invoke.Todo machine.deleting:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.Todo machine.loading:invocation[0]": {
      type: "done.invoke.Todo machine.loading:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.Todo machine.saving:invocation[0]": {
      type: "done.invoke.Todo machine.saving:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.Todo machine.deleting:invocation[0]": {
      type: "error.platform.Todo machine.deleting:invocation[0]";
      data: unknown;
    };
    "error.platform.Todo machine.loading:invocation[0]": {
      type: "error.platform.Todo machine.loading:invocation[0]";
      data: unknown;
    };
    "error.platform.Todo machine.saving:invocation[0]": {
      type: "error.platform.Todo machine.saving:invocation[0]";
      data: unknown;
    };
    "xstate.after(3000)#Todo machine.error": {
      type: "xstate.after(3000)#Todo machine.error";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    deleteTodo: "done.invoke.Todo machine.deleting:invocation[0]";
    loadTodos: "done.invoke.Todo machine.loading:invocation[0]";
    saveTodo: "done.invoke.Todo machine.saving:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    assignDeleteTodo: "done.invoke.Todo machine.deleting:invocation[0]";
    assignErrorToContext:
      | "error.platform.Todo machine.deleting:invocation[0]"
      | "error.platform.Todo machine.loading:invocation[0]"
      | "error.platform.Todo machine.saving:invocation[0]";
    assignFormInputToContext: "INPUT_CHANGE";
    assignSavedTodo: "done.invoke.Todo machine.saving:invocation[0]";
    assignServiceTodoResult: "done.invoke.Todo machine.loading:invocation[0]";
    clearInput: "done.invoke.Todo machine.saving:invocation[0]";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    canSave: "SAVE";
  };
  eventsCausingServices: {
    deleteTodo: "DELETE";
    loadTodos: "xstate.init";
    saveTodo: "SAVE";
  };
  matchesStates: "deleting" | "error" | "idle" | "loading" | "saving";
  tags: never;
}
