import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  resultContainer: {
    width: '100%',
    color: theme.palette.primary.main,
    background: 'white',
    borderRadius: 4,
    boxShadow: theme.shadows[5],
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginRight: theme.spacing(2),
    height: 400,
    overflowY: 'scroll'
  },
  textContainer: {
    width: '100%',
    paddingLeft: theme.spacing(2)
  },
  successTitle: {
    ...title(theme.spacing(2)),
    color: 'green'
  },
  errorTitle: {
    ...title(theme.spacing(2)),
    color: 'red'
  },
  divider: {
    width: '95%',
    marginTop: theme.spacing(2)
  }
}))

const title = (spacing: number) => ({
  fontSize: 20,
  marginTop: spacing
})

export default useStyles
