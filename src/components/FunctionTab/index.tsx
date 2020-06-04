import React from 'react'

type Props = {
  abiStr: string
}

type Abi = {
  language: 'javascript'
  version: '1.0.0'
  abi: IOSTJS.Response.Abi[]
}

const FunctionTab: React.FC<Props> = ({ abiStr }) => {
  const abiObj: Abi = JSON.parse(abiStr || '{}')

  return (
    <>
      {Object.keys(abiObj).map(key => {
        return (
          <div>
            {key}:{JSON.stringify(abiObj[key as keyof Abi])}
          </div>
        )
      })}
    </>
  )
}

export default FunctionTab
