import React, { useState } from 'react'
import { Select, MenuItem, Input } from '@material-ui/core'
import config from '../../lib/config.json'
import useStyles from './styles'
import { useSelector, useDispatch } from 'react-redux'
import { selectSettingsState } from 'store/features/settings/selectors'
import { changeSettings } from 'store/features/settings/slices'

const hosts = Object.keys(config.hosts).map(key => {
  const { name, scheme, host, port } = config.hosts[
    key as keyof typeof config.hosts
  ]

  return {
    name,
    url: `${scheme}://${host}` + (port !== 0 ? port : '')
  }
})

const isCustomMode = (rpcHost: string) =>
  hosts.filter(({ url }) => url === rpcHost).length === 0

const RpcHostSelect = () => {
  const classes = useStyles()
  const { rpcHost } = useSelector(selectSettingsState)
  const dispatch = useDispatch()

  const handleChange = (
    e: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>
  ) => {
    dispatch(changeSettings({ rpcHost: e.target.value as string }))
  }

  return (
    <>
      <h2 className={classes.title}>API Host</h2>
      <Select
        onChange={handleChange}
        className={classes.hostSelect}
        value={isCustomMode(rpcHost) ? '' : rpcHost}
      >
        {hosts.map(({ name, url }) => {
          return (
            <MenuItem value={url} key={url}>
              {name} ({url})
            </MenuItem>
          )
        })}
        <MenuItem value="">Custom</MenuItem>
      </Select>
      {isCustomMode(rpcHost) && (
        <div className={classes.customHostContainer}>
          <Input
            className={classes.customHostInput}
            value={rpcHost}
            type="text"
            onChange={handleChange}
          />
        </div>
      )}
    </>
  )
}

export default RpcHostSelect
