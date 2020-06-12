import React, { useEffect, useState } from 'react'
import NoFileExistsMessage from '../Messages/NoFileExists'
import Editor from '../Editor'
import { Tabs, Tab, Box, Typography, Button } from '@material-ui/core'
import useStyles from './styles'
import DeleteFileModal from 'components/DeleteFileModal'
import { compileCode, getContract } from '../../lib'
import { useNotification } from '../../provider/NotificationProvider'
import { useIntl } from 'provider/IntlProvider'
import FunctionTab from 'components/FunctionTab'
import { Contract } from '../../state/features/contract/types'

type Props = {
  contract: Contract
  handleDeleteFile: (fileNameWithExtension: Contract['fileName']) => void
  handleCompile: (uid: Contract['uid'], code: Contract['code']) => void
  handleCodeChange: (
    uid: string,
    data: string,
    type: 'code' | 'abi'
  ) => void
  handleShowDialog: () => 
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
          <Typography component={'div'}>{children}</Typography>
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
  contract,
  handleDeleteFile,
  handleCompile,
  handleCodeChange,
}) => {
  const classes = useStyles()
  // const [doesFileExist, setDoesFileExit] = useState<boolean>()
  // const [code, setCode] = useState('')
  // const [abiStr, setAbiStr] = useState('')
  // const [value, setValue] = useState(0)
  // const [showDelDialog, setShowDialog] = useState(false)
  // const { showNotification } = useNotification()
  // const { formatMessage } = useIntl()

  // const handleShowDialog = () => {
  //   setShowDialog(!showDelDialog)
  // }

  // const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
  //   setValue(newValue)
  // }

  // useEffect(() => {
  //   // Loading default contract
  //   const contract = getContract(fileNameWithExtension)
  //   const abiStr = getContract(fileNameWithExtension + '.abi')

  //   if (contract == null) {
  //     return setDoesFileExit(false)
  //   }

  //   setAbiStr(abiStr || '')
  //   setCode(contract)
  //   setDoesFileExit(true)
  // }, [])

  // const deleteFile = () => {
  //   handleDeleteFile(fileNameWithExtension)
  //   setShowDialog(false)
  //   showNotification(formatMessage('delete-complete'), '', 'success')
  // }

  // if (doesFileExist === false) {
  //   return <NoFileExistsMessage fileName={fileNameWithExtension} />
  // }

  return (
    <>
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
          label={`${contract.fileName}`}
          {...a11yProps(0)}
        />
        <Tab
          className={classes.tab}
          label={`${contract.fileName}.abi`}
          {...a11yProps(1)}
        />
        <Button
          className={classes.compileButton}
          variant="contained"
          color="primary"
          onClick={() => handleCompile(contract.uid, contract.code)}
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
          code={contract.code}
          mode="javascript"
          handleCodeChange={(data: string) =>
            handleCodeChange(contract.uid, data, 'code')
          }
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Editor
          code={JSON.stringify(contract.abi, null, 2)}
          mode="json"
          handleCodeChange={(data: string) =>
            handleCodeChange(contract.uid, data, 'abi')
          }
        />
      </TabPanel>
      {showDelDialog && (
        <DeleteFileModal
          closeFn={handleShowDialog}
          handleDeleteFile={deleteFile}
          fileName={contract.fileName}
        />
      )}
    </>
  )
}

export default Contract
