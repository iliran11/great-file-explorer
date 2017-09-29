<template>
    <div class="sideline-bar">
        <div class="drive-letter-container"
            :style="{height:driveLetterHeight}"
            v-for="(partition,index) in partitions"
            :key="index"
            @click="changeDrive(partition)">
            <div class="drive-letter">
                {{partition}}
            </div>
        </div>

    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name: 'sideline-bar',
    computed: {
        ...mapGetters({ partitions: 'getPartitions' }),
        driveLetterHeight() {
            return `${100 / this.partitions.length}%`
        }
    },
    methods: {
        changeDrive(partition) {
            this.$store.dispatch('changeDrive', partition)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../palette.scss';
.sideline-bar {
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.drive-letter-container {
    display: flex;
    width: 100%;
    justify-content: center;
    color: $color9;
    font-weight: bold;
    font-size: 4vh;
    background-color: #1C2132;
    cursor: pointer;
    &:hover {
        filter: brightness(1.4);
    }
}

.drive-letter {
    display: flex;
    border-bottom: 1px solid $color4;
    justify-content: center;
    align-items: center;
    width: 70%;
    height: 100%;
}
</style>

