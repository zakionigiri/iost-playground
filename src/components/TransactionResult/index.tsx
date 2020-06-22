import React from 'react'
import { Grid, Typography, Divider } from '@material-ui/core'
import useStyles from './styles'
import { useSelector } from 'react-redux'
import { getContractState } from 'store/features/contract/selectors'
import { selectTxResults } from 'store/features/form/selectors'
import useLocale from 'hooks/useLocale'

const TransactionResult = () => {
  const classes = useStyles()
  const results = useSelector(selectTxResults)
  const { formatMessage } = useLocale()

  return (
    <Grid container className={classes.resultContainer}>
      {results.map(({ type, txId, result }) => (
        <div className={classes.textContainer}>
          <Typography
            component="h2"
            className={
              type === 'error' ? classes.errorTitle : classes.successTitle
            }
          >
            {type === 'error' ? '[Error]' : '[Success]'}
          </Typography>
          <Typography>
            {formatMessage('transaction-id')}: {txId}
          </Typography>
          <Typography component="pre">
            {formatMessage('returns')}: {JSON.stringify(result, null, 2)}
          </Typography>
          <Divider className={classes.divider} />
        </div>
      ))}
    </Grid>
  )
}

export default TransactionResult
