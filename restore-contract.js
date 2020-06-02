const fs = require('fs')
let code = require('./test.js')

code = code.replace(/_IOSTInstruction_counter.incr\([0-9]*.?[0-9]+\)[;,]/g, '')
code = code.replace(
  /_IOSTBinaryOp\(([^(,]*),{1} ([^(,]*),{1} '([^(,]*)'\)/g,
  '$1 $3 $2'
)

code = code.replace(
  /_IOSTBinaryOp\(([^(,]*),{1} ([^(,]*),{1} '([^(,]*)'\)/g,
  '$1 $3 $2'
)

code = code.replace(/_IOSTTemplateTag/g, '')

fs.writeFile('./restored.js', code, err => {
  console.log(err)
})
