import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItemContainer: {
      display: 'flex',
      alignItems: 'start',
      padding: 0,
    },
    title: {
      marginTop: 30,
      fontSize: 24,
    },
    titleContainer: {
      minWidth: 200,
    },
    listItemValue: {
      marginTop: 'auto',
      marginBottom: 'auto',
      paddingLeft: 16,
      fontSize: 18,
    },
    listItemTitle: {
      fontSize: 21,
      marginTop: 5,
      marginBottom: 5,
      paddingLeft: 16,
      marginRight: 10,
    },
  })
)

export default useStyles
