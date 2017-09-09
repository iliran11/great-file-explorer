<template>
  <div class="grid-item"
    @click="itemClicked">
    <div class="icon-container">
      <i class="fa fa-folder-o"
        aria-hidden="true"></i>
    </div>
    <div class="item-details">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'grid-item',
  methods: {
    itemClicked() {
      this.$emit('item-selected', this.itemData)
    }
  },
  props: ['itemData']
};
</script>

<style lang="scss" scoped>
@import '../palette.scss';
$title-size: 3.2vw;
.grid-item {
  color: $color5;
  display: flex;
  width: calc(95%/3);
  margin-right: calc(5%/3);
  font-size: $title-size;
  align-items: center;
  background-color: $color2;
  margin-top: 1.5vw;
  overflow: auto;
  cursor: pointer;
  &:hover {
    filter: brightness(1.4);
    box-shadow: 0px 0px 5px 3px #575757
  }
}

.item-details {
  text-align: center;
  flex-grow: 1;
  padding: 1vh 0px;
  margin-right: auto;
  p {
    margin: 0px;
  }
  p:nth-child(2) {
    font-size:calc(#{$title-size}*0.9);
    margin-top: 0.4vh;
  }
}

.icon-container {
  background-color: #465362;
  filter: brightness(0.8);
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size:calc(#{$title-size}*1.5);
  align-self: stretch;
}

.fa {
  width: auto;
  height: 1em;
  color: $color4;
}
</style>