const fs = require('fs')

function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, function(error, data) {
      if (error) {
        // 在这里就可以通过判断 error 来确认是否有错误发生
        reject(error)
      } else {
        const resolveData = !!data.toString() ? JSON.parse(data.toString()) : {}
        resolve(resolveData)
      }
    })
  })
}

function writeFile(path, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, function(error) {
      if (error) {
        console.log(error)
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

module.exports = {
  readFile,
  writeFile
}
