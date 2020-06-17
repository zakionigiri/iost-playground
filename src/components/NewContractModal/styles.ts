import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      background: theme.palette.background.default
    },
    radioContainer: {
      paddingLeft: 20
    },
    dialogTitle: {
      width: 500
    }
  })
)

export default useStyles
