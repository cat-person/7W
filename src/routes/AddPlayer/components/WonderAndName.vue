<template>
    <div id="WonderAndName">
      <div class="radio-group">
        <div class="radio-group" v-for="(name, index) in wonders" :key="index">
          <label>
            <input type="radio" :value=name v-model="selectedWonder" />
            {{name}}
          </label>
        </div>
      </div>
      <div class="radio-group">
        <div  v-for="(name, index) in sides" :key="index">
          <label>
            <input type="radio" :value=name v-model="selectedSide" />
            {{name}}
          </label>
        </div>
      </div>
      <p>Selected Option: {{ selectedWonder }}: {{ selectedSide }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        wonders: [
          "A", "V", "C", "S", "G", "Q", "E"
        ],
        sides: [
          "A", "B"
        ],
        selectedWonder: '',
        selectedSide: ''
      };
    }
  };
  </script>
  
  <style>
  #app {
    text-align: center;
    margin: 20px;
  }
  
  .radio-group {
    margin: 20px;
    display: flex;
    flex-direction: row;
    background-color: brown;
  }
  
  .radio-group label {
    margin-right: 20px; /* Space between radio buttons */
  }
  </style>