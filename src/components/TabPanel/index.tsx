import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

type TabPanelProps = {
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

export default TabPanel
