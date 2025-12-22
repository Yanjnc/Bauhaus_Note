<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Helvetica Neue', 'Arial', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #1A1A1A;
  height: 100vh;
}
  body{
    margin: 0px;
    overflow-x: hidden;
    background-color: #F2F2F2;
  }
</style>
