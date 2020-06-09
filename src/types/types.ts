export type ApiPaths =
  | '/execTx'
  | '/getAccount/{name}/{by_longest_chain}'
  | '/getBatchContractStorage'
  | '/getBlockByHash/{hash}/{complete}'
  | '/getBlockByNumber/{number}/{complete}'
  | '/getCandidateBonus/{name}/{by_longest_chain}'
  | '/getChainInfo'
  | '/getContract/{id}/{by_longest_chain}'
  | '/getContractStorage'
  | '/getContractStorageFields'
  | '/getContractVote/{id}/{by_longest_chain}'
  | '/getGasRatio'
  | '/getNodeInfo'
  | '/getProducerVoteInfo/{account}/{by_longest_chain}'
  | '/getRAMInfo'
  | '/getToken721Balance/{account}/{token}/{by_longest_chain}'
  | '/getToken721Metadata/{token}/{token_id}/{by_longest_chain}'
  | '/getToken721Owner/{token}/{token_id}/{by_longest_chain}'
  | '/getTokenBalance/{account}/{token}/{by_longest_chain}'
  | '/getTokenInfo/{symbol}/{by_longest_chain}'
  | '/getTxByHash/{hash}'
  | '/getTxReceiptByTxHash/{hash}'
  | '/getVoterBonus/{name}/{by_longest_chain}'
  | '/sendTx'
  | '/subscribe'

export type SwaggerDefinitions =
  | 'AccountGasInfo'
  | 'AccountGroup'
  | 'AccountItem'
  | 'AccountPermission'
  | 'AccountPledgeInfo'
  | 'AccountRAMInfo'
  | 'BlockInfo'
  | 'ContractABI'
  | 'EventTopic'
  | 'GetBatchContractStorageRequestKeyField'
  | 'SignatureAlgorithm'
  | 'SubscribeRequestFilter'
  | 'TxReceiptReceipt'
  | 'TxReceiptStatusCode'
  | 'rpcpbAccount'
  | 'rpcpbAction'
  | 'rpcpbAmountLimit'
  | 'rpcpbBlock'
  | 'rpcpbBlockResponse'
  | 'rpcpbBlockResponseStatus'
  | 'rpcpbCandidateBonus'
  | 'rpcpbChainInfoResponse'
  | 'rpcpbContract'
  | 'rpcpbContractVote'
  | 'rpcpbEvent'
  | 'rpcpbFrozenBalance'
  | 'rpcpbGasRatioResponse'
  | 'rpcpbGetBatchContractStorageRequest'
  | 'rpcpbGetBatchContractStorageResponse'
  | 'rpcpbGetContractStorageFieldsRequest'
  | 'rpcpbGetContractStorageFieldsResponse'
  | 'rpcpbGetContractStorageRequest'
  | 'rpcpbGetContractStorageResponse'
  | 'rpcpbGetProducerVoteInfoResponse'
  | 'rpcpbGetToken721BalanceResponse'
  | 'rpcpbGetToken721MetadataResponse'
  | 'rpcpbGetToken721OwnerResponse'
  | 'rpcpbGetTokenBalanceResponse'
  | 'rpcpbNetworkInfo'
  | 'rpcpbNodeInfoResponse'
  | 'rpcpbRAMInfoResponse'
  | 'rpcpbSendTransactionResponse'
  | 'rpcpbSignature'
  | 'rpcpbSubscribeRequest'
  | 'rpcpbSubscribeResponse'
  | 'rpcpbTokenInfo'
  | 'rpcpbTransaction'
  | 'rpcpbTransactionRequest'
  | 'rpcpbTransactionResponse'
  | 'rpcpbTransactionResponseStatus'
  | 'rpcpbTxReceipt'
  | 'rpcpbVoteInfo'
  | 'rpcpbVoterBonus'

export type SwaggerKey = keyof SwaggerConfig

export type SwaggerConfig = {
  swagger: '2.0'
  info: any
  schemes: string[]
  consumes: string[]
  produces: string[]
  paths: {
    [key: string]: {
      [method: string]: SwaggerPathProps
    }
  }
  definitions: any
}

export type SwaggerPathProps = {
  summary?: string
  operationId?: string
  responses: {
    [key: string]: SwaggerResponse
  }
  parameters: SwaggerParameter[]
}

type SwaggerResponse = {
  description: string
  schema: {
    [key: string]: string
    $ref: string
  }
}

type SwaggerParameter = {
  name: string
  description: string
  in: 'path' | 'query' | 'body'
  required: boolean
  type: 'string'
}

export type Host = {
  name: string
  url: string
}
