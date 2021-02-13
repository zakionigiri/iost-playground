import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    paddingTop: 0,
  },
  tab: {
    fontSize: 16,
    alignItems: 'center',
  },
  compileButton: {
    marginLeft: 20,
  },
}))

export default useStyles
