import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import ContractTab from '../ContractTab'
import useStyles from './styles'
import Button from '@material-ui/core/Button'
import NewContractModal from '../NewContractModal'
import { useIntl } from '../../provider/IntlProvider'
import { Contract } from '../../state/features/contract/types'

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
        <Box p={3} style={{ paddingTop: 0, paddingBottom: 0 }}>
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

type Props = {
  contracts: Contract[]
  handleDeleteFile: (fileName: string) => void
  tabValue: number
  handleTabChange: (event: React.ChangeEvent<{}>, value: any) => void
  handleCompile: (uid: string, code: string) => void
  isDialogOpen: boolean
  handleOpenDialog: (isOpen: boolean) => void
  handleCreate: () => void
  handleImport: (contractId: string) => void
}

const ContractTabs: React.FC<Props> = ({
  contracts,
  handleDeleteFile,
  tabValue,
  handleTabChange,
  isDialogOpen,
  handleCompile,
  handleCreate,
  handleImport,
  handleOpenDialog
}) => {
  const { formatMessage } = useIntl()
  const classes = useStyles()
  // const [value, setValue] = useState(0)
  // const [selectedContract, setSelectedContract] = useState('')
  // const [menuAnchorItem, setMenuAnchorItem] = useState<Element>()
  // const [showDialog, setShowDialog] = useState(false)
  // const [contractList, setFileList] = useState<string[]>([])
  // const [isCustomMode, setIsCustomMode] = useState(false)
  // const [customHost, setCustomHost] = useState('')
  // const [host, setHost] = useState('https://test.api.iost.io')
  // const { showNotification } = useNotification()

  // useEffect(() => {
  //   const contractList = getContractList()
  //   setFileList(contractList)
  // }, [])

  // const handleHostChange = (
  //   e: React.ChangeEvent<{
  //     name?: string | undefined
  //     value: unknown
  //   }>
  // ) => {
  //   const host = e.target.value as string

  //   if (host === 'custom') {
  //     return setIsCustomMode(true)
  //   }

  //   setHost(host)
  //   setIsCustomMode(false)
  // }

  // const handleCustomHostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const host = e.target.value as string
  //   setCustomHost(host)
  // }

  // const hosts: Host[] = nets.map(net => {
  //   return {
  //     url: getApiUrl(net, true),
  //     name: getNetName(net)
  //   }
  // })

  // const handleDeleteFile = (fileNameWithExtension: string) => {
  //   const newContractList = contractList.filter(
  //     f => f !== fileNameWithExtension
  //   )

  //   removeContract(fileNameWithExtension)
  //   removeContract(fileNameWithExtension + '.abi')
  //   setContractList(newContractList)

  //   setFileList(newContractList)
  //   setValue(-1)
  // }

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
            {...a11yProps(index)}
          />
        ))}
        <Button
          className={classes.createContractButton}
          variant="contained"
          color="primary"
          onClick={() => {
            handleOpenDialog(isDialogOpen)
          }}
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
          <ContractTab
            contract={contract}
            handleDeleteFile={handleDeleteFile}
            handleCompile={handleCompile}
          />
        </TabPanel>
      ))}
      <div>To test contract</div>
      {isDialogOpen && (
        <NewContractModal
          closeFn={() => {
            handleOpenDialog(isDialogOpen)
          }}
          createFn={handleCreate}
          importFn={handleImport}
        />
      )}
    </div>
  )
}

export default ContractTabs
