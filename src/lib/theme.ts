import { createMuiTheme } from '@material-ui/core/styles'
import teal from '@material-ui/core/colors/teal'
import cyan from '@material-ui/core/colors/cyan'
import blue from '@material-ui/core/colors/blue'
import green from '@material-ui/core/colors/green'
import lightGreen from '@material-ui/core/colors/lightGreen'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[200]
    },
    secondary: {
      main: lightGreen[200]
    }
  }
})

export default theme
