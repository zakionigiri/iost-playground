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
import { DrawerChangeFn } from 'components/Layout'
import { DrawerTabTypes } from 'store/features/view/types'
import useLocale from 'hooks/useLocale'

type Props = {
  isOpen: boolean
  selected: DrawerTabTypes
  handleDrawerChange: DrawerChangeFn
}

const SideMenu: React.FC<Props> = ({
  isOpen,
  selected,
  handleDrawerChange,
}) => {
  const classes = useStyles()
  const { formatMessage } = useLocale()

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: isOpen,
        [classes.drawerClose]: !isOpen,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: isOpen,
          [classes.drawerClose]: !isOpen,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={() => handleDrawerChange('isOpen', !isOpen)}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {menuListItems.map(({ name, path, Icon }) => (
          <Link
            to={`/${path}`}
            onClick={() => handleDrawerChange('selected', name)}
            key={name}
            className={classes.link}
          >
            <ListItem
              button
              className={
                name === selected ? classes.selectedLink : classes.link
              }
            >
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText
                primary={formatMessage('menu:' + name.toLowerCase())}
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  )
}

export default SideMenu
