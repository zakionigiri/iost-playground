import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(3),
      minWidth: 400
    },
    contractInfoTitle: {
      fontWeight: 'bold',
      marginTop: theme.spacing(1)
    }
  })
)

export default useStyles
