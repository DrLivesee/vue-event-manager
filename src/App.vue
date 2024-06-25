<template>
  <div id="app">
    <h1 class="app__title">Frontend Test Task</h1>
    <div class="app__actions">
      <PriceInput v-model="price" />
      <QuantityInput v-model="quantity" />
      <AmountDisplay :price="price" :quantity="quantity" />
      <SubmitButtonAndStorage
        :localStorageData="localStorageData"
        :handleSubmit="handleSubmit"
      />
    </div>
    <EventsDisplay :actions="actions" />
  </div>
</template>

<script setup lang="ts">
import PriceInput from "./components/PriceInput.vue";
import QuantityInput from "./components/QuantityInput.vue";
import AmountDisplay from "./components/AmountDisplay.vue";
import EventsDisplay from "./components/EventsDisplay.vue";
import SubmitButtonAndStorage from "./components/SubmitButtonAndStorage.vue";
import { useEventManager } from "./composables/useEventManager";

const {
  price,
  quantity,
  actions,
  localStorageData,
  handleSubmit
} = useEventManager();
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  margin-top: 60px;
  width: 100%;
}

.app__title {
  margin-bottom: 24px;
}

.app__actions {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  gap: 10px;
  width: 100%;
  margin-bottom: 24px;
}
</style>