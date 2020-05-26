import React, { useState } from 'react'
import Header from '../Header'
import Body from '../Body'
import SideMenu from '../SideMenu'
import useStyles from './styles'

const Layout: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const classes = useStyles()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleDrawerChange = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  return (
    <div className={classes.container}>
      <Header isOpen={isDrawerOpen} handleDrawerChange={handleDrawerChange} />
      <SideMenu isOpen={isDrawerOpen} handleDrawerChange={handleDrawerChange} />
      <Body />
      {children}
    </div>
  )
}

export default Layout
