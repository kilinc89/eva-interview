<template>
  <div>
    <p>Store ID: {{ storeId }}</p>
    <p>Marketplace: {{ marketplaceName }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    storeId: String,
    marketplaceName: String
  }
})
</script> 