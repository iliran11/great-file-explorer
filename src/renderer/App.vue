<template>
  <div class="app">
    <explorer-header></explorer-header>
    <div class="content">
      <sideline-bar/>
      <div class="grid">
        <grid-item v-for="(fsStat,directory,index) in directoryContent.directories"
          :key="index"
          :item-data="fsStat"
          icon-class="fa-folder-o">
          {{directory}}
        </grid-item>
        <grid-item v-for="(fsStat,file,index) in directoryContent.files"
          :key="index"
          icon-class="fa-file-o"
          :item-data="fsStat">
          {{file}}
        </grid-item>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import gridItem from './components/grid-item.vue';
import explorerHeader from './components/header.vue'
import sidelineBar from './components/sideline-bar.vue'
export default {
  name: 'Great-File-Explorer',
  computed: {
    ...mapGetters(['directoryContent', 'currentPathString']),
  },
  components: { gridItem, explorerHeader, sidelineBar },
  created() {
    this.$store.dispatch('readDirectory', this.currentPathString)
    this.$store.dispatch('readAvailablePartitions', this.currentPathString)
  }
};
</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css?family=Roboto:400,700');
@import './palette.scss';
@import './sass/font-awesome-4.7.0/css/font-awesome.min.css';
body {
  margin:0px;
}
.app {
  display: flex;
  flex-direction: column;
  color: white;
  // padding: 10px 10px;
}

.content {
  display: flex;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-self:flex-start;
}

html {
  font-family: 'Roboto', sans-serif;
  box-sizing: border-box;
  background-color: $color1;
}
</style>