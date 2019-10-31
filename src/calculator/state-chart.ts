import { Machine } from "xstate"
import {
  INITIAL_CONTEXT,
  resetContext,
  processDisplay,
  processOperator,
  processOperand1,
  processOperand2,
  processSign1,
  processSign2,
  processPercentage1,
  processPercentage2,
  processDecimalPoint1,
  processDecimalPoint2,
  processEquals,
  isOperand1
} from "./actions"

export interface Context {
  operand1: string
  operand2: string
  operator: string
  display: string
}

interface Schema {
  states: {
    calc: {
      states: {
        start: {}
        operand2: {}
        result: {}
      }
    }
  }
}

export type EventType =
  | "NUMBER"
  | "SIGN"
  | "DECIMAL_POINT"
  | "PERCENTAGE"
  | "OPERATOR"
  | "CANCEL"
  | "EQUALS"

type Event = {
  type: EventType
  payload?: { value: string }
}

export const stateChart = Machine<Context, Schema, Event>({
  id: "calculator",
  context: INITIAL_CONTEXT,
  initial: "calc",
  states: {
    calc: {
      initial: "start",
      on: {
        CANCEL: "calc.start"
      },
      states: {
        start: {
          onEntry: [resetContext],
          on: {
            NUMBER: {
              actions: [processOperand1, processDisplay]
            },
            SIGN: {
              actions: [processSign1, processDisplay]
            },
            DECIMAL_POINT: {
              actions: [processDecimalPoint1, processDisplay]
            },
            PERCENTAGE: {
              actions: [processPercentage1, processDisplay]
            },
            OPERATOR: {
              target: "operand2",
              cond: isOperand1,
              actions: [processOperator, processDisplay]
            }
          }
        },
        operand2: {
          onEntry: [processDisplay],
          on: {
            NUMBER: {
              actions: [processOperand2, processDisplay]
            },
            SIGN: {
              actions: [processSign2, processDisplay]
            },
            DECIMAL_POINT: {
              actions: [processDecimalPoint2, processDisplay]
            },
            PERCENTAGE: {
              actions: [processPercentage2, processDisplay]
            },
            OPERATOR: {
              actions: [processOperator, processDisplay]
            },
            EQUALS: {
              target: "result",
              actions: [processEquals]
            }
          }
        },
        result: {
          on: {
            NUMBER: {
              target: "start"
            }
          }
        }
      }
    }
  }
})
