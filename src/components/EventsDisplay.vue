<template>
  <div class="events-container">
    <h2 class="events-container__title">Events</h2>
    <div class="events-container__actions">
      <div
        v-for="action in actions"
        :key="action.id"
        :class="[
          'events-container__action',
          { 'events-container__action--success': action.success, 'events-container__action--failure': action.success === false }
        ]"
      >
        <h3 class="events-container__action-title">Action {{ action.id }}</h3>
        <div v-for="event in action.events" :key="event.timestamp.getTime()">
          <strong>{{ event.type }}</strong>: {{ event.message }} <em>{{ formatDate(event.timestamp) }}</em>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType} from "vue";

interface Event {
  type: string;
  message: string;
  timestamp: Date;
}

interface Action {
  id: string;
  events: Event[];
  success?: boolean;
}

defineProps({
  actions: {
    type: Array as PropType<Action[]>,
    required: true,
  },
});

const formatDate = (date: Date): string => {
  return date.toLocaleString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};
</script>

<style lang="scss" scoped>
.events-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.events-container__title {
  margin-bottom: 20px;
}

.events-container__actions {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.events-container__action {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
}

.events-container__action--success {
  border-color: green;
}

.events-container__action--failure {
  border-color: red;
}

.events-container__action-title {
  margin-bottom: 10px;
}
</style>