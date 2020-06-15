import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getContractState } from '../../store/features/contract/selectors'
import {
  removeContract,
  compileContract
} from '../../store/features/contract/slices'
import useStyles from './styles'
import useLocale from '../../hooks/useLocale'
import TabPanel from '../TabPanel'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Button from '@material-ui/core/Button'
import { selectTab } from 'store/features/view/selectors'
import { changeTab, openDialog, closeDialog } from 'store/features/view/slices'
import ContractTab from '../ContractTab'
import NewContractModal from 'components/NewContractModal'

const TAB_NAME = 'contract-tabs'

const ContractTabs = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { contracts } = useSelector(getContractState)
  const { value: tabValue = 0 } = useSelector(selectTab(TAB_NAME)) || {}
  const classes = useStyles()
  const { formatMessage } = useLocale()
  const dispatch = useDispatch()

  const handleTabChange = (e: React.ChangeEvent<{}>, value: number) => {
    dispatch(changeTab({ id: TAB_NAME, value }))
  }

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={tabValue}
        onChange={handleTabChange}
        aria-label="Vertical tabs"
        className={classes.tabs}
      >
        {contracts.map(({ fileName }, index) => (
          <Tab
            key={`contract-tab_${index}`}
            className={classes.tab}
            label={fileName}
          />
        ))}
        <Button
          className={classes.createContractButton}
          variant="contained"
          color="primary"
          onClick={() =>
            dispatch(
              openDialog({
                element: () => <NewContractModal />
              })
            )
          }
        >
          {formatMessage('new-contract-button')}
        </Button>
      </Tabs>
      {contracts.map((contract, index) => (
        <TabPanel
          key={`contract-tab-panel_${index}`}
          value={tabValue}
          index={index}
        >
          <ContractTab contract={contract} />
        </TabPanel>
      ))}
      <div>To test contract</div>
    </div>
  )
}

export default ContractTabs
