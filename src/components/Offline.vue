<template>
  <div>
    <h1>You're Offline. Please check your internet connection</h1>
    <router-link to="/" @click="goBack">Go to Homepage</router-link>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    goBack: function () {
      setTimeout(() => {
        this.$emit('go-back', '')
      }, 100)
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
