<template>
  <div class="wrapper">
  </div>
</template>

<script>
  export default {
    name: 'host-context',
    components: { },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style scoped>
.wrapper{
    padding-top: 20px;
  padding-bottom: 100px;
}
</style>>
 
