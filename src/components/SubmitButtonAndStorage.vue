<template>
  <div class="submit-and-storage">
    <button type="button" class="submit-and-storage__btn" @click="onClick">Submit</button>
    <label class="submit-and-storage__label">Storage: {{ localStorageData }}</label>
  </div>
</template>

<script setup lang="ts">
import { PropType} from "vue";

const props = defineProps({
  handleSubmit: {
    type: Function as PropType<(event: MouseEvent) => void>,
    required: true,
  },
  localStorageData: {
    type: String,
    required: true,
  },
});

const onClick = (event: MouseEvent) => {
  props.handleSubmit(event);
};
</script>

<style lang="scss" scoped>
.submit-and-storage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.submit-and-storage__btn {
  padding: 5px 10px;
  background: none;
  cursor: pointer;
  width: 100%;
}

.submit-and-storage__label {
  margin-top: 10px;
}
</style>