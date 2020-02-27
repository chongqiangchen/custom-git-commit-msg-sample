#!/usr/bin/env node
const readline = require('readline')
const child_process = require('child_process')
const inquirer = require('inquirer')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(q) {
  return new Promise(resolve => {
    rl.question(q, answer => {
      resolve(answer)
    })
  })
}

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

async function format() {
  let { type, name, cardId, body } = await inquirer.prompt(promptList)
  let formatAns = `${type}: [${name}] #${cardId} ${body}`
  let res = await execGitCommitPromise(formatAns)
  console.log(res)
  process.exit(0)
}

format()
