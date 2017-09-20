const path = require('path')
const fs = require('fs-extra')

const state = {
  history: [path.resolve()],
  index: 0,
  currentDirectoryContent: {}
};
const getters = {
  currentPathArray(state) {
    /** when we encounter c:\ , the split return 2 elements instead of one.
 * https://stackoverflow.com/questions/12836062/string-split-returns-an-array-with-two-elements-instead-of-one */
    return state.history[state.index].split('\\').filter(x => x)
  },
  currentPathString(state) {
    return state.history[state.index]
  },
  directoryContent(state) {
    return state.currentDirectoryContent
  }
}
const mutations = {
  pushToHistory(state, path) {
    state.history.push(path)
  },
  moveToLastIndex(state) {
    state.index = state.history.length - 1
  },
  setCurrentDirectoryContent(state, payload) {
    state.currentDirectoryContent = payload
  }
};

const actions = {
  descentPath(context, index) {
    const currentPathArray = context.getters.currentPathArray
    const currentPathString = context.getters.currentPathString
    const descentDepth = (Math.abs((currentPathArray.length - 1) - index))
    const newPath = path.resolve.apply(null, [currentPathString].concat(new Array(descentDepth).fill('../')))
    context.dispatch('readDirectory', newPath)
  },
  ascendDirectory(context, payload) {
    const newPath = path.resolve(context.getters.currentPathString, payload)
    context.dispatch('readDirectory', newPath)
  },
  readDirectory(context, directoryPath) {
    fs.readdir(directoryPath)
      .then((items) => {
        const itemsDataPromises = items.map((item) => {
          const filePath = path.resolve(directoryPath, item)
          return new Promise((resolve) => {
            fs.stat(filePath)
              .then((stats) => {
                stats.fileName = item
                resolve(stats)
              })
              .catch(err => resolve(err))
          })
        })
        return Promise.all(itemsDataPromises)
      })
      .then((itemsStats) => {
        const folderContent = itemsStats.reduce((accumulator, itemStat) => {
          if (itemStat.errno) {
            accumulator.errors.push(itemStat.path)
            return accumulator
          }
          const isDirectory = itemStat.isDirectory()
          accumulator[isDirectory ? 'directories' : 'files'][itemStat.fileName] = itemStat
          return accumulator
        }, {
            directories: {},
            files: {},
            errors: []
          })
        context.commit('setCurrentDirectoryContent', folderContent)
        context.commit('pushToHistory', directoryPath)
        context.commit('moveToLastIndex')
      })
      .catch(error => console.error(error))
  },
  openFile(context, filePath) {
    const { exec } = require('child_process');
    exec(`start ${filePath}`);
  }
};

export default {
  getters,
  state,
  mutations,
  actions,
};
