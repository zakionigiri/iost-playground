import React, { useState } from 'react'
import Layout from '../../components/Layout'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import swagger from '../../lib/swagger.json'
import useStyles from './styles'
import RpcHostSelect from '../../components/RpcHostSelect'

const ApiPage = () => {
  const [swaggerConfig, setSwaggerConfig] = useState(swagger)
  const classes = useStyles()

  return (
    <Layout>
      <>
        <div className={classes.hostContainer}>
          <RpcHostSelect />
        </div>
        <SwaggerUI spec={swaggerConfig} />
      </>
    </Layout>
  )
}

export default ApiPage
