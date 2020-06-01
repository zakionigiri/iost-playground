import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemContainer: {
      paddingLeft: 16
    },
    title: {
      marginTop: 30,
      fontSize: 24
    }
  })
)

export default useStyles
