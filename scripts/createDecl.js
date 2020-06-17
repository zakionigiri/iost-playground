const fs = require('fs')
const _ = require('lodash')

const filePath = './src/lib/declaration/index.ts'
const startClause = 'const decl = `'
const endClause = `
\`
export default decl
`

const basePath = './src/types/iost'
const filePaths = []

const files = fs.readdirSync(basePath)

const getFilePaths = (basePath, files) => {
  const path = [basePath]

  for (const name of files) {
    if (name.includes('.d.ts')) {
      filePaths.push([...path, name].join('/'))
      continue
    }

    const p = [...path, name].join('/')
    const files = fs.readdirSync(p)
    getFilePaths(p, files)
  }
}

const main = () => {
  getFilePaths(basePath, files)

  const writeStream = fs.createWriteStream(filePath)
  writeStream.setMaxListeners(30)
  writeStream.write(startClause)
  for (const index in filePaths) {
    const readStream = fs.createReadStream(filePaths[index])
    readStream.pipe(writeStream)
  }
  writeStream.on('close', () => {
    fs.writeFile(filePath, endClause, { flag: 'a' }, () => {
      console.log('finished')
    })
  })
}

main()
