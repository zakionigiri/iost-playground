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

const ApiHost: React.FC<Props> = ({
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
        defaultValue={'http://13.52.105.102:30001'}
      >
        {hosts.map(({ name, url }) => {
          return (
            <MenuItem value={url}>
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

export default ApiHost
