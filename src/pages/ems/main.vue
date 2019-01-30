<template>
  <transition mode="out-in"
              enter-active-class="fadeInUp"
              leave-active-class="fadeOutDown">
    <router-view class="animated" />
  </transition>
</template>

<script>
export default {

}
</script>
<style lang="scss">
  @import '@/assets/css/ems/index.scss'
</style>
