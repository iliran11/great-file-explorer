<template>
    <div class="header">
        <div class="path">
            <span v-for="(folder,index) in currentPathArray"
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
import { mapGetters } from 'vuex'

export default {
    name: 'header',
    props: ['path'],
    computed: {
        ...mapGetters(['currentPathArray'])
    },
    methods: {
        pathClicked(index) {
            // this.$store.dispatch('descentPath', index)
            this.$store.dispatch('descentPath', index)
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
    color: green;
}
</style>