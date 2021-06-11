<template>
  <div class="app">
    <notifications position="top left"/>
    <router-view></router-view>
    <vue-confirm-dialog></vue-confirm-dialog>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
    
  }
}
</script>
