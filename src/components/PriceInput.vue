<template>
  <div class="input-container">
    <label class="input-container__label">Price: </label>
    <input class="input-container__input" type="number" v-model.number="internalPrice" @input="debouncedUpdate" @blur="checkEmpty" />
    <label class="input-container__display">Price: {{ internalPrice }}</label>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { debounce } from 'lodash';

const props = defineProps({
  modelValue: Number
});

const emit = defineEmits(['update:modelValue']);

const internalPrice = ref(props.modelValue);

const updatePrice = () => {
  emit('update:modelValue', internalPrice.value);
};

const debouncedUpdate = debounce(updatePrice, 300);

const checkEmpty = () => {
  if (internalPrice.value === null || internalPrice.value === undefined) {
    internalPrice.value = 0;
  }
  internalPrice.value = Math.abs(internalPrice.value);
  emit('update:modelValue', internalPrice.value);
};

watch(() => props.modelValue, (newVal) => {
  internalPrice.value = newVal;
});
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