const program = require('commander')
const _ = require('./utils')
const path = require('path')

const CONFIG_PATH = `${path.resolve(__dirname, './cgc.config.json')}`

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
      .alias('d')
      .description('设置默认值')
      .action(async function(option, cmd) {
        const oldConfig = await getConfigInfo()

        //初始化操作
        if (!option.F && !option.N) {
          await _.writeFile(
            CONFIG_PATH,
            JSON.stringify({
              format: '&type&: [&name&] #&cardId& &body&',
              name: ''
            })
          )

          resolve(process.exit(0))
        }

        const key = option.F ? 'format' : 'name'

        await _.writeFile(
          CONFIG_PATH,
          JSON.stringify({
            ...oldConfig,
            [key]: !!cmd ? cmd[0] : ''
          })
        )

        resolve(process.exit(0))
      })

    program.parse(process.argv)
  })
}

module.exports = commander
