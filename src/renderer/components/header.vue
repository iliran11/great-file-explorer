<template>
    <div class="header">
        <div class="path">
            <span v-for="(folder,index) in path"
                :key="index"
                @click="pathClicked(index)"
                class="path-element">{{folder}}</span>
        </div>
        <!-- <i class="fa arrow fa-arrow-left"
            aria-hidden="true"></i>

        <i class="fa arrow fa-arrow-right"
            aria-hidden="true"></i> -->
    </div>
</template>

<script>
export default {
    name: 'header',
    props: ['path'],
    methods: {
        pathClicked(index) {
            const directoryDescentDepth = (Math.abs((this.path.length - 1) - index))
            this.$emit('path-descented', directoryDescentDepth)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../palette.scss';

.header {
    // font-size: 5vw;
    display: flex;
    justify-content: space-between;
    color: $color3;
    font-size: 5vw;
    align-items: center;
    font-size: 72px;
}

.path-element {
    cursor: pointer;
    &::after {
        content: '\\';
    }
    &::after:last-child {
        content: '';
    }
    &:hover {
        filter: brightness(1.5)
    }
}

p {
    font-size: 2.7vw;
    margin: 0px;
}

.arrow {
    color: green; // background: linear-gradient(red, yellow);
    // -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
}
</style>