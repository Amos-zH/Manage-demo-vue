import { extend, configure } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules' // 导入vee-validate内置的校验规则
import cn from 'vee-validate/dist/locale/zh_CN' // 导入这些规则的默认消息提示

// 配置vee-validate
configure({
  classes: {
    valid: 'is-valid', // one class
    invalid: 'is-invalid' // multiple classes
  }
})

// 导入所有内置的校验规则
/*
参考 https://baianat.github.io/vee-validate/api/rules.html
alpha           只能包含英文
alpha_dash      只能包含英文，数字，短划线或下划线
alpha_num       只能包含英文或数字
alpha_spaces    只能包含英文或空格
between:{min},{max}     数字只能是介于min和max
confirmed:{target}      验证字段必须与target具有相同的值
digits:{length}         验证字段必须为数字且具有指定的位数
dimensions:{width},{height}     添加到验证字段中的文件必须是具有指定尺寸的图像
email           必须邮件格式
ext             验证字段中的文件必须具有指定的扩展名之一，例如：ext:jpg,png,bmp,svg
image           验证字段中的文件必须具有图像mime类型（image / *）
oneOf           验证字段必须具有指定列表中的值。使用双等于，例如：oneOf:1,2,3
is:{value}      验证字段必须等于传递的第一个参数，===用于相等性检查。当以对象形式使用时，此规则对于确认密码很有用
max:{length}    验证长度下的字段不得超过指定的长度
max_value:{max}         验证字段必须是数字值，且不得大于指定值
mimes           验证字段中的文件类型应具有指定的mime类型之一，例如：mimes:image/*
min:{length}    验证长度下的字段不应小于指定的长度
min_value:{min}         验证字段必须是数字值，且不得小于指定值
numeric         验证字段必须仅包含数字
regex           验证字段必须与指定的正则表达式匹配
required        验证字段必须具有非空值，这些空值：空字符串，undefined，null，空数组
required_if     仅当目标字段（第一个参数）设置为指定值之一（其他参数）时，验证字段才必须具有非空值
size            添加到验证字段的文件大小不得超过指定的大小（以KB为单位）
*/
for (const rule in rules) {
  extend(rule, {
    ...rules[rule], // add the rule
    message: cn.messages[rule] // add its message
  })
}

// {_field_} 这是字段名称，{_value_} 这是字段值，{_rule_} 这是规则名称

// 自定义内置的校验规则错误消息
extend('required', {
  validate: value => !!value, // the validation function
  message: '{_field_}不能为空' // the error message
})
extend('confirmed', { // 修改内置confirmed规则支持多传一个参数表明目标字段名，错误文案也修改
  validate (value, args) {
    return String(value) === String(args.targetValue)
  },
  params: [
    {
      name: 'targetValue',
      isTarget: true
    },
    {
      name: 'targetName'
    }
  ],
  message: (fieldName, placeholders) => {
    const errorTxt = placeholders.targetName ? `${fieldName} 与 ${placeholders.targetName} 不一致` : `${fieldName} 不能和 ${placeholders.targetValue} 匹配`
    return errorTxt
  }
})

// 自定义规则
extend('noCN', { // 不能包含中文
  validate: value => {
    return !/[\u4e00-\u9fa5]/.test(value)
  },
  message: '{_field_}不能包含中文字符'
})
