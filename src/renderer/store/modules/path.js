const path = require('path')
const fs = require('fs')

const state = {
  history: [path.resolve()],
  index: 0
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
  directories(state, getters) {
      const currentPath = getters.currentPathString
      return fs.readdirSync(currentPath)
        .filter((element) => {
          let isDirectory;
          const filePath = `${currentPath}/${element}`
          /** try/catch  block because there are so files we will have no access to them */
          try {
            isDirectory = fs.statSync(filePath).isDirectory()
          } catch (e) { console.log('cant read', filePath) }
          return isDirectory
        }
        )
    }
  }
const mutations = {
  pushToHistory(state, path) {
    state.history.push(path)
  },
  moveToLastIndex(state) {
    state.index = state.history.length - 1
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
  },
  directoryClicked(context, directoryName) {
    console.log(directoryName)
    const currentPath = context.getters.currentPathString
    const newPath = path.resolve(currentPath, directoryName)
    context.commit('pushToHistory', newPath)
    context.commit('moveToLastIndex')
  }
};

export default {
  getters,
  state,
  mutations,
  actions,
};
