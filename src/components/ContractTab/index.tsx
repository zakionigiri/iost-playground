import React, { useEffect, useState } from 'react'
import NoFileExistsMessage from '../Messages/NoFileExists'
import Editor from '../Editor'
import { Tabs, Tab, Box, Typography, Button } from '@material-ui/core'
import useStyles from './styles'
import DeleteFileModal from 'components/DeleteFileModal'

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
  const [abi, setAbi] = useState('')
  const [value, setValue] = useState(0)
  const [showDialog, setShowDialog] = useState(false)

  const classes = useStyles()

  const handleShowDialog = () => {
    setShowDialog(!showDialog)
  }

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  useEffect(() => {
    // Loading default contract
    const contract = window.localStorage.getItem(
      `iost_playground_${fileNameWithExtension}`
    )
    const abi = window.localStorage.getItem(
      `iost_playground_${fileNameWithExtension}.abi`
    )

    if (contract == null) {
      return setDoesFileExit(false)
    }

    setAbi(abi || '')
    setCode(contract)
    setDoesFileExit(true)
  }, [])

  const handleCodeChange = (value: string, event?: any) => {
    window.localStorage.setItem(
      `iost_playground_${fileNameWithExtension}`,
      value
    )
    setCode(value)
  }

  const deleteFile = () => {
    handleDeleteFile(fileNameWithExtension)
    setShowDialog(false)
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
        <Button
          className={classes.compileButton}
          variant="contained"
          color="primary"
        >
          Compile
        </Button>
        <Button
          className={classes.compileButton}
          variant="contained"
          color="secondary"
          onClick={handleShowDialog}
        >
          Delete
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
      {showDialog && (
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
