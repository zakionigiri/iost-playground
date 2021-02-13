import React from 'react'
import Editor from '../Editor'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import useStyles from './styles'
import useLocale from '../../hooks/useLocale'
import { Contract } from '../../store/features/contract/types'
import TabPanel from '../TabPanel'
import { useSelector, useDispatch } from 'react-redux'
import { selectTab } from '../../store/features/view/selectors'
import { changeTab, closeDialog } from '../../store/features/view/slices'
import {
  compileContract,
  setContractCode,
  removeContract,
} from '../../store/features/contract/slices'
import {
  addNotificationOp,
  openDeleteDialogOp,
} from 'store/features/view/operations'

const TAB_NAME = 'code-abi-tab'

type Props = {
  contract: Contract
}

const ContractTab: React.FC<Props> = ({ contract }) => {
  const classes = useStyles()
  const { value: tabValue = 0 } = useSelector(selectTab(TAB_NAME)) || {}
  const dispatch = useDispatch()
  const { formatMessage } = useLocale()
  const { fileName, code } = contract

  const handleTabChange = (_: React.ChangeEvent<any>, value: number) => {
    dispatch(changeTab({ id: TAB_NAME, value }))
  }

  const handleCodeChange = (
    fileName: string,
    code: string,
    type: 'code' | 'abi'
  ) => {
    dispatch(setContractCode({ fileName, code, type }))
  }

  const handleDeleteFile = (fileName: string) => {
    dispatch(removeContract(fileName))
  }

  const handleCompile = (fileName: string, code: string) => {
    try {
      dispatch(compileContract({ fileName, code }))
      dispatch(addNotificationOp('success', 'compile-success'))
    } catch (e) {
      dispatch(addNotificationOp('error', 'error::compile-fail', e))
    }
  }

  const handleClose = () => {
    dispatch(closeDialog())
  }

  return (
    <>
      <Tabs
        orientation="horizontal"
        variant="scrollable"
        value={tabValue}
        onChange={handleTabChange}
        className={classes.tabs}
      >
        <Tab className={classes.tab} label="contract" />
        <Tab className={classes.tab} label="abi" />
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleCompile(fileName, code)}
        >
          {formatMessage('compile-code')}
        </Button>
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <Editor
          code={contract.code}
          mode="javascript"
          handleCodeChange={(data: string) =>
            handleCodeChange(contract.fileName, data, 'code')
          }
        />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Editor
          code={contract.abiStr}
          mode="json"
          handleCodeChange={(data: string) =>
            handleCodeChange(contract.fileName, data, 'abi')
          }
        />
      </TabPanel>
    </>
  )
}

export default ContractTab
