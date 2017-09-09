<template>
  <div class="app">
    <explorer-header></explorer-header>
    <div class="grid">
      <grid-item v-for="directory in directories"
        :key="directory"
        :item-data="directory">
        {{directory}}
      </grid-item>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import gridItem from './components/grid-item.vue';
import explorerHeader from './components/header.vue'
const fs = require('fs');

export default {
  name: 'Great-File-Explorer',
  computed: {
    ...mapGetters(['currentPathString']),
    directories() {
      return fs.readdirSync(this.currentPathString)
        .filter((element) => {
          let isDirectory;
          const filePath = `${this.currentPathString}/${element}`
          /** try/catch  block because there are so files we will have no access to them */
          try {
            isDirectory = fs.statSync(filePath).isDirectory()
          } catch (e) { console.log('cant read', filePath) }
          return isDirectory
        }
        )
    }
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