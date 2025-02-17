<template>
  <div>
    <NotificationCard />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NotificationCard from './screens/NotificationCard.vue'

export default defineComponent({
  name: 'App',
  components: {
    NotificationCard
  }
})
</script>
