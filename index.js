#!/usr/bin/env node
const format = require('./format')
const commander = require('./commander')

// 监听Ctrl + C
process.on('SIGINT', function() {
  process.exit()
})

function main() {
  commander()

  format()
}

main()
