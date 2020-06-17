import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getContractState } from '../../store/features/contract/selectors'
import useStyles from './styles'
import useLocale from '../../hooks/useLocale'
import TabPanel from '../TabPanel'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Button from '@material-ui/core/Button'
import { selectTab } from 'store/features/view/selectors'
import { changeTab } from 'store/features/view/slices'
import ContractTab from '../ContractTab'
import ContractActions from '../../components/ContractActionsTab'
import { Grid } from '@material-ui/core'
import { openNewContractDialogOp } from 'store/features/view/operations'
import ContractTabHeader from '../../components/ContractTabHeader'

const TAB_NAME = 'contract-tabs'

const ContractTabs = () => {
  const classes = useStyles()
  const { contracts } = useSelector(getContractState)
  const { value: tabValue = 1 } = useSelector(selectTab(TAB_NAME)) || {}
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
        <div>
          <ContractTabHeader />
        </div>
        {contracts.map(({ fileName }, index) => (
          <Tab
            key={`contract-tab_${index + 1}`}
            className={classes.tab}
            label={fileName}
          />
        ))}
      </Tabs>
      {contracts.map((contract, index) => (
        <TabPanel
          key={`contract-tab-panel_${index}`}
          value={tabValue}
          index={index + 1}
        >
          <Grid container direction="row">
            <Grid item>
              <ContractTab contract={contract} />
            </Grid>
            <Grid item>
              <ContractActions contract={contract} />
            </Grid>
          </Grid>
        </TabPanel>
      ))}
    </div>
  )
}

export default ContractTabs
