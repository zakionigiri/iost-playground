import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    height: 224
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: '20vw',
    height: '85vh'
  },
  tab: {
    textTransform: 'none',
    fontSize: 18
  },
  createContractButton: {
    marginTop: 20,
    width: 300
  }
}))

export default useStyles
