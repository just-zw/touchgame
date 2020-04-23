<template>
  <div class="showitem" @click="handleSelected">
    <img :src="imgSrc" alt />
  </div>
</template>

<script>
  export default {
    name: "GameItem",
    data() {
      return {
        imgs: [
          "http://a0.att.hudong.com/27/10/01300000324235124757108108752.jpg",
          "http://a0.att.hudong.com/27/10/01300000324235124757108108752.jpg",
          "http://a0.att.hudong.com/27/10/01300000324235124757108108752.jpg",
          "http://a0.att.hudong.com/27/10/01300000324235124757108108752.jpg",
          "http://a0.att.hudong.com/27/10/01300000324235124757108108752.jpg",
          "http://a0.att.hudong.com/27/10/01300000324235124757108108752.jpg"
        ],
        index: 0,
        startx: 0,
        starty: 0,
        endx: 0,
        endy: 0,
        positionx: 0,
        positiony: 0,
        finalx: 0,
        finaly: 0,
        box: null,
        flatx: 0,
        flaty: 0
      };
    },
    props: {
      config: {
        type: Object, // 要有：{ x, y, selected, type }
        required: true
      },
    },
    computed: {
      imgSrc() {
        return this.imgs[this.config.type];
      }
    },
    methods: {
      handleSelected() {
        this.$emit('select', this.config)
      }
      // 不要那么多事件，交换逻辑交给父组件
    //   start(e) {
    //     /* console.log(this.indexs); */

    //     this.box = document.querySelectorAll(".showitem")[this.indexs];

    //     this.box.style.zIndex = "99";
    //     this.positionx = this.box.offsetLeft - this.indexs * this.box.offsetWidth;
    //     this.positiony = this.box.offsetTop - 48;
    //     this.startx = e.targetTouches[0].pageX;
    //     this.starty = e.targetTouches[0].pageY;
    //   },
    //   move(e) {
    //     this.endx = e.targetTouches[0].pageX;
    //     this.endy = e.targetTouches[0].pageY;

    //     this.finalx = this.endx - this.startx + this.positionx;
    //     this.finaly = this.endy - this.starty + this.positiony;
    //     /*  console.log(this.endy); */

    //     /*  console.log(this.box.offsetHeight); */

    //     /*  console.log(this.finaly);  */
    //     this.decide();
    //     /*  console.log(this.finaly); */
    //     /* console.log(this.finalx)  */
    //     this.box.style.top = this.finaly + "px";
    //     this.box.style.left = this.finalx + "px";
    //     /*     console.log(this.finaly);
    //   console.log(this.finalx); */
    //   },
    //   endmove() {
    //     this.endmovedecived();
    //     this.$emit("change", this.flatx, this.flaty);
    //     this.box.style.top = this.finaly + "px";
    //     this.box.style.left = this.finalx + "px";
    //   },
    //   decide() {
    //     if (this.endx - this.startx > 0) {
    //       if (Math.abs(this.endx - this.startx) > this.box.offsetWidth) {
    //         this.finalx = this.box.offsetWidth + this.positionx;
    //       }
    //     } else {
    //       if (Math.abs(this.endx - this.startx) > this.box.offsetWidth) {
    //         this.finalx = -this.box.offsetWidth + this.positionx;
    //       }
    //     }

    //     if (this.endy - this.starty > 0) {
    //       if (Math.abs(this.endy - this.starty) > this.box.offsetHeight) {
    //         this.finaly = this.box.offsetHeight + this.positiony;
    //       }
    //     } else {
    //       if (Math.abs(this.endy - this.starty) > this.box.offsetHeight) {
    //         this.finaly = -this.box.offsetHeight + this.positiony;
    //       }
    //     }
    //     if (
    //       Math.abs(this.endx - this.startx) > Math.abs(this.endy - this.starty)
    //     ) {
    //       this.finaly = 0;
    //     } else {
    //       this.finalx = 0;
    //     }

    //     if (this.box.offsetTop - 48 < 0) {
    //       this.finaly = 0;
    //     }
    //     if (this.box.offsetLeft < 0) {
    //       /*    console.log(this.box.offsetLeft); */

    //       this.finalx = 0;
    //     }
    //   },
    //   endmovedecived() {
    //     if (this.endx - this.startx > 0) {
    //       if (Math.abs(this.endx - this.startx) > this.box.offsetWidth / 3) {
    //         this.finalx = this.box.offsetWidth + this.positionx;
    //         this.flatx = 1;
    //         console.log(this.flatx);
    //       } else {
    //         this.finalx = this.positionx;
    //         this.flatx = 0;
    //       }
    //     } else {
    //       if (Math.abs(this.endx - this.startx) > this.box.offsetWidth / 3) {
    //         this.finalx = -this.box.offsetWidth + this.positionx;
    //         this.flaty = 1;
    //       } else {
    //         this.finalx = this.positionx;
    //         this.flaty = 0;
    //       }
    //     }

    //     if (this.endy - this.starty > 0) {
    //       if (Math.abs(this.endy - this.starty) > this.box.offsetHeight / 3) {
    //         this.finaly = this.box.offsetHeight + this.positiony;
    //       } else {
    //         this.finaly = this.positiony;
    //       }
    //     } else {
    //       if (Math.abs(this.endy - this.starty) > this.box.offsetHeight / 3) {
    //         this.finaly = -this.box.offsetHeight + this.positiony;
    //       } else {
    //         this.finaly = this.positiony;
    //       }
    //     }
    //     if (this.box.offsetTop - 48 < 0) {
    //       this.finaly = 0;
    //     }
    //     if (this.box.offsetLeft < 0) {
    //       /*    console.log(this.box.offsetLeft); */

    //       this.finalx = 0;
    //     }
    //   }
    }
  }
</script>

<style scoped>
.showitem, .showitem img {
  width: 50px;
  height: 50px;
  border-radius: 10px;
}
</style>