const contract = `class Contract {
  init() {}
  
  /**
   * @param {string} name
   */
  hello(name) {
    return \`Hello \${name} !!\`
  }
}
  
module.exports = Contract
`

export default contract
