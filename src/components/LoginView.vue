<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="onLogin">
        <label>Email</label>
        <input v-model="email" type="text" />
  
        <label>Password</label>
        <input v-model="password" type="password" />
  
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  
  export default defineComponent({
    setup() {
      const router = useRouter()
      const store = useStore()
      
      const email = ref('homework@eva.guru')
      const password = ref('Homeworkeva1**')

      const onLogin = async () => {
        const success = await store.dispatch('auth/login', {
          email: email.value,
          password: password.value
        })

        if (success) {
          store.dispatch('notification/showNotification', {
            message: 'Login successful!',
            type: 'success'
          })
          router.push('/dashboard')
        } else {
          store.dispatch('notification/showNotification', {
            message: 'Login failed. Please check your credentials.',
            type: 'error'
          })
        }
      }

      return {
        email,
        password,
        onLogin
      }
    }
  })
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
  }

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
  