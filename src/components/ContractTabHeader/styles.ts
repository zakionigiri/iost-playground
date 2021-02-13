import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: '100%',
    height: 47,
    background: theme.palette.primary.main,
    boxShadow: `2px 2px 5px ${theme.palette.primary.dark}`,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  titleContainer: {
    width: '100%',
    paddingLeft: 25,
  },
  iconContainer: {
    width: 24,
    marginRight: 20,
    marginTop: 5,
    '&:hover': {
      color: theme.palette.primary.light,
    },
  },
}))

export default useStyles
