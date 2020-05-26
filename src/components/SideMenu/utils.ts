import CodeIcon from '@material-ui/icons/Code'
import SettingsIcon from '@material-ui/icons/Settings'
import FilterNoneIcon from '@material-ui/icons/FilterNone'
import AccessibilityIcon from '@material-ui/icons/Accessibility'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'
import { SvgIconTypeMap } from '@material-ui/core'

type ListItemProps = {
  name: string
  path: string
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
}

export const menuListItems: ListItemProps[] = [
  {
    name: 'Contracts',
    path: 'contracts',
    Icon: FilterNoneIcon
  },
  {
    name: 'Account',
    path: 'account',
    Icon: AccessibilityIcon
  },
  {
    name: 'Settings',
    path: 'settings',
    Icon: SettingsIcon
  }
]
