import React from "react"
import styled from "styled-components"
import Calculator from "./calculator"

const App: React.FC = () => {
  return (
    <Container>
      <Calculator />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 40px;
`

export default App
