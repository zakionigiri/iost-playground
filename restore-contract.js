const fs = require('fs')
let code = require('./test.js')

code = code.replace(/_IOSTInstruction_counter.incr\([0-9]*.?[0-9]+\)[;,]/g, '')
code = code.replace(
  /_IOSTBinaryOp\((?P<a>[^(,]*),{1} (?P<b>[^(,]*),{1} '(?P<c>[^(,]*)'\)/g,
  '$a $c $b'
)

fs.writeFile('./resotored.js', code, err => {
  console.log(err)
})
