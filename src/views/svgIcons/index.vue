<template>
  <div class="svg-icons">
    <div class="grid">
      <div class="box-svg" v-for="item in svgs" :key="item">
        <div class="center">
          <svg-icon class="svg" :svg-name="item" />
          <div class="svg-name">{{ item }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon'

export default {
  name: 'SvgIcons',
  components: {
    SvgIcon
  },
  created () {
    const req = require.context('@/assets/svgIcons/svg', false, /\.svg$/)
    this.svgs = req.keys().map(item => {
      const endIndex = item.lastIndexOf('.')
      return item.substring(2, endIndex)
    })
  },
  data () {
    return {
      svgs: [
        // 'catCenter-on', 'catCenter-off', 'detailData-on', 'detailData-off',
        // 'gameManagement-on', 'gameManagement-off', 'manageCenter-on', 'manageCenter-off',
        // 'memberManage-on', 'memberManage-off', 'menuHome-on', 'menuHome-off',
        // 'notice-on', 'notice-off', 'playerManage-on', 'playerManage-off',
        // 'profile-on', 'profile-off', 'settleCenter-on', 'settleCenter-off',
        // 'statistics-on', 'statistics-off',
        // 'collapse', 'dangerous', 'ali-pay', 'close',
        // 'download', 'icon-cash', 'icon-cat-point', 'icon-eyes-close',
        // 'icon-eyes-open', 'open', 'state'
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 120px);
  grid-gap: 10px;
  place-items: center;
  place-content: center;
}
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 100%;
}
.svg-icons {
  text-align: center;
  .box-svg {
    position: relative;
    display: inline-block;
    width: 120px;
    height: 120px;
    margin: 8px;
    .svg {
      width: 50px;
      height: 50px;
    }
    .svg-name {
      font-size: 14px;
      color: @color-primary;
      height: 40px;
      line-height: 1.5;
      text-overflow: ellipsis;
      overflow: hidden;
      word-wrap: break-word;
    }
  }
}
</style>
