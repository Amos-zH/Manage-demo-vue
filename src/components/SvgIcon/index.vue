<!-- svg组件 -->
<template>
    <svg class="svg-icon" :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName" />
    </svg>
</template>

<script>
export default {
    name: 'SvgIcon',
    props: {
        // svg 的名称
        svgName: {
            type: String,
            required: true
        }
    },
    computed: {
        iconName () {
            return `#icon-${this.svgName}`
        },
        svgClass () {
            if (this.svgName) {
                return 'svg-icon-' + this.svgName
            } else {
                return ''
            }
        }
    }
}
</script>

<style lang="less" scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
