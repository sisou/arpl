import {RpcCommand} from '../lib/rpc-command'

export default class Raw extends RpcCommand {
  static description = 'Run a raw Nimiq JSON-RPC command'

  static args = [{
    name: 'command',
    required: true,
  }, {
    name: 'options',
  }]

  async run() {
    const [id, ...argv] = this.argv.filter(arg => !arg.startsWith('-'))

    const params = argv.map((arg, index) => {
      let parseNumber = true
      // Do not parse block number
      if (id === 'blockByNumber' && index === 0) parseNumber = false

      // Do not parse validity start height
      if ((id.startsWith('create') || id.startsWith('send'))
        && id.endsWith('Transaction')
        && index === argv.length - 1
      ) parseNumber = false

      if (parseNumber && parseFloat(arg).toString() === arg) return parseFloat(arg)

      if (arg === 'true') return true
      if (arg === 'false') return false

      if (arg === 'null') return null
      if (arg === 'undefined') return undefined

      return arg
    })

    const result = await this.$rpc.call(id, params)

    console.dir(result, {depth: Infinity, maxArrayLength: Infinity})
  }
}
