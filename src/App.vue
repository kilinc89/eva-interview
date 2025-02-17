<template>
  <div>
    <nav class="p-4 bg-gray-800 text-white">
      <router-link to="/" class="mr-4">Home</router-link>
      <router-link to="/about" class="mr-4">About</router-link>
      <router-link to="/contact" class="mr-4">Contact</router-link>
    </nav>
    <NotificationCard />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NotificationCard from './components/NotificationCard.vue'

export default defineComponent({
  name: 'App',
  components: {
    NotificationCard
  }
})
</script>
