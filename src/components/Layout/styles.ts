import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      background: '#282c34',
      minHeight: '100vh',
      color: 'white'
    }
  })
)

export default useStyles
