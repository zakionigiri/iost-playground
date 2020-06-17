import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    paddingTop: 0
  },
  tab: {
    textTransform: 'none',
    fontSize: 16
  },
  compileButton: {
    marginLeft: 20
  }
}))

export default useStyles
