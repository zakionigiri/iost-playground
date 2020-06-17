import React from 'react'
import Editor from '../Editor'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import useStyles from './styles'
import DeleteFileModal from 'components/DeleteFileModal'
import useLocale from '../../hooks/useLocale'
import { Contract } from '../../store/features/contract/types'
import TabPanel from '../TabPanel'
import { useSelector, useDispatch } from 'react-redux'
import { selectTab } from '../../store/features/view/selectors'
import { changeTab, addNotification } from '../../store/features/view/slices'
import {
  compileContract,
  setContractCode,
  removeContract
} from '../../store/features/contract/slices'

const TAB_NAME = 'code-abi-tab'

type Props = {
  contract: Contract
}

const ContractTab: React.FC<Props> = ({ contract }) => {
  const classes = useStyles()
  const { value: tabValue = 0 } = useSelector(selectTab(TAB_NAME)) || {}
  const dispatch = useDispatch()
  const { formatMessage } = useLocale()

  const handleTabChange = (e: React.ChangeEvent<{}>, value: number) => {
    dispatch(changeTab({ id: TAB_NAME, value }))
  }

  const handleCodeChange = (
    fileName: string,
    code: string,
    type: 'code' | 'abi'
  ) => {
    dispatch(setContractCode({ fileName, code, type }))
  }

  return (
    <>
      <Tabs
        orientation="horizontal"
        variant="scrollable"
        value={tabValue}
        onChange={handleTabChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab className={classes.tab} label="contract" />
        <Tab className={classes.tab} label="abi" />
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
