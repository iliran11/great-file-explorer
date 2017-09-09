<template>
  <div class="app">
    <explorer-header :path="currentPathArray"
      @path-descented="pathDescented"></explorer-header>
    <div class="grid">
      <grid-item v-for="directory in directories"
        :key="directory"
        :item-data="directory"
        @item-selected="directoryClicked">
        {{directory}}
      </grid-item>
    </div>
    <button @click="goBack">Go Back</button>
    <button @click="getDetails">Print Status</button>
  </div>
</template>

<script>
import gridItem from './components/grid-item.vue';
import explorerHeader from './components/header.vue'
const fs = require('fs');
const path = require('path')
// const regex = new RegExp('\\\\');

export default {
  name: 'Great-File-Explorer',
  data() {
    return {
      currentPath: [],
    }
  },
  computed: {
    directories() {
      return fs.readdirSync(this.currentPath)
        .filter((element) => {
          let isDirectory;
          const filePath = `${this.currentPath}/${element}`
          /** try/catch  block because there are so files we will have no access to them */
          try {
            isDirectory = fs.statSync(filePath).isDirectory()
          } catch (e) { console.log('cant read', filePath) }
          return isDirectory
        }
        )
    },
    currentPathArray() {
      return this.currentPath.split('\\')
    }
  },
  methods: {
    goBack() {
      this.currentPath = path.join(this.currentPath, '..');
    },
    pathDescented(descentDepth) {
      // this.currentPath = path.resolve(this.currentPath, '../../')
      const descentDepthArray = new Array(descentDepth).fill('../')
      console.log(descentDepthArray)
      const newPath = path.resolve.apply(null, [this.currentPath].concat(descentDepthArray))
      this.currentPath = newPath
      return descentDepth
    },
    getDetails() {
      fs.readdirSync(this.currentPath)
        .forEach((element) => {
          console.log(fs.statSync(`${this.currentPath}/${element}`));
        });
    },
    directoryClicked(directoryName) {
      this.currentPath = path.resolve(this.currentPath, directoryName)
    }
  },
  created() {
    console.log('mounted')
    this.currentPath = path.resolve()
    // fs.readdir(this.getCurrentPath, (err, files) => {
    //   if (err) console.error(err);
    //   this.files = files;
    // });
  },
  components: { gridItem, explorerHeader }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto:400,700');
@import './palette.scss';
@import './sass/font-awesome-4.7.0/css/font-awesome.min.css';
.app {
  display: flex;
  flex-direction: column;
  color: white;
  padding: 10px 10px;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

html {
  font-family: 'Roboto', sans-serif;
  box-sizing: border-box;
  background-color: $color1;
}
</style>