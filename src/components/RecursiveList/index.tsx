import React from 'react'
import * as _ from 'lodash'
import BaseList, { ListItemParams } from '../BaseList'
import { List, ListItem, Divider } from '@material-ui/core'
import useStyles from './styles'

type Props = {
  keyName: string
  items: any
}

const RecursiveList: React.FC<Props> = ({ keyName, items }) => {
  const classes = useStyles()

  if (_.isArray(items)) {
    if (_.isEmpty(items)) {
      return <p className={classes.listItemValue}>[ ]</p>
    }
    const isObjectArray = _.isObject(items[0])

    if (isObjectArray) {
      const listItems: ListItemParams[] = items.map((item, index) => {
        return {
          key: `${keyName}_${index}`,
          title: `[${index}]`,
          component: item,
        }
      })

      return <BaseList items={listItems} />
    }

    return (
      <>
        <List>
          {items.map((item, index) => {
            return (
              <ListItem
                key={`${item}_${index}`}
                className={classes.listItemContainer}
              >
                {item}
              </ListItem>
            )
          })}
        </List>
        <Divider />
      </>
    )
  }

  return (
    <List>
      {Object.keys(items).map((key1, index) => {
        const isObject = _.isObject(items[key1])

        if (isObject) {
          const listItems: ListItemParams = {
            key: `${key1}_${index}`,
            title: key1,
            component: items[key1],
          }

          return <BaseList items={[listItems]} />
        }

        return (
          <ListItem
            key={`${key1}_${index}`}
            className={classes.listItemContainer}
          >
            <div className={classes.titleContainer}>
              <h3 className={classes.listItemTitle}>{key1}:</h3>
            </div>
            <p className={classes.listItemValue}>{items[key1 as string]}</p>
          </ListItem>
        )
      })}
    </List>
  )
}

export default RecursiveList
