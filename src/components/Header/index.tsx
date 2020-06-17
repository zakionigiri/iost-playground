import React from 'react'
import clsx from 'clsx'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import useStyles from './styles'
import config from '../../lib/config.json'
import { DrawerChangeFn } from 'components/Layout'

type Props = {
  isOpen: boolean
  handleDrawerChange: DrawerChangeFn
}

const Header: React.FC<Props> = ({ isOpen, handleDrawerChange }) => {
  const classes = useStyles()

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: isOpen
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => handleDrawerChange('isOpen', !isOpen)}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: isOpen
          })}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          {config.title}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
