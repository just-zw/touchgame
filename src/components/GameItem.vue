<template>
  <div class="showitem" @click="handleSelected">
    <div :style="{background:bgcolor}" :class="{ 'selected': config.selected }"></div>
  </div>
</template>

<script>
  export default {
    name: "GameItem",
    data() {
      return {
        colors: [
          'yellow',
          'red',
          'blue',
          'black',
          'cyan'
        ],
      };
    },
    props: {
      config: {
        type: Object, // 要有：{ x, y, selected, type }
        required: true
      },
    },
    computed: {
      bgcolor() {
        return this.colors[this.config.type];
      }
    },
    methods: {
      handleSelected() {
        this.$emit('select', this.config)
      }
    }
  }
</script>

<style scoped>
.showitem, .showitem div {
  width: 50px;
  height: 50px;
  border-radius: 10px;
}
.showitem .selected {
  transform: scale(0.8);
}
</style>