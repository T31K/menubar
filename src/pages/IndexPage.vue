<template>
  <q-page class="q-pa-md bg flex test">
    <div class="">
      <q-btn :label="counter" color="primary"></q-btn>
    </div>

    <div>
      <q-btn @click="increaseCounter" color="warning">+</q-btn>
      <q-btn @click="decreaseCounter" color="warning">-</q-btn>
      <q-btn
        @click="quitApp"
        class="absolute-bottom-right"
        flat
        size="sm"
        round
        icon="power_settings_new"
        color="warning"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

let counter = ref(0);

const increaseCounter = () => {
  counter.value++;
};

const decreaseCounter = () => {
  counter.value--;
};

const quitApp = () => {
  window.globals.quitApp();
};
</script>

<style scoped>
.test {
  background-color: rgba(255, 255, 255 0.3);
  justify-content: center;
  align-items: center;
}
</style>
