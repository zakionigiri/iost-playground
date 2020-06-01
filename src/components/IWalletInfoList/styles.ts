import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItemContainer: {
      display: 'flex',
      alignItems: 'start',
      padding: 0
    },
    inputContainer: {
      paddingLeft: 16
    },
    configInput: {
      color: 'white'
    },
    titleContainer: {
      minWidth: 200
    },
    listItemValue: {
      paddingLeft: 16,
      marginTop: 'auto',
      marginBottom: 'auto',
      fontSize: 18
    },
    listItemTitle: {
      paddingLeft: 16,
      fontSize: 21,
      marginTop: 5,
      marginBottom: 5,
      marginRight: 10
    }
  })
)

export default useStyles
