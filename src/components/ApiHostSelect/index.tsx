import React, { SetStateAction, Dispatch } from 'react'
import { Select, MenuItem, Input, FormHelperText } from '@material-ui/core'
import config from '../../lib/config.json'
import useStyles from './styles'
import { Host } from '../../types/types'

type Props = {
  isCustomMode: boolean
  customHost: string
  handleHostChange: (
    e: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>
  ) => void
  handleCustomHostChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  hosts: Host[]
}

const ApiHostSelect: React.FC<Props> = ({
  isCustomMode,
  customHost,
  handleCustomHostChange,
  handleHostChange,
  hosts
}) => {
  const classes = useStyles()

  return (
    <>
      <h2 className={classes.title}>API Host</h2>
      <Select
        onChange={handleHostChange}
        className={classes.hostSelect}
        defaultValue={`${config.TESTNET.scheme}://${config.TESTNET.host}`}
      >
        {hosts.map(({ name, url }) => {
          return (
            <MenuItem value={url} key={url}>
              {name} ({url})
            </MenuItem>
          )
        })}
        <MenuItem value={'custom'}>Custom</MenuItem>
      </Select>
      {isCustomMode && (
        <div className={classes.customHostContainer}>
          <Input
            className={classes.customHostInput}
            value={customHost}
            onChange={handleCustomHostChange}
          />
        </div>
      )}
    </>
  )
}

export default ApiHostSelect
