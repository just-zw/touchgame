<template>
  <div class="app">
    <titles>
      <div class="mid" slot="mid">
        <span class="left">得分</span>
        <span class="right">{{scored}}</span>
      </div>
    </titles>
    <!-- <gameshow></gameshow> -->
    <GameContainer />
  </div>
</template>

<script>
  // import gameshow from "./components/gameshow";
  import GameContainer from "./components/GameContainer";
  import titles from "./components/titles";
  export default {
    name: "App",
    components: {
      GameContainer, // gameshow,
      titles
    },
    data() {
      return {
        scored: 0
      };
    }
  };
</script>

<style scoped>
@import "./assets/css/normalize.css";
.app {
  background: yellow;
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
