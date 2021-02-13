import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 30,
    },
    title: {
      fontSize: 28,
    },
    hostSelect: {
      fontSize: 18,
      width: 300,
    },
    customHostContainer: {
      width: '100%',
      marginTop: 20,
    },
    customHostInput: {
      width: 300,
      color: 'white',
      fontSize: 18,
    },
  })
)

export default useStyles
