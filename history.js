const Fuse = require('fuse.js')
const unique = require('lodash.uniq')
const history = require('shell-history')()

module.exports = hint => {
  return new Promise(resolve => {
    /* fuse likes objects */
    const historyMap = history.map(h => ({ command: h }))
    const options = { keys: ['command'] }

    const fuse = new Fuse(historyMap, options)
    const matchingHistory = fuse.search(hint)
    const choices = unique(matchingHistory.map(h => h.command))

    if (!choices.length) resolve(history)
    else resolve(choices)
  })
}
