import React from 'react'
import { List, ListItem, Input, Typography, Divider } from '@material-ui/core'
import useStyles from './styles'
import RecursiveList from '../RecursiveList'

export type ListItemParams = {
  key: string
  title: string
  component: any
  isReactComponent?: boolean
}

type Props = {
  items: ListItemParams[]
}

const BaseList: React.FC<Props> = ({ items }) => {
  const classes = useStyles()

  return (
    <List className={classes.root}>
      {items.map(({ key, title, component, isReactComponent }) => {
        if (isReactComponent === true) {
          return component
        }

        return (
          <ListItem key={key} className={classes.listItemContainer}>
            <div className={classes.titleContainer}>
              <h3 className={classes.listItemTitle}>{title}:</h3>
            </div>
            {typeof component === 'string' ? (
              <p className={classes.listItemValue}>{component}</p>
            ) : (
              <RecursiveList items={component} keyName={key} />
            )}
          </ListItem>
        )
      })}
    </List>
  )
}

export default BaseList
