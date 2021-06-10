<template>
  <el-dialog
    title="修改密码"
    :visible.sync="dialogVisible"
    width="20%"
    class="change-pwd"
  >
    <ValidationObserver ref="pwdObserver" v-slot="{ passes }">
      <el-form ref="pwdForm" :model="pwdForm" label-width="auto">
        <ValidationProvider
          rules="required|alpha_num|min:6|max:6"
          name="原密码"
          v-slot="{ errors }"
        >
          <el-form-item
            :error="errors[0]"
            label="原密码"
            prop="oldPwd"
            inline-message
          >
            <el-input
              v-model="pwdForm.oldPwd"
              placeholder="6位密码"
              type="password"
              show-password
              clearable
              autocomplete="off"
            />
          </el-form-item>
        </ValidationProvider>
        <ValidationProvider
          rules="required|alpha_num|min:6|max:6"
          name="新密码"
          vid="newPwd"
          v-slot="{ errors }"
        >
          <el-form-item :error="errors[0]" label="新密码" prop="newPwd">
            <el-input
              v-model="pwdForm.newPwd"
              placeholder="6位密码"
              type="password"
              show-password
              clearable
              autocomplete="off"
            />
          </el-form-item>
        </ValidationProvider>
        <ValidationProvider
          rules="required|alpha_num|min:6|max:6|confirmed:newPwd,新密码"
          name="重复密码"
          v-slot="{ errors }"
        >
          <el-form-item :error="errors[0]" label="重复密码" prop="rePwd">
            <el-input
              v-model="pwdForm.rePwd"
              placeholder="6位密码"
              type="password"
              show-password
              clearable
              autocomplete="off"
            />
          </el-form-item>
        </ValidationProvider>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="passes(onSubmit)">确 定</el-button>
      </div>
    </ValidationObserver>
  </el-dialog>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { removeToken } from '@/utils/auth'

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value (val) {
      this.dialogVisible = val
      this.$nextTick(() => {
        // 重置表单值
        this.$refs.pwdForm.resetFields()
        // 重置表单验证状态
        this.$refs.pwdObserver.reset()
      })
    },
    dialogVisible (val) {
      this.$emit('input', val)
    }
  },
  data () {
    return {
      pwdForm: {},
      dialogVisible: this.value
    }
  },
  methods: {
    onSubmit () {
      const params = {
        ...this.pwdForm
      }
      this.$apis.changePwd(params).then(res => {
        if (res.code === '000') {
          res.data && this.$message.success('修改密码成功！')
          this.dialogVisible = false
          // 登出
          // 去除token和用户信息
          removeToken()
          this.$store.commit('user/REMOVE_USER_INFO')
          // 跳转登录页
          this.$router.replace('/login')
        } else {
          this.$message.error(res.message)
        }
      }).catch(error => {
        error.message && this.$message.error(error.message)
      })
    }
  }
}
</script>
