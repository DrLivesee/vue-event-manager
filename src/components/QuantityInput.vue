<template>
  <div class="input-container">
    <label class="input-container__label">Quantity: </label>
    <input class="input-container__input" type="number" v-model.number="internalQuantity" @input="debouncedUpdate" @blur="checkEmpty" />
    <label class="input-container__display">Quantity: {{ internalQuantity }}</label>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { debounce } from 'lodash';

const props = defineProps({
  modelValue: Number
});

const emit = defineEmits(['update:modelValue']);

const internalQuantity = ref(props.modelValue);

const updateQuantity = () => {
  emit('update:modelValue', internalQuantity.value);
};

const debouncedUpdate = debounce(updateQuantity, 300);

const checkEmpty = () => {
  if (internalQuantity.value === null || internalQuantity.value === undefined) {
    internalQuantity.value = 0;
  }
  internalQuantity.value = Math.abs(internalQuantity.value);
  emit('update:modelValue', internalQuantity.value);
};

watch(() => props.modelValue, (newVal) => {
  internalQuantity.value = newVal;
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