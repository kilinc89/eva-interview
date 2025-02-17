<template>
  <form @submit.prevent="handleSubmit">
    <label>Email</label>
    <input v-model="email" type="text" />

    <label>Password</label>
    <input v-model="password" type="password" />

    <button type="submit">Login</button>
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
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 8px;
}

button {
  padding: 10px;
  background: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background: #45a049;
}
</style> 