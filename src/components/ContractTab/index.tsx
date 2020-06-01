import React, { useEffect, useState } from 'react'
import NoFileExistsMessage from '../Messages/NoFileExists'
import Editor from '../Editor'
import { Tabs, Tab, Box, Typography, Button } from '@material-ui/core'
import useStyles from './styles'

type Props = {
  fileName: string
}

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const a11yProps = (index: any) => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  }
}

const Contract: React.FC<Props> = ({ fileName }) => {
  const [doesFileExist, setDoesFileExit] = useState<boolean>()
  const [code, setCode] = useState('')
  const [abi, setAbi] = useState('')

  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  useEffect(() => {
    // Loading default contract
    const contract = window.localStorage.getItem(`iost_playground_${fileName}`)
    const abi = window.localStorage.getItem(`iost_playground_${fileName}.abi`)

    if (contract == null) {
      return setDoesFileExit(false)
    }

    setAbi(abi || '')
    setCode(contract)
    setDoesFileExit(true)
  }, [])

  const handleCodeChange = (value: string, event?: any) => {
    window.localStorage.setItem(`iost_playground_${fileName}`, value)
    setCode(value)
  }

  if (doesFileExist === false) {
    return <NoFileExistsMessage fileName={fileName} />
  }

  return (
    <div>
      <Tabs
        orientation="horizontal"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab className={classes.tab} label={`${fileName}`} {...a11yProps(0)} />
        <Tab
          className={classes.tab}
          label={`${fileName}.abi`}
          {...a11yProps(1)}
        />
        <Button
          className={classes.compileButton}
          variant="contained"
          color="secondary"
        >
          Compile
        </Button>
      </Tabs>
      <TabPanel value={value} index={0}>
        <Editor
          code={code}
          mode="javascript"
          handleCodeChange={handleCodeChange}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Editor code={abi} mode="json" handleCodeChange={handleCodeChange} />
      </TabPanel>
    </div>
  )
}

export default Contract
