<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700">Email</label>
      <input v-model="email" type="text" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Password</label>
      <input v-model="password" type="password" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
    </div>

    <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      Login
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  emits: ['login'],
  setup(_, { emit }) {
    const email = ref('homework@eva.guru')
    const password = ref('Homeworkeva1**')

    const handleSubmit = () => {
      emit('login', { email: email.value, password: password.value })
    }

    return {
      email,
      password,
      handleSubmit
    }
  }
})
</script>

<style scoped>
/* No additional styles needed as Tailwind handles styling */
</style> 