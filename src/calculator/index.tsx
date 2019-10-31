import React from "react"
import styled from "styled-components"
import { useMachine } from "@xstate/react"
import { Button } from "./button"
import { buttonMap, COLORS } from "./utils"
import { stateChart } from "./state-chart"

export default () => {
  const [machine, send] = useMachine(stateChart)
  const { context } = machine

  return (
    <Container>
      <Result length={context.display.length}>{context.display}</Result>
      {Object.keys(buttonMap).map((value: string) => (
        <Button
          value={value}
          key={value}
          onClick={() => send(buttonMap[value].type, { payload: { value } })}
        />
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-gap: 1px;
  width: 240px;
  grid-auto-columns: 1fr;
  grid-template-areas:
    "result result result result"
    "ac sign percent divide"
    "seven eight nine multiply"
    "four five six minus"
    "one two three plus"
    "zero zero dot equals";
`

const Result = styled.div<any>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  grid-area: result;
  min-height: 50px;
  word-wrap: break-word;
  background: ${COLORS.yellow};
  color: ${COLORS.blue};
  font-size: 42px;
  font-size: ${({ length }) => (length > 8 ? "21px" : "42px")};
  padding: 8px 16px;
  text-align: right;
`
