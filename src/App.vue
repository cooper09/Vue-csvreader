<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <CSVReader v-model="csv" :map-fields="['columnA', 'columnB', 'columnC']"/>
  </div>
</template>

<script>
import CSVReader from '@/components/CSVReader.vue'

export default {
  name: 'app',
  components: {
    CSVReader
  },
  data() {
    return {
      csv: null,
    };
  }//end data
}//end export
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
