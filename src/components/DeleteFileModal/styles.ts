import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    radioContainer: {
      paddingLeft: 20
    },
    dialogTitle: {
      width: 500
    },
    fileName: {
      fontWeight: 'bold',
      fontStyle: 'italic'
    }
  })
)

export default useStyles
