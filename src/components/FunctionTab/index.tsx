import React from 'react'
import { useIntl } from 'provider/IntlProvider'

type Props = {
  abiStr: string
}

type Abi = {
  language: 'javascript'
  version: '1.0.0'
  abi: IOSTJS.Response.Abi[]
}

const FunctionTab: React.FC<Props> = ({ abiStr }) => {
  const abiObj: Abi = JSON.parse(abiStr || '{abi: []}')
  const { formatMessage } = useIntl()

  return (
    <>
      <div>
        <p>{formatMessage('functions')}</p>
        <ul>
          {abiObj.abi.map(abi => (
            <li>
              <p>{abi.name}</p>
              <ul>
                {abi.args.map((arg, i) => (
                  <li>
                    第{i + 1}引数: {arg}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default FunctionTab
