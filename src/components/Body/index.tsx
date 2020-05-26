import React from 'react'
import styled from 'styled-components'
import { Grid } from '@material-ui/core'

const Body = () => {
  return <BodyContainer container></BodyContainer>
}

const BodyContainer = styled(Grid)`
  min-height: 93vh;
`

export default Body
