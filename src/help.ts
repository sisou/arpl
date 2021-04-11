import Help from '@oclif/plugin-help'
import {renderList} from '@oclif/plugin-help/lib/list'
import indent from 'indent-string'
import chalk from 'chalk'

export default class MyHelpClass extends Help {
  // the formatting responsible for the header
  // displayed for the root help
  formatRoot(): string {
    const connectionOptions = renderList([
      ['-u, --url', 'The URL of the RPC server, overwrites host and port options (default: [http|ws]://localhost:8648[/ws])'],
      ['-h, --host', 'Hostname of the RPC server (default: localhost)'],
      ['-p, --port', 'Port of the RPC server (default: 8648)'],
    ], {
      stripAnsi: this.opts.stripAnsi,
      maxWidth: this.opts.maxWidth - 2,
    })
    const requestOptions = renderList([
      ['-t, --timeout', 'Timeout for request in ms, set to 0 to disable (default: 5000)'],
    ], {
      stripAnsi: this.opts.stripAnsi,
      maxWidth: this.opts.maxWidth - 2,
    })

    return [
      super.formatRoot(),
      '',
      chalk.bold('CONNECTION OPTIONS'),
      indent(connectionOptions, 2),
      '',
      chalk.bold('REQUEST OPTIONS'),
      indent(requestOptions, 2),
    ].join('\n')
  }
}
