<template>
  <div class="piper-slider">
    <div class="piper-swiper" :style="{height: xheight}">
      <slot></slot>
      <div class="piper-swiper-item" v-for="(item, index) in list" @click="clickListItem(item)" :data-index="index">
        <a href="javascript:">
          <div class="piper-img" :style="{backgroundImage: buildBackgroundUrl(item.img)}"></div>
          <p class="piper-swiper-desc" v-if="showDescMask">{{item.title}}</p>
        </a>
      </div>
    </div>
    <div :class="[dotsClass, 'piper-indicator', 'piper-indicator-' + dotsPosition]" v-show="showDots">
      <a href="javascript:" v-for="key in length">
        <i class="piper-icon-dot" :class="{'active': key - 1 === current}"></i>
      </a>
    </div>
  </div>
</template>

<script>
import Swiper from './swiper'

export default {
  mounted () {
    this.$nextTick(function () {
      if (!(this.list && this.list.length === 0)) {
        this.render()
      }
      this.xheight = this.getHeight()
    })
  },
  methods: {
    clickListItem (item) {
      //window.location.href = ''
      this.$emit('on-click-list-item', JSON.parse(JSON.stringify(item)))
    },
    buildBackgroundUrl (url) {
      return `url(${url})`
    },
    render () {
      this.swiper && this.swiper.destroy()
      this.swiper = new Swiper({
        container: this.$el,
        direction: this.direction,
        auto: this.auto,
        loop: this.loop,
        interval: this.interval,
        threshold: this.threshold,
        duration: this.duration,
        height: this.height || this._height,
        minMovingDistance: this.minMovingDistance,
        imgList: this.imgList
      })
      .on('swiped', (prev, index) => {
        this.current = index % this.length
        //this.index = index % this.length
      })
    },
    rerender () {
      if (!this.$el) {
        return
      }
      this.$nextTick(() => {
        //this.index = 0
        this.current = 0
        this.length = this.list.length || this.$children.length
        this.destroy()
        this.render()
      })
    },
    destroy () {
      this.swiper && this.swiper.destroy()
    },
    getHeight () {
      // when list.length > 0, it's better to set height or ratio
      const hasHeight = parseInt(this.height, 10)
      if (hasHeight) return this.height
      if (!hasHeight) {
        if (this.aspectRatio) {
          return this.$el.offsetWidth * this.aspectRatio + 'px'
        }
        return '180px'
      }
    }
  },
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    },
    direction: {
      type: String,
      default: 'horizontal'
    },
    showDots: {
      type: Boolean,
      default: true
    },
    showDescMask: {
      type: Boolean,
      default: true
    },
    dotsPosition: {
      type: String,
      default: 'right'
    },
    dotsClass: String,
    auto: {
      type: Boolean,
      default: false
    },
    loop: Boolean,
    interval: {
      type: Number,
      default: 3000
    },
    threshold: {
      type: Number,
      default: 50
    },
    duration: {
      type: Number,
      default: 300
    },
    height: {
      type: String,
      default: 'auto'
    },
    aspectRatio: Number,
    minMovingDistance: {
      type: Number,
      default: 0
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      current: this.index,
      xheight: 'auto',
      length: this.list.length
    }
  },
  watch: {
    list (val) {
      this.rerender()
    },
    current (currentIndex) {
      this.$emit('on-index-change', currentIndex)
    },
    index (val) {
      if (val !== this.current) {
        this.$nextTick(() => {
          this.swiper.go(val)
        })
      }
    }
  },
  beforeDestroy () {
    this.destroy()
  }
}

</script>

<style lang="less">
@pre: piper;

.@{pre}-slider {
  overflow: hidden;
  position: relative;

  > .@{pre}-indicator, .@{pre}-indicator-right {
    position: absolute;
    right: 10px;
    bottom: 10px;

    > a {
      float: left;
      margin-left: 6px;

      > .@{pre}-icon-dot {
        display: inline-block;
        vertical-align: middle;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background-color: rgba(255,255,255,0.7);
      }
      > .@{pre}-icon-dot.active {
        background-color: #20a0ff;
      }

    }
  }

  > .@{pre}-indicator-center {
    right: 50%;
    transform: translateX(50%)
  }

  > .@{pre}-indicator-left {
    left: 15px;
    right: auto;
  }

  > .@{pre}-swiper {
    overflow: hidden;
    position: relative;

    > .@{pre}-swiper-item {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
        max-width: 100%;
        display: block;
      }

      > a {
        display: block;
        width: 100%;
        height: 100%;

        > .@{pre}-img {
          display: block;
          width: 100%;
          height: 100%;
          background: center center no-repeat;
          background-size: cover;
        }

        > .@{pre}-swiper-desc {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1.4em;
          font-size: 16px;
          padding: 20px 50px 12px 13px;
          margin: 0;
          background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, .7) 100%);
          color: #fff;
          text-shadow: 0 1px 0 rgba(0, 0, 0, .5);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
        }

      }
    }
  }
}
</style>
