import React from 'react'
import { Abi } from 'store/features/contract/types'
import { Select, MenuItem } from '@material-ui/core'

type Props = {
  abi: Abi['abi']
}

const FunctionForm: React.FC<Props> = ({ abi }) => {
  return (
    <div>
      <h4>Functions</h4>
      <Select>
        {abi.map(({ name }, index) => (
          <MenuItem value={name} key={index}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </div>
  )
}

export default FunctionForm
