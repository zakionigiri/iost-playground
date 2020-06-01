import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    hostContainer: {
      width: '100%',
      maxWidth: 1460,
      margin: 'auto',
      padding: 20,
      boxSizing: 'border-box'
    },
    helperText: {
      color: 'white',
      fontSize: 14
    }
  })
)

export default useStyles
