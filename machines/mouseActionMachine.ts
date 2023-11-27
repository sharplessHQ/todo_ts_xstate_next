import { createMachine } from "xstate";

export const mouseActionMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOnwHsAXACXIDcwAnSAYmoHkA1AUQCUBtAAwBdRKAAO5WLkq5y+MSAAeiAIwAOAGwkAzABYdAdgCsxw5vUGjegDQgAnmp2qSATnevDAJk2v9Or1c9AF9guzQsPEJSbHomVgBZdgBVAGVuFIAVIVEkEElpWXlFFQQNbX8TMwsrQ1sHRHUXPQ9XVVU9PUFPHVCwkAoIOEUInAJiRQKZOQU80oBaTTtHBEXQ8Iwx6LIqWgZmCEmpaeK5xD0vZcbDEmN1HQCOwS9nd3WQUajiElj9yCPCjMSogHtogsZnKpNF5BOp1MZXMYrghXIISLCHqpBFDBAFnsY+sEgA */
  initial: "notHovered",
  states: {
    notHovered: {
      on: {
        MOUSEOVER: {
          target: "hovered",
        },
      },
    },
    hovered: {
      on: {
        MOUSEOUT: {
          target: "notHovered",
        },
      },
    },
  },
});
