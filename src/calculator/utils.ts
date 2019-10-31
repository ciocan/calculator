import { EventType } from "./state-chart"

interface Button {
  gridArea: string
  type: EventType
}
interface ButtonMap {
  [value: string]: Button
}

export const buttonMap: ButtonMap = {
  ac: { gridArea: "ac", type: "CANCEL" },
  "±": { gridArea: "sign", type: "SIGN" },
  "%": { gridArea: "percent", type: "PERCENTAGE" },
  "/": { gridArea: "divide", type: "OPERATOR" },
  x: { gridArea: "multiply", type: "OPERATOR" },
  "-": { gridArea: "minus", type: "OPERATOR" },
  "+": { gridArea: "plus", type: "OPERATOR" },
  "[=]": { gridArea: "equals", type: "EQUALS" },
  "1": { gridArea: "one", type: "NUMBER" },
  "2": { gridArea: "two", type: "NUMBER" },
  "3": { gridArea: "three", type: "NUMBER" },
  "4": { gridArea: "four", type: "NUMBER" },
  "5": { gridArea: "five", type: "NUMBER" },
  "6": { gridArea: "six", type: "NUMBER" },
  "7": { gridArea: "seven", type: "NUMBER" },
  "8": { gridArea: "eight", type: "NUMBER" },
  "9": { gridArea: "nine", type: "NUMBER" },
  "0": { gridArea: "zero", type: "NUMBER" },
  ".": { gridArea: "dot", type: "DECIMAL_POINT" }
}

export const COLORS = {
  blue: "#186b98",
  lightblue: "#1695d4",
  dark: "#373d45",
  yellow: "#fdd800"
}

export const colorTypeMap = {
  CANCEL: COLORS.blue,
  SIGN: COLORS.blue,
  PERCENTAGE: COLORS.blue,
  OPERATOR: COLORS.lightblue,
  EQUALS: COLORS.lightblue,
  NUMBER: COLORS.dark,
  DECIMAL_POINT: COLORS.dark
}

export const doMath = (
  operand1: number,
  operand2: number,
  operator: string
) => {
  switch (operator) {
    case "+":
      return operand1 + operand2
    case "-":
      return operand1 - operand2
    case "/":
      return (operand1 / operand2).toFixed(10)
    case "x":
      return operand1 * operand2
    default:
      return Infinity
  }
}
