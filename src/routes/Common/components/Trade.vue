<template>
  <div id="Trade" class="trade">
    <h3>Trade</h3>
    <input v-model="tradePoints" @keypress="isNumber($event)" type="number" @input="handleTradePointsInput" @focus="$event.target.select()">
  </div>
</template>
  
  <script>
  export default {
    props: {
      points: Number
    },
    data() {
      return {
        tradePoints: this.points,
      };
    },
    methods: {
      handleTradePointsInput(){
        if (this.tradePoints) {
          this.$emit('tradePointsUpdated', this.tradePoints)
        } else {
          this.$emit("tradePointsUpdated", 0)
        }
      },
      isNumber: function(evt) {
          evt = (evt) ? evt : window.event;
          var charCode = (evt.which) ? evt.which : evt.keyCode;
          if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
              evt.preventDefault();
          } else {
              return true;
          }
      }
    }
  };
  </script>
  
<style> 
.trade {
  background-color: orange;
  justify-self: center;
  width: 96%;
  padding-bottom: 4mm;
  padding-top: 1mm;
  margin-bottom: 3mm;
}
</style>