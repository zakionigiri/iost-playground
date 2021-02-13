import React, { useState } from 'react'
import clsx from 'clsx'
import config from '../../lib/config.json'
import SideMenu from '../SideMenu'
import useStyles from './styles'
import { useSelector, useDispatch } from 'react-redux'
import { selectDrawer } from 'store/features/view/selectors'
import { ViewState, DrawerTabTypes } from 'store/features/view/types'
import { changeDrawer } from 'store/features/view/slices'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { Drawer, CssBaseline } from '@material-ui/core'

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
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: isOpen,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => handleDrawerChange('isOpen', !isOpen)}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: isOpen,
            })}
          >
            <MenuIcon />
          </IconButton>
          {config.title}
        </Toolbar>
      </AppBar>
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
