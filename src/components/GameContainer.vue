<template>
  <div v-if="tripleGame.itemMatrix.length" class="show">
    <div class="row" v-for="(row, i) in Config.y" :key="i">
      <div class="row" v-for="(cell, j) in Config.x" :key="j">
        <GameItem :config="tripleGame.itemMatrix[j][i]" @select="handleItemSelected"/>
      </div>
    </div>
  </div>
</template>

<script>
  import GameItem from './GameItem';
  import TripleGame from '../core/TripleGame'

  const Config = {
    x: 5,
    y: 5,
    maxColor: 5
  }

  export default {
    name: 'GameContainer',
    components: {
      GameItem
    },
    data() {
      return {
        Config,
        matrix: [],

        tripleGame: new TripleGame(Config.x, Config.y, Config.maxColor).init(),
      };
    },
    
    methods: {
      handleItemSelected(item) { 
        this.tripleGame.select(item)
        this.$emit('showc', this.tripleGame.getScore())
      }
    },
    created() {
      window.ga = this.tripleGame
    }
  };
</script>

<style scoped>
.show {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}
</style>