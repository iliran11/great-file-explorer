<template>
  <div class="grid-item">
    <icon name="folder-o" class="icon"></icon>
    <p>The Terminator 3 </p>
  </div>
</template>

<script>
export default {
  name: 'folder',
};
</script>

<style lang="scss" scoped>
.grid-item {
  display: flex;
  width: calc(100%/3);
}
.icon {
  width:500px;
}
</style>