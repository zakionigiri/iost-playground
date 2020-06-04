import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      background: '#282c34',
      minHeight: '100vh',
      display: 'flex'
    },
    content: {
      flexGrow: 1,
      overflowX: 'scroll',
      padding: theme.spacing(3),
      color: 'white',
      minHeight: '100vh'
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar
    }
  })
)

export default useStyles
