import React, { useEffect, useState } from 'react'
import NoFileExistsMessage from '../Messages/NoFileExists'
import Editor from '../Editor'
import { Tabs, Tab, Box, Typography, Button } from '@material-ui/core'
import useStyles from './styles'
import DeleteFileModal from 'components/DeleteFileModal'
import { compileCode } from '../../lib'
import { useSnackbar } from 'provider/SnackbarProvider'
import { useIntl } from 'provider/IntlProvider'
import FunctionTab from 'components/FunctionTab'

type Props = {
  fileNameWithExtension: string
  handleDeleteFile: (fileNameWithExtension: string) => void
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

const Contract: React.FC<Props> = ({
  fileNameWithExtension,
  handleDeleteFile
}) => {
  const [doesFileExist, setDoesFileExit] = useState<boolean>()
  const [code, setCode] = useState('')
  const [abiStr, setAbiStr] = useState('')
  const [value, setValue] = useState(0)
  const [showDelDialog, setShowDialog] = useState(false)
  const { showSnackbar } = useSnackbar()
  const { formatMessage } = useIntl()

  const classes = useStyles()

  const handleShowDialog = () => {
    setShowDialog(!showDelDialog)
  }

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  useEffect(() => {
    // Loading default contract
    const contract = window.localStorage.getItem(
      `iost_playground_${fileNameWithExtension}`
    )
    const abiStr = window.localStorage.getItem(
      `iost_playground_${fileNameWithExtension}.abi`
    )

    if (contract == null) {
      return setDoesFileExit(false)
    }

    setAbiStr(abiStr || '')
    setCode(contract)
    setDoesFileExit(true)
  }, [])

  const handleCodeChange = (value: string) => {
    window.localStorage.setItem(
      `iost_playground_${fileNameWithExtension}`,
      value
    )
    setCode(value)
  }

  const handleAbiChange = (value: string) => {
    window.localStorage.setItem(
      `iost_playground_${fileNameWithExtension}.abi`,
      value
    )
    setAbiStr(value)
  }

  const handleCompile = () => {
    // TODO Show confirmation dialog in cases abi already exists (because this action will override the abi)
    try {
      const abiStr: string = compileCode(code)
      setAbiStr(abiStr)
      window.localStorage.setItem(
        `iost_playground_${fileNameWithExtension}.abi`,
        abiStr
      )
      showSnackbar(formatMessage('compile-success'), '', 'success')
    } catch (e) {
      const message = (e && e.message) || ''
      showSnackbar(formatMessage('compile-fail'), message, 'error')
    }
  }

  const deleteFile = () => {
    handleDeleteFile(fileNameWithExtension)
    setShowDialog(false)
    showSnackbar(formatMessage('delete-complete'), '', 'success')
  }

  if (doesFileExist === false) {
    return <NoFileExistsMessage fileName={fileNameWithExtension} />
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
        <Tab
          className={classes.tab}
          label={`${fileNameWithExtension}`}
          {...a11yProps(0)}
        />
        <Tab
          className={classes.tab}
          label={`${fileNameWithExtension}.abi`}
          {...a11yProps(1)}
        />
        <Tab className={classes.tab} label={'Functions'} {...a11yProps(1)} />
        <Button
          className={classes.compileButton}
          variant="contained"
          color="primary"
          onClick={handleCompile}
        >
          {formatMessage('compile-code')}
        </Button>
        <Button
          className={classes.compileButton}
          variant="contained"
          color="secondary"
          onClick={handleShowDialog}
        >
          {formatMessage('delete-code')}
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
        <Editor code={abiStr} mode="json" handleCodeChange={handleAbiChange} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <FunctionTab abiStr={abiStr} />
      </TabPanel>
      {showDelDialog && (
        <DeleteFileModal
          closeFn={handleShowDialog}
          handleDeleteFile={deleteFile}
          fileName={fileNameWithExtension}
        />
      )}
    </div>
  )
}

export default Contract
