import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      color: 'white'
    },
    formContainer: {
      minHeight: 200
    },
    select: {
      width: '100%',
      color: 'white'
    },
    inputContainer: {
      width: '100%'
    },
    input: {
      color: 'white',
      minWidth: 50,
      marginTop: 15
    },
    inputLabel: {
      color: 'white',
      marginTop: 5
    },
    sendTxButton: {
      marginTop: theme.spacing(4)
    }
  })
)

export default useStyles
