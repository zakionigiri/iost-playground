import React, { useState } from 'react'
import Layout from '../../components/Layout'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import swagger from '../../lib/swagger.json'
import ApiHostSelect from '../../components/ApiHostSelect'
import useStyles from './styles'
import { FormHelperText } from '@material-ui/core'
import { Host } from '../../types/types'
import { getApiUrl, nets, getNetName } from '../../lib'

const ApiPage = () => {
  const [swaggerConfig, setSwaggerConfig] = useState(swagger)
  const [isCustomMode, setIsCustomMode] = useState(false)
  const [customHost, setCustomHost] = useState('')
  const classes = useStyles()

  const changeHost = (host: string) => {
    const s = Object.assign({}, swaggerConfig)
    s.host = host
    setSwaggerConfig(s)
  }

  const handleHostChange = (
    e: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>
  ) => {
    const host = e.target.value as string

    if (host === 'custom') {
      return setIsCustomMode(true)
    }

    changeHost(host)
    setIsCustomMode(false)
  }

  const handleCustomHostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const host = e.target.value as string
    changeHost(host)
    setCustomHost(host)
  }

  const hosts: Host[] = nets.map(net => {
    return {
      url: getApiUrl(net, false),
      name: getNetName(net)
    }
  })

  return (
    <Layout>
      <>
        <div className={classes.hostContainer}>
          <ApiHostSelect
            hosts={hosts}
            handleCustomHostChange={handleCustomHostChange}
            handleHostChange={handleHostChange}
            customHost={customHost}
            isCustomMode={isCustomMode}
          />
          {isCustomMode && (
            <FormHelperText className={classes.helperText}>
              Do not include the scheme(e.g. http://). Choose one from the
              'Schemes' select below
            </FormHelperText>
          )}
        </div>
        <SwaggerUI spec={swaggerConfig} />
      </>
    </Layout>
  )
}

export default ApiPage
