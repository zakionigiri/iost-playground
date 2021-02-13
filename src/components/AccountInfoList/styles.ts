import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginTop: 30,
      fontSize: 24,
    },
    listItemValue: {
      margin: 0,
      marginBottom: 15,
      fontSize: 18,
    },
    listItemKey: {
      margin: 0,
      marginBottom: 20,
      fontSize: 18,
      minWidth: 200,
    },
    listItemContainer: {
      display: 'flex',
      alignItems: 'start',
      padding: 0,
    },
    progressContainer: {
      marginTop: 20,
      marginLeft: 16,
    },
  })
)

export default useStyles
