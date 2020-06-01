import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonContainer: {
      width: 100,
      marginTop: 20,
      padding: 0,
      color: 'white'
    },
    reloadIcon: {
      marginRight: 5
    }
  })
)

export default useStyles
