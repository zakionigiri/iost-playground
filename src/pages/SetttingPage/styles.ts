import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
      maxWidth: 1460,
      margin: 'auto',
      padding: 20,
      boxSizing: 'border-box',
    },
  })
)

export default useStyles
