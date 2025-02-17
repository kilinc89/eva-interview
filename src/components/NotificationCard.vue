<template>
  <Transition name="notification">
    <div v-if="show" :class="['notification', type]">
      {{ message }}
    </div>
  </Transition>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()

    return {
      show: computed(() => store.state.notification.show),
      message: computed(() => store.state.notification.message),
      type: computed(() => store.state.notification.type)
    }
  }
})
</script>

<style scoped>
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 20px;
  border-radius: 4px;
  color: white;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.success {
  background-color: #4caf50;
}

.error {
  background-color: #f44336;
}

.warning {
  background-color: #ff9800;
}

.info {
  background-color: #2196f3;
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style> 