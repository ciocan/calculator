import React from "react"
import styled from "styled-components"
import { buttonMap, COLORS, colorTypeMap } from "./utils"

interface Props {
  value: string
  onClick: () => void
}

export const Button = ({ value, onClick }: Props) => {
  const { gridArea, type } = buttonMap[value]

  return (
    <Container onClick={onClick} gridArea={gridArea} bg={colorTypeMap[type]}>
      {value}
    </Container>
  )
}

const Container = styled.button<any>`
  width: 100%;
  height: 60px;
  grid-area: ${({ gridArea }) => gridArea};
  color: white;
  background: ${({ bg }) => bg};
  outline: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase;

  &:active {
    background-color: ${COLORS.yellow};
    color: ${COLORS.dark};
  }
`
