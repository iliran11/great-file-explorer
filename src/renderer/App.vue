<template>
  <div>
    <div class="grid">
      <grid-item></grid-item>
      <grid-item></grid-item>
      <grid-item></grid-item>
      <grid-item></grid-item>
      <grid-item></grid-item>
      <grid-item></grid-item>
    </div>
    <button @click="goBack">Go Back</button>
    <button @click="getDetails">Print Status</button>
  </div>
</template>

<script>
import gridItem from './components/grid-item.vue';
const fs = require('fs');

export default {
  name: 'Great-File-Explorer',
  data() {
    return {
      electron: process.versions['atom-shell'],
      name: 'landing-page',
      node: process.versions.node,
      path: '/',
      platform: require('os').platform(),
      vue: require('vue/package.json').version,
      currentPath: require('path').resolve('./'),
      files: [],
      directories: [],
      fs: require('fs'),
    };
  },
  computed: {
    Directories() {
      return fs.readdirSync(this.currentPath)
        .filter(element => fs.statSync(`${this.currentPath}/${element}`).isDirectory(),
      );
    },
  },
  methods: {
    goBack() {
      console.log('here');
      this.currentPath = require('path').join(this.currentPath, '..');
    },
    getDetails() {
      fs.readdirSync(this.currentPath)
        .forEach((element) => {
          console.log(fs.statSync(`${this.currentPath}/${element}`));
        });
    },
  },
  mounted() {
    require('fs').readdir(this.currentPath, (err, files) => {
      if (err) console.error(err);
      this.files = files;
    });
  },
  components: { gridItem }
};
</script>

<style lang="scss" scoped>
.grid {
  padding: 0px 10px;
  display: flex;
  flex-wrap: wrap;
}
</style>