import {RpcCommand} from '../lib/rpc-command'

export default class Raw extends RpcCommand {
  static description = 'Run a raw Nimiq JSON-RPC command'

  static args = [{
    name: 'command',
    required: true,
  }, {
    name: 'options',
  }]

  // Disable argument validation
  static strict = false

  async run() {
    const {flags} = this.parse(Raw)

    const [id, ...argv] = this.argv.filter((arg, i, arr) => {
      const isFlag = arg.startsWith('-')
      const isFlagArgument = i > 0 ? arr[i - 1].startsWith('-') && !arr[i - 1].includes('=') : false
      return !isFlag && !isFlagArgument
    })

    const params = argv.map((arg, index) => {
      let parseNumber = true

      // Do not parse validity start height
      if ((id.startsWith('create') || id.startsWith('send')) &&
        id.endsWith('Transaction') &&
        index === argv.length - 1
      ) parseNumber = false

      if (parseNumber && parseFloat(arg).toString() === arg) return parseFloat(arg)

      if (arg === 'true') return true
      if (arg === 'false') return false

      if (arg === 'null') return null

      return arg
    })

    const {data, metadata} = await this.call<unknown>(Raw, id, params)

    console.dir(data, {depth: Infinity, maxArrayLength: Infinity}) // eslint-disable-line no-console
    this.showMetadataIfRequested(metadata, flags)
  }
}
