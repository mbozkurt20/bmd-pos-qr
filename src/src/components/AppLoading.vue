<template>
    <div class="wrapper">
        <img src="/loading.webp" />
    </div>
</template>
<style scoped lang="scss">
.wrapper {
    width: 100vw;
    height: 100vh;
    position: absolute;
    overflow: hidden;
    background-color: #ffffffaa;
    margin: 0px;
    padding: 0px;
    z-index: 99999999;

    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 100px;
        height: 100px;
        object-fit: cover;
    }
}
</style>