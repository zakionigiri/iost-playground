import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    functionSelect: {
      color: 'white',
    },
    argInput: {
      color: 'white',
      marginLeft: 30,
      width: '100%',
    },
  })
)

export default useStyles
