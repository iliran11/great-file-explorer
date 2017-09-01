<template>
  <div>
    <div class="directories-grid">
      <span v-for="directory in Directories"
        :key="directory">{{directory}}</span>
    </div>
    <button @click="goBack">Go Back</button>
    <button @click="getDetails">Print Status</button>
    <file></file>
    <folder></folder>
  </div>
</template>

<script>
import folder from './components/folder.vue';
import file from './components/file.vue';
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
  components: { folder, file },
};
</script>

<style scoped>

</style>