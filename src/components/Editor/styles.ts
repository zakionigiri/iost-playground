import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    editor: {
      width: '50%',
      height: '90vh'
    }
  })
)

export default useStyles
