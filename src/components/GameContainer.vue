<template>
  <div class="show">
    <!-- <div class="show" v-for="i in 10" :key="i">
      <gameshowitem v-for="(v, j) in j" :key="j" :indexs="j" @change="itemchange"></gameshowitem>
    </div> -->
    <div class="row" v-for="(row, i) in tripleGame.y" :key="i">
      <div class="row" v-for="(cell, j) in tripleGame.x" :key="j">
        <GameItem :config="tripleGame.itemMatrix[j][i]" @select="handleItemSelected"/>
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
    
    computed: {
      totalScore() {
        return this.tripleGame.getScore()
      }
    },
    methods: {
      handleItemSelected(item) {
        if (!this.selectedItem) {
          console.log(1);
          
          this.selectedItem = item
          this.$set(item, 'selected', true)
          return
        }
        if (this.selectedItem === item) {
          this.selectedItem = null
          this.$set(item, 'selected', false)
          return
        }
        if (TripleGame.isNeighbor(this.selectedItem, item)) {
          // 执行交换
          const selectedItem = this.selectedItem
          this.selectedItem = null
          this.$set(item, 'selected', false)
      
          console.log(2);
          
          this.tripleGame.swapItem(selectedItem, item,this)
        /*   swap(selectedItem) */
        this.tripleGame.swap()
        }
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
.gameshow {
}
.show {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}
</style>