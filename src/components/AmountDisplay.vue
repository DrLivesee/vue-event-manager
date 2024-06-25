<template>
  <div class="input-container">
    <label class="input-container__label">Amount: </label>
    <input class="input-container__input" type="number" :value="amount" readonly />
    <label class="input-container__display">Amount: {{ amount }}</label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const amount = computed(() => props.price * props.quantity);
</script>

<style lang="scss" scoped>
.input-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.input-container__label,
.input-container__input,
.input-container__display {
  padding: 5px 10px;
}
</style>