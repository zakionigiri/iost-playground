import { RootState } from 'store'
import { createSelector } from '@reduxjs/toolkit'

export const selectFunctions = (state: RootState) => state.form.functions
export const selectTxResults = (state: RootState) =>
  state.form.functions.results

export const selectedFunctionSelector = createSelector(
  selectFunctions,
  ({ selectedFunction }) => selectedFunction
)

export const argsSelector = createSelector(
  selectFunctions,
  ({ selectedContract, selectedFunction, args }) => {
    if (selectedFunction === '' || selectedContract == '') {
      return {
        selectedContract: '',
        selectedFunction: '',
        args: [],
      }
    }

    return {
      selectedContract,
      selectedFunction,
      args: args[selectedContract][selectedFunction],
    }
  }
)
