<script>
export default {
    props: {
        showClose: Boolean,
        title: String,
    },
    data() {
        return {
            currentName: this.name,
        };
    },
    methods: {
        handleCloseClicked() {
            this.$router.back();
        },
    },
};
</script>

<template>
    <div class="horizontal">
        <img
            v-if="showClose"
            class="button"
            src="@/assets/icon_back.svg"
            @click="handleCloseClicked"
        />
        <h3 class="title">{{ this.title }}</h3>
    </div>
</template>

<style scoped>
.horizontal {
    position: relative;
    height: 8mm;
    width: 100%;
    justify-self: center;
    justify-content: center;
}
.title {
    margin: 0mm;
    height: 8mm;
    align-content: center;
    vertical-align: center;
}
.button {
    justify-self: left;
    position: absolute;
    left: 0mm;
    width: 8mm;
    height: 8mm;
}
</style>
