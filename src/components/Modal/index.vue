<script setup>

const { title, icon, isOpened, handleClose, width } = defineProps({
  title: String,
  icon: String,
  isOpened: Boolean,
  handleClose: Function,
  width : {
    type: String,
    default: '480px'
  }
})
</script>

<template>
  <div class="wrapper" v-if="isOpened">
    <div class="card" :style="`max-width:${width};`">
      <div class="header">
        <h2 class="title m-0">
          <ion-icon v-if="icon" :name="icon" />
          <div>{{ title }} </div>
        </h2>
        <ion-icon class="close" @click="handleClose" style="font-size: 30px;" name="close-circle-outline" />
      </div>
      <div class="outer-wrapper" :class="title == 'Müşteri Seç' ? 'customer-modal' : ''">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
ion-icon {
  font-size: 20px;
  margin-right: 8px;
  position: relative;
  color: rgb(220, 24, 98);
  top: -1px;
}

.wrapper {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  background: #0000009a;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 9999999;

  .card {
    width: 100%;
    background: white;
    border-radius: 24px;

    .header {
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0px;
      border-bottom: 1px solid #ccc;

      .title {
        font-size: 18px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }

      .close {
        cursor: pointer;
      }
    }

    .outer-wrapper {
      padding-top: 24px;
      padding-bottom: 24px;
      padding-left: 8px;
      padding-right: 8px;
    }

    .content {
      background: transparent;
      width: 100%;
      padding: 12px;

      &.customer-modal {
        width: 100% !important;
      }
    }
  }
}
</style>