import Help from '@oclif/plugin-help'
import {renderList} from '@oclif/plugin-help/lib/list'
import indent from 'indent-string'
import chalk from 'chalk'

export default class MyHelpClass extends Help {
  // the formatting responsible for the header
  // displayed for the root help
  formatRoot(): string {
    const options = renderList([
      ['-u, --url', 'The URL of the RPC server, overwrites host and port options (default: [http|ws]://localhost:8648[/ws])'],
      ['-h, --host', 'Hostname of the RPC server (default: localhost)'],
      ['-p, --port', 'Port of the RPC server (default: 8648)'],
    ], {
      stripAnsi: this.opts.stripAnsi,
      maxWidth: this.opts.maxWidth - 2,
    })

    return [
      super.formatRoot(),
      '',
      chalk.bold('OPTIONS'),
      indent(options, 2),
    ].join('\n')
  }
}
