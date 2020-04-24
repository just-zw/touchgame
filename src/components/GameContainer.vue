<template>
  <div class="show">
    <!-- <div class="show" v-for="i in 10" :key="i">
      <gameshowitem v-for="(v, j) in j" :key="j" :indexs="j" @change="itemchange"></gameshowitem>
    </div> -->
    <div class="row" v-for="(row, i) in tripleGame.y" :key="i">
      <div class="row" v-for="(cell, j) in tripleGame.x" :key="j">
        <GameItem :config="tripleGame.itemMatrix[j][i]" @select="handleItemSelected(arguments)"/>
      </div>
    </div>
  </div>
</template>

<script>
  import GameItem from './GameItem';
  import TripleGame from '../core/TripleGame'
  export default {
    name: 'GameContainer',
    components: {
      GameItem
    },
    data() {
      return {
        tripleGame: new TripleGame(5, 5, 5).init(),
        selectedItem: null,
      };
    },
    
  /*   computed: {
      totalScore() {
        return this.tripleGame.getScore()
      }
    }, */
    methods: {
      handleItemSelected(items) { 
        
        
        let item=items[0];
        let event=items[1];
       /*  let count=0; */
        if (!this.selectedItem) {
        console.log(event);
       /*  count++ */
         event.path[2].setAttribute('class','touchstyle')
          
          this.selectedItem = item
          this.$set(item, 'selected', true)
          return
        }
        if (this.selectedItem === item) {
          this.selectedItem = null
          this.$set(item, 'selected', false)
          event.path[2].setAttribute('class','touchstyle')
        /*   count++ */
          return
        }
        if (TripleGame.isNeighbor(this.selectedItem, item)) {
          // 执行交换
          const selectedItem = this.selectedItem
          this.selectedItem = null
          this.$set(item, 'selected', false)
          this.tripleGame.swapItem(selectedItem, item,this)
          /* let score=this.tripleGame.getScore() */
          this.$emit('showc',this.tripleGame.getScore())
        /*   swap(selectedItem) */
       /*  this.tripleGame.swap(selectedItem.x,selectedItem.y,item.x,item.y) */
        }
     /*    if(count>=2){

        } */
      }
      // itemchange(flatx, flaty) {
      //   console.log(flatx);
      //   console.log(flaty);
      // }
    },
    created() {
      window.ga = this.tripleGame
    }
  };
</script>

<style scoped>
.touchstyle{
  transform: scale(0.8);
}
.show {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}
</style>