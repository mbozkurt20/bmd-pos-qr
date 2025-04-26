<template>
  <div v-if="contents">
    <h6 class="content-title" :class="contents.cardMargin ? 'mt-5' : ''">
      {{ contents.title }}
    </h6>
    <div class="setting">
      <div
        v-for="(item, i) in contents.inputs"
        class="setting-item"
        :key="'content' + i"
      >
        <div class="left-side">
          <span class="title">{{ item.title }}</span>
          <span class="description">{{ item.description }}</span>
        </div>
        <div class="right-side">
          <span
            v-if="item.inputType == 'input'"
            @click="settingModal(item)"
            :style="[!item.isReadonly ? 'cursor:pointer' : '', 'padding: 10px']"
            >{{ item.inputData }}</span
          >
          <div v-else class="switch-container">
            <div class="switch" @click="toggleSwitch(item)">
              <input type="checkbox" :checked="Settings.setting[item.key]" />

              <span class="switch-slider"></span>
            </div>
            <div class="switch-right">
              <div class="switch-state"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <SettingModal />
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted, onUpdated, watch } from "vue";
import { setSettingModal } from "../../store/modal";
import SettingModal from "../Modal/SettingModal.vue";
import { updateStatus } from "../../store/setting";
import { getSetting, Settings } from "../../store/setting";
const { contents } = defineProps(["contents"]);
const flag = ref();
onMounted(() => {
  getSetting();
});

const toggleSwitch = (item: any) => {
  if (Settings.setting[item.key] == 1) {
    Settings.setting[item.key] = 0;
  } else {
    Settings.setting[item.key] = 1;
  }
  updateStatus(Settings.setting);
};

const settingModal = (item: any) => {
  if (!item.isReadonly) {
    setSettingModal(true);
  }
};
</script>

<style scoped>
.basket-card {
  border-radius: 12px;
  padding: 2rem;
  color: #000;
  margin: 1rem;
}
.content-title {
  color: #dc1862;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #00000011;
  padding: 12px;
}

.setting-item:not(:first-child) {
  margin-top: 12px;
}

.left-side {
  display: flex;
  flex-direction: column;
}
.left-side .title {
  font-size: 18px;
}
.left-side .description {
  font-size: 12px;
  color: grey;
}
.right-side span {
  background-color: #20316a;
  color: white;

  border-radius: 5px;
  font-weight: 500;
}
.switch-container {
  display: flex;
  align-items: center;
  border-radius: 8px;
  gap: 8px;
  cursor: pointer;
  padding: 2px 6px;
  color: #777;
}

.switch-container svg {
  height: 18px;
}

.switch-label {
  margin-right: 10px;
}

.switch-right {
  flex-direction: column;
  display: flex;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.switch-label {
  font-size: 14px;
  font-weight: 600;
}

.switch-state {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.switch-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ed5249 !important;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 20px;
}

.switch-slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 4px;
  bottom: 3px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .switch-slider {
  background-color: #28a745 !important;
}

input:focus + .switch-slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .switch-slider:before {
  -webkit-transform: translateX(25px);
  -ms-transform: translateX(25px);
  transform: translateX(25px);
}
</style>
