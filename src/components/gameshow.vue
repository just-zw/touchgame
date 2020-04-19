<template>
  <div class="gameshow">

<div class="show" v-for="i in 10" :key="i">
<gameshowitem v-for="(v,i) in 8" :key="i" :indexs="i" @change="itemchange"></gameshowitem>
</div>
  </div>
</template>

<script>
import gameshowitem from './gameshowitem';
export default {
  data(){
    return{
scored:0
    }
  }
,
components:{
  gameshowitem
},
methods:{
itemchange(flatx,flaty){
console.log(flatx);
console.log(flaty);
}
}
}
</script>

<style scoped>
.gameshow{
 
}
.show{
  display: flex;
  width: 100%;
}
</style>