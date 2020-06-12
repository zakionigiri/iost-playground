import React from 'react'
import { useIntl } from 'provider/IntlProvider'

const Notes = () => {
  const { formatMessage } = useIntl()

  return (
    <div>
      <h2>About IOST Playground</h2>
      <p>
        This is a platform where users can try out smart contract development on
        the IOST blockchain.
      </p>
      <h3>Caveats</h3>
      <p>
        I have decided to mention what you have to be careful about first rather
        than leaving it to the end of this notes.
      </p>
      <p>
        (Assuming not many of you don't read these through, because I don't do
        that if I were you :0) ...)
      </p>
      <h4>About "compile" of the code</h4>
      <p>
        "compile" in IOST context means to create abi files based on contract
        JavaScrip files
      </p>
      <p>
        At the point of writing (2020/06/04),{' '}
        <a
          style={{ color: 'green' }}
          href="https://github.com/IOST-official/go-IOST/tree/master/iwallet/contract"
        >
          IOST compiler
        </a>{' '}
        does not automatically infer parameter types.
      </p>
      <p>
        You can tell the compiler the parameter type by writing JSDoc-like
        comments, but please be aware that a type should be either 'string',
        'number', or 'bool'. Please refer to{' '}
        <a
          style={{ color: 'green' }}
          href="https://developers.IOST.io/docs/en/3-smart-contract/ContractStart.html#abi-interface-definition"
        >
          the official document
        </a>{' '}
        for more information
      </p>
      <h3>Functionalities</h3>
      <p>In this playground you can: </p>
      <p>Send IOST APIs requests</p>
      <p>
        Write Smart Contracts and publish them onto IOST where it's main net,
        test net, or local net{' '}
      </p>
    </div>
  )
}

export default Notes
