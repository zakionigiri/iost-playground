import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      background: theme.palette.background.default,
      minHeight: '100vh',
      minWidth: '100vw',
      display: 'flex'
    },
    content: {
      flexGrow: 1,
      overflowX: 'scroll',
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
