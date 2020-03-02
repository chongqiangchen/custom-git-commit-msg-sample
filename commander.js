const program = require('commander')
const _ = require('./utils')
const path = require('path')

const CONFIG_PATH = `${path.resolve(__dirname, './cgc.config.json')}`

const OPTIONS_OPERATIONS = {
  R: async () => {
    await _.writeFile(
      CONFIG_PATH,
      JSON.stringify({
        format: '&type&: [&name&] #&cardId& &body&',
        name: ''
      })
    )
    console.log('reset successful!')
  },
  N: async (oldConfig, cmd) => {
    await _.writeFile(
      CONFIG_PATH,
      JSON.stringify({
        ...oldConfig,
        name: !!cmd ? cmd[0] : ''
      })
    )
    console.log('set successful!')
  },
  F: async (oldConfig, cmd) => {
    await _.writeFile(
      CONFIG_PATH,
      JSON.stringify({
        ...oldConfig,
        format: !!cmd ? cmd[0] : ''
      })
    )
    console.log('set successful!')
  }
}

async function getConfigInfo() {
  const config = await _.readFile(CONFIG_PATH)
  return config
}

// commander
function commander() {
  return new Promise(resolve => {
    program
      .version('1.2.8', '-v, --version')
      .command('default')
      .option('-n', '设置名字')
      .option('-f', '设置格式')
      .option('-r', '重置')
      .alias('d')
      .description('设置默认值')
      .action(async function(option, cmd) {
        const oldConfig = await getConfigInfo()

        const selectKey = Object.keys(OPTIONS_OPERATIONS).filter(
          key => option[key]
        )[0]

        if (!selectKey) {
          console.log('current config: ' + JSON.stringify(oldConfig))
        } else {
          await OPTIONS_OPERATIONS[selectKey](oldConfig, cmd)
        }

        resolve(process.exit(0))
      })

    program.parse(process.argv)
  })
}

module.exports = commander
