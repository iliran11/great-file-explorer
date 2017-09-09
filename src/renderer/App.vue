<template>
  <div class="app">
    <explorer-header :path="currentPathArray"></explorer-header>
    <div class="grid">
      <grid-item v-for="directory in directories" :key="directory">
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
        .filter(element => fs.statSync(`${this.currentPath}/${element}`).isDirectory(),
      )
    },
    currentPathArray() {
      console.log('getarray')
      return this.currentPath.split('\\').map((element, index, array) => {
        if (index !== (array.length - 1)) {
          return `${element}\\`
        }
        return element
      })
    }
  },
  methods: {
    goBack() {
      this.currentPath = path.join(this.currentPath, '..');
    },
    getDetails() {
      fs.readdirSync(this.currentPath)
        .forEach((element) => {
          console.log(fs.statSync(`${this.currentPath}/${element}`));
        });
    },
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