const inquirer = require('inquirer')
const child_process = require('child_process')
const _ = require('./utils')
const path = require('path')

const CONFIG_PATH = `${path.resolve(__dirname, './cgc.config.json')}`

function execGitCommitPromise(ans) {
  return new Promise((resolve, reject) => {
    let cp = child_process.exec(`git commit -m "${ans}" `, function(
      err,
      stdout
    ) {
      if (err) reject(err)
      resolve(stdout)
      cp.kill()
    })
  })
}

async function getDefaultName() {
  const { name } = await _.readFile(CONFIG_PATH)
  return name
}

async function getFormatAry() {
  const { format } = await _.readFile(CONFIG_PATH)

  return format.split(/\&(\S+)\&/g)
}

const promptList = [
  {
    type: 'list',
    message: 'type:',
    name: 'type',
    choices: [
      {
        key: 'feat',
        name: '- _feat_: new feature',
        value: 'feat'
      },
      {
        key: 'test',
        name: '- _test_: add or change some test case',
        value: 'test'
      },
      {
        key: 'refactor',
        name:
          '- _refactor_: refactor of the code and not change the behavior of code itself',
        value: 'refactor'
      },
      {
        key: 'style',
        name:
          '- _style_: format the code style, such as indent of code, not related to code itself',
        value: 'style'
      },
      {
        key: 'chore',
        name: '- _chore_: changes to the build process or code infrastructure',
        value: 'chore'
      },
      {
        key: 'fix',
        name: '- _fix_: fix the bug',
        value: 'test'
      },
      {
        key: 'docs',
        name:
          '- _docs_: documentation related, such add content to documentation or add some comments',
        value: 'docs'
      },
      {
        key: 'revert',
        name: '- _revert_: revert the previous commit',
        value: 'revert'
      },
      {
        key: 'temporary',
        name: '- _temporary_: temporary change something maybe for pipeline',
        value: 'temporary'
      },
      {
        key: 'hotfix',
        name: '- _hotfix_: fix the bug for emergency',
        value: 'hotfix'
      }
    ]
  },
  {
    type: 'input',
    message: 'name:',
    name: 'name',
    default: '' // 默认值
  },
  {
    type: 'input',
    message: 'card ID:',
    name: 'cardId',
    default: 'N/A' // 默认值
  },
  {
    type: 'input',
    message: 'body:',
    name: 'body',
    default: '' // 默认值
  }
]

async function initPromptList() {
  const defaultName = await getDefaultName()
  promptList[1].default = defaultName
}

async function start() {
  const formatAry = await getFormatAry()

  let res = await inquirer.prompt(promptList)

  for (let index in formatAry) {
    let item = formatAry[index]

    if (!res[item]) {
      continue
    }
    formatAry.splice(index, 1, res[item])
  }

  return formatAry.join('')
}

async function format() {
  await initPromptList()

  const formatString = await start()

  let res = await execGitCommitPromise(formatString)

  console.log(res)

  process.exit(0)
}

module.exports = format
