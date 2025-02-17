<template>
  <div class="login-container">
    <h2>Login</h2>
    <LoginForm @login="onLogin" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import LoginForm from '../components/LoginForm.vue'

export default defineComponent({
  components: { LoginForm },

  setup() {
    const router = useRouter()
    const store = useStore()

    const onLogin = async (credentials: { email: string; password: string }) => {
      const success = await store.dispatch('auth/login', credentials)

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
</style>
  