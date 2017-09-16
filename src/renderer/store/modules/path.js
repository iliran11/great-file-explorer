const path = require('path')
const fs = require('fs-extra')

const state = {
  history: [path.resolve()],
  index: 0,
  currentDirectory: {}
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
  folderContent(state) {
    return state.currentDirectory
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
    state.currentDirectory = payload
  }
};

const actions = {
  descentPath(context, index) {
    const currentPathArray = context.getters.currentPathArray
    const currentPathString = context.getters.currentPathString
    const descentDepth = (Math.abs((currentPathArray.length - 1) - index))
    const newPath = path.resolve.apply(null, [currentPathString].concat(new Array(descentDepth).fill('../')))
    context.commit('pushToHistory', newPath)
    context.commit('moveToLastIndex')
    context.dispatch('directoryClicked')
  },
  ascendDirectory(context, payload) {
    const newPath = path.resolve(context.getters.currentPathString, payload)
    context.commit('pushToHistory', newPath)
    context.commit('moveToLastIndex')
    context.dispatch('directoryClicked')
  },
  directoryClicked(context) {
    const currentPath = context.getters.currentPathString
    fs.readdir(currentPath)
      .then((files, err) => {
        if (err) { throw err }
        const permissions = files.map((element) => {
          const filePath = path.resolve(currentPath, element)
          return new Promise((resolve) => {
            fs.stat(filePath)
              .then((stats) => {
                stats.fileName = element
                resolve(stats)
              })
              .catch(err => resolve(err))
          })
        })
        return Promise.all(permissions)
      })
      .then((result) => {
        const folderContent = result.reduce((accumulator, element) => {
          if (element.errno) {
            accumulator.errors.push(element.path)
            return accumulator
          }
          const isDirectory = element.isDirectory()
          accumulator[isDirectory ? 'directories' : 'files'][element.fileName] = element
          return accumulator
        }, {
            directories: {},
            files: {},
            errors: []
          })
        context.commit('setCurrentDirectoryContent', folderContent)
      })
  }
};

export default {
  getters,
  state,
  mutations,
  actions,
};
