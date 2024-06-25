import { ref, computed, watch } from "vue";
import { debounce } from "lodash";

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

export function useEventManager() {
  const price = ref(0);
  const quantity = ref(0);
  const actions = ref<Action[]>([]);
  const counter = ref(parseInt(localStorage.getItem("counter") || "0"));

  const amount = computed(() => price.value * quantity.value);

  const updateLocalStorageData = () => JSON.stringify(localStorage);

  const localStorageData = ref(updateLocalStorageData());

  watch([price, quantity], () => {
    localStorageData.value = updateLocalStorageData();
  });

  const debouncedUpdateLocalStorageData = debounce(() => {
    localStorageData.value = updateLocalStorageData();
  }, 300);

  const generateId = () => '_' + Math.random().toString(36).slice(2, 11);

  const addEventToAction = (actionId: string, event: Event) => {
    const action = actions.value.find(action => action.id === actionId);
    if (action) {
      action.events.unshift(event);
    }
  };

  const addAction = () => {
    const newAction: Action = {
      id: generateId(),
      events: []
    };
    actions.value.unshift(newAction);
    return newAction.id;
  };

  const handleSubmit = () => {
    if (!price.value) price.value = 0;
    if (!quantity.value) quantity.value = 0;

    price.value = Math.abs(price.value);
    quantity.value = Math.abs(quantity.value);

    const currentData = {
      counter: counter.value + 1,
      price: price.value,
      quantity: quantity.value,
      amount: amount.value
    };

    const actionId = addAction();
    addEventToAction(actionId, {
      type: "submit",
      message: `${JSON.stringify(currentData)}`,
      timestamp: new Date()
    });

    setTimeout(() => {
      const success = amount.value % 2 === 0;
      const response = success ? "{success: true}" : "{success: false}";
      addEventToAction(actionId, {
        type: "response",
        message: `${response}`,
        timestamp: new Date()
      });

      const action = actions.value.find(action => action.id === actionId);
      if (action) {
        action.success = success;
      }

      if (success) {
        counter.value++;
        localStorage.setItem("counter", currentData.counter.toString());
        localStorage.setItem("price", currentData.price.toString());
        localStorage.setItem("quantity", currentData.quantity.toString());
        localStorage.setItem("amount", currentData.amount.toString());
        localStorageData.value = updateLocalStorageData();
      }

      addEventToAction(actionId, {
        type: "storage",
        message: `${updateLocalStorageData()}`,
        timestamp: new Date()
      });
    }, 1000);
  };

  watch([price, quantity, counter], debouncedUpdateLocalStorageData);

  return {
    price,
    quantity,
    amount,
    actions,
    localStorageData,
    handleSubmit,
  };
}