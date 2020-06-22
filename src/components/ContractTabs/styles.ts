import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    height: 200
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    minWidth: 350,
    height: '85vh'
  },
  tab: {
    textTransform: 'none',
    fontSize: 16,
    padding: 10,
    paddingLeft: 25
  },
  createContractButton: {
    margin: 'auto',
    marginTop: 20,
    width: 300,
    background: theme.palette.primary.light
  },
  resultContainer: {
    width: '100%'
  }
}))

export default useStyles
