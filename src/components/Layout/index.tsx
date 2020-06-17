import React, { useState } from 'react'
import Header from '../Header'
import SideMenu from '../SideMenu'
import useStyles from './styles'
import { useSelector, useDispatch } from 'react-redux'
import { selectDrawer } from 'store/features/view/selectors'
import { ViewState, DrawerTabTypes } from 'store/features/view/types'
import { changeDrawer } from 'store/features/view/slices'

export type DrawerChangeFn = (
  name: keyof ViewState['drawer'],
  value: boolean | DrawerTabTypes
) => void

const Layout: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { isOpen, selected } = useSelector(selectDrawer)

  const handleDrawerChange: DrawerChangeFn = (name, value) => {
    dispatch(changeDrawer({ [name]: value }))
  }

  return (
    <div className={classes.container}>
      <Header isOpen={isOpen} handleDrawerChange={handleDrawerChange} />
      <SideMenu
        isOpen={isOpen}
        selected={selected}
        handleDrawerChange={handleDrawerChange}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  )
}

export default Layout
