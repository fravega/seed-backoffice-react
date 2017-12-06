// @flow
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import React from 'react'
import styled from 'styled-jss'
import Typography from 'material-ui/Typography'

export const ToolbarActions = styled('div')({
  flex: '1 1 100%',
  textAlign: 'right',
  '& > div': { margin: '0px 5px' }
})

export const PaperContainer = styled(Paper)({
  width: '100%',
  padding: '15px',
  flexGrow: 1
})

export const ToolbarSpacer = styled('div')({ flex: '1 1 100%' })

export const ToolbarTitle = styled(({ children, ...props }) =>
  <Typography { ...props } type="title">{ children }</Typography>
)({ flex: '0 0 auto' })

export const Container = styled(({ children, ...props }) =>
  <Grid { ...props } container>{ children }</Grid>
)({
  flexGrow: 1,
  height: '100%',
  '& input:disabled': { color: 'black' },
  '& > div': { marginBottom: 15 }
})
