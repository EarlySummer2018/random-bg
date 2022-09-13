/*
 * @Author HuangXR
 * @Date 2022-09-13 14:52:43
 */
const path = require('path')
const fs = require('fs')
const resourceSrc = `${process.cwd()}\\images`
// return
fs.readdir(resourceSrc, (err, files) => {
  const prefix = 'random-bg-'
  // 以 random- 开头
  const regexp = new RegExp(`^( + ${prefix} + )`)
  // 不以 random- 开头
  const regexp2 = new RegExp(`^(?!${prefix})`)
  const toBeginWithRandomLen = files.filter(file => regexp.test(file)).length
  const toBeginWithOther = files.filter(file => regexp2.test(file))
  if (!toBeginWithOther.length) return
  toBeginWithOther.forEach((file, index) => {
    const suffix = file.substring(file.lastIndexOf('.') + 1)
    const newFilename = `${prefix}${toBeginWithRandomLen + index + 1}.${suffix}`
    fs.rename(
      path.join(resourceSrc, file),
      path.join(resourceSrc, newFilename),
      err => {
        if (err) {
          console.log('err', err);
          return
        }
        console.log(`${file} & ${newFilename}`);
      }
    )
  })
})