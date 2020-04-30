<template>
  <div class="app">
    <div v-if="!playInConsole">
      <titles>
        <div class="mid" slot="mid">
          <span class="left">得分</span>
          <span class="right">{{scored}}</span>
        </div>
      </titles>
      <GameContainer @showc='show' />
    </div>
    <div>
      <ul>
        <li>window: F12打开命令行</li>
        <li>macos: cmd + j(Chrome) / cmd + k(Firefox)打开命令行</li>
      </ul>
      <p>游玩中请确保鼠标焦点在页面内。不知道怎么做？可以<button>点我一下</button></p>
    </div>
  </div>
</template>

<script>
  import GameContainer from "./components/GameContainer"
  import titles from "./components/titles"
  import ConsoleGame from './console/ConsoleGame'
  import TripleGameEventHander from './console/eventHandler/TripleGameEventHander'
  import TripleGame from './core/TripleGame'

  export default {
    name: "App",
    components: {
      GameContainer,
      titles
    },
    data() {
      return {
        scored: 0,
        playInConsole: true
      };
    },
    methods:{
      show(def){    
        this.scored=def
      }
    },
    created() {
      if (this.playInConsole) {
        const x = 10
        const y = 10
        const maxType = 5
        new ConsoleGame(
          new TripleGame(x, y, maxType),
          new TripleGameEventHander(x, y)
        ).run()
      }
    }
  };
</script>

<style scoped>
@import "./assets/css/normalize.css";
.app {
  background: gray;
  background-size: 100%;
}
.mid {
  line-height: 48px;
  color: aliceblue;
  font-size: 30px;
}
.right {
  margin-left: 60%;
}
</style>
