import { createMuiTheme } from '@material-ui/core/styles'
import blueGrey from '@material-ui/core/colors/blueGrey'
import lightGreen from '@material-ui/core/colors/lightGreen'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[900]
    },
    secondary: {
      main: blueGrey[200]
    },
    background: {
      default: blueGrey[900]
    }
  }
})

export default theme
