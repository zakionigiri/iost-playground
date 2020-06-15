import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(0)
      }
    },
    alert: {
      marginTop: 20
    }
  })
)

export default useStyles
