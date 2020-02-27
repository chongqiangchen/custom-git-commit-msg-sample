const program = require('commander')
const _ = require('./utils')
const path = require('path')

const CONFIG_PATH = `${path.resolve(__dirname, './cgc.config.json')}`

async function getConfigInfo() {
  const config = await _.readFile(CONFIG_PATH)
  return config
}

// commander
async function commander() {
  program
    .command('default')
    .option('-n', '设置名字')
    .option('-f', '设置格式')
    .alias('d')
    .description('设置默认值')
    .action(async function(option, cmd) {
      const oldConfig = await getConfigInfo()

      const key = option.F ? 'format' : 'name'

      await _.writeFile(
        CONFIG_PATH,
        JSON.stringify({
          ...oldConfig,
          [key]: cmd[0]
        })
      )

      process.exit()
    })
  program.parse(process.argv)
}

module.exports = commander
