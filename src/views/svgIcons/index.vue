<template>
    <div class="svg-icons">
        <el-row :gutter="20">
            <el-col :span="4" v-for="item in svgs" :key="item">
                <div class="box-svg">
                    <svg-icon class="svg" :svg-name="item" />
                    <div class="svg-name">{{ item }}</div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon'

export default {
    name: 'SvgIcons',
    components: {
        SvgIcon
    },
    data () {
        return {
            svgs: [
                'catCenter-on', 'catCenter-off', 'detailData-on', 'detailData-off',
                'gameManagement-on', 'gameManagement-off', 'manageCenter-on', 'manageCenter-off',
                'memberManage-on', 'memberManage-off', 'menuHome-on', 'menuHome-off',
                'notice-on', 'notice-off', 'playerManage-on', 'playerManage-off',
                'profile-on', 'profile-off', 'settleCenter-on', 'settleCenter-off',
                'statistics-on', 'statistics-off',
                'collapse', 'dangerous', 'ali-pay', 'close',
                'download', 'icon-cash', 'icon-cat-point', 'icon-eyes-close',
                'icon-eyes-open', 'open', 'state'
            ]
        }
    }
}
</script>

<style lang="less" scoped>
.svg-icons {
    text-align: center;
    .box-svg {
        display: inline-block;
        width: 120px;
        height: 120px;
        .svg {
            width: 80px;
            height: 80px;
        }
        .svg-name {
            font-size: 16px;
            font-weight: 600;
        }
    }
}
</style>
