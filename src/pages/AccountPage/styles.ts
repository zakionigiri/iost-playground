import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemContainer: {
      paddingLeft: 16,
      width: '100%',
      maxWidth: 1460,
      margin: 'auto',
      padding: 20,
      boxSizing: 'border-box',
    },
    title: {
      marginTop: 30,
      fontSize: 24,
    },
  })
)

export default useStyles
