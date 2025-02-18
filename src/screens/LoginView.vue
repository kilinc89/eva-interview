<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>
      <LoginForm @login="onLogin" />
    </div>
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
/* No additional styles needed as Tailwind handles styling */
</style>
  