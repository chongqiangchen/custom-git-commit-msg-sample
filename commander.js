const program = require('commander')
const _ = require('./utils')

const CONFIG_PATH = './cgc.config.json'

// commander
async function commander() {
  program
    .command('default')
    .alias('d')
    .description('设置默认值 名字')
    .action(async function(option, cmd) {
      await _.writeFile(
        CONFIG_PATH,
        JSON.stringify({
          name: cmd[0]
        })
      )
      process.exit()
    })
  program.parse(process.argv)
}

module.exports = commander
