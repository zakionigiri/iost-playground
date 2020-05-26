import React from 'react'
import clsx from 'clsx'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { Link } from 'react-router-dom'
import useStyles from './styles'
import { menuListItems } from './utils'

type Props = {
  isOpen: boolean
  handleDrawerChange: () => void
}

const SideMenu: React.FC<Props> = ({ isOpen, handleDrawerChange }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: isOpen,
          [classes.drawerClose]: !isOpen
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: isOpen,
            [classes.drawerClose]: !isOpen
          })
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerChange}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {menuListItems.map(({ name, path, Icon }) => (
            <Link to={`/${path}`} className={classes.link}>
              <ListItem button key={name}>
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </div>
  )
}

export default SideMenu
