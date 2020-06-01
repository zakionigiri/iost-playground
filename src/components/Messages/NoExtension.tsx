import React from 'react'
import { Typography } from '@material-ui/core'

const NoExtensionMessage = () => {
  return (
    <Typography>
      It seems that you don't have iWallet chrome extension installed on your
      browser.
      <br />
      Go to{' '}
      <a href="https://chrome.google.com/webstore/detail/iwallet/kncchdigobghenbbaddojjnnaogfppfj?hl=ja">
        iWallet chrome extension
      </a>{' '}
      to install the extension
    </Typography>
  )
}

export default NoExtensionMessage
