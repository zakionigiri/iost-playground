import { RootState } from 'store'
import { createSelector } from '@reduxjs/toolkit'

export const selectFunctions = (state: RootState) => state.form.functions

export const selectedFunctionSelector = createSelector(
  selectFunctions,
  ({ selectedFunction }) => selectedFunction
)

export const argsSelector = createSelector(
  selectFunctions,
  ({ selectedContract, selectedFunction, args }) => {
    if (selectedFunction === '' || selectedContract == '') return []

    return args[selectedContract][selectedFunction]
  }
)
