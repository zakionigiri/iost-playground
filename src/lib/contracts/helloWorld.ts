const contract = `class HelloIOST {
  init() {}

  /**
   * @param {string} name
   */

  hello(name) {
    return \`Hello \${name} !!\`
  }
}
  
module.exports = HelloIOST
`

export default contract
