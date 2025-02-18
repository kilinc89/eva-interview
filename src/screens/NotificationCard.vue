<template>
  <Transition name="notification">
    <div v-if="show" :class="['fixed top-5 right-5 p-4 rounded-lg shadow-lg text-white z-50', typeClasses]">
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

    const typeClasses = computed(() => {
      switch (store.state.notification.type) {
        case 'success':
          return 'bg-green-500';
        case 'error':
          return 'bg-red-500';
        case 'warning':
          return 'bg-yellow-500';
        case 'info':
          return 'bg-blue-500';
        default:
          return 'bg-gray-500';
      }
    });

    return {
      show: computed(() => store.state.notification.show),
      message: computed(() => store.state.notification.message),
      typeClasses
    }
  }
})
</script>

<style scoped>
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