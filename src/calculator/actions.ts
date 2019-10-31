import { assign } from "xstate"
import { Context } from "./state-chart"
import { doMath } from "./utils"

export const INITIAL_CONTEXT: Context = {
  operand1: "",
  operand2: "",
  operator: "",
  display: "0"
}

export const resetContext = assign({ ...INITIAL_CONTEXT })

export const processDisplay = assign({
  display: (ctx: any) => {
    const { operand1, operator, operand2 } = ctx
    if (operand2) {
      return `${operand1}${operator}${operand2}`
    }
    if (operator) {
      return `${operand1}${operator}`
    }
    return operand1
  }
})

export const processOperand1 = assign({
  operand1: (ctx: any, evt: any) => `${ctx.operand1}${evt.payload.value}`
})

export const processOperand2 = assign({
  operand2: (ctx: any, evt: any) => `${ctx.operand2}${evt.payload.value}`
})

export const processDecimalPoint1 = assign({
  operand1: ({ operand1 }: any) =>
    operand1.includes(".") ? operand1 : `${operand1}.`
})

export const processDecimalPoint2 = assign({
  operand2: ({ operand2 }: any) =>
    operand2.includes(".") ? operand2 : `${operand2}.`
})

export const processPercentage1 = assign({
  operand1: ({ operand1 }: any) => `${+operand1 / 100}`
})

export const processPercentage2 = assign({
  operand2: ({ operand2 }: any) => `${+operand2 / 100}`
})

export const processSign1 = assign({
  operand1: ({ operand1 }: any) => (-+operand1).toString()
})

export const processSign2 = assign({
  operand2: ({ operand2 }: any) => (-+operand2).toString()
})

export const processOperator = assign({
  operator: (ctx: any, evt: any) => evt.payload.value
})

export const processEquals = assign({
  display: (ctx: any) => {
    const { operand1, operator, operand2 } = ctx
    const equals = doMath(+operand1, +operand2, operator)
    return `${equals}`
  }
})

export const isOperand1 = ({ operand1 }: any) => !!operand1
