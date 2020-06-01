import { withStyles } from '@material-ui/core'

const GlobalCss = withStyles({
  '@global': {
    '.MuiDivider-root': {
      border: 'none',
      height: 1,
      margin: 0,
      flexShrink: 0,
      background: 'rgba(255, 255, 255, 0.20)'
    },
    '.MuiList-padding': {
      paddingTop: 0
    },
    '.MuiTab-wrapper': {
      width: '100%',
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'start'
    }
  }
})(() => null)

export default GlobalCss
