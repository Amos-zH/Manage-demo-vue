/**
 * 判断两个对象值是否相等
 * @param {Object} a 对象1
 * @param {Object} b 对象2
 * @return {Boolean} true 为相等，false 为不等
 */
export const isObjectValueEqual = (a, b) => {
  // 指向同一内存时
  if (a === b) {
    return true
  } else if ((a instanceof Object && a != null) && (b instanceof Object && b != null)) { // 判断是对象且不是null
    // 获取对象的可枚举属性。这里没有考虑obj里有NaN、Infinity和-Infinity的情况
    const aEnumerable = JSON.parse(JSON.stringify(a))
    const bEnumerable = JSON.parse(JSON.stringify(b))
    // 获取对象的所有自身属性的属性名
    const aProps = Object.getOwnPropertyNames(aEnumerable)
    const bProps = Object.getOwnPropertyNames(bEnumerable)
    if (aProps.length !== bProps.length) {
      return false
    }
    // 这里没有考虑递归对象的情况
    for (let i = 0; i < aProps.length; i++) {
      const propName = aProps[i]
      let aValue = a[propName]
      let bValue = b[propName]
      // 用来区分类似字符串'7'与‘7.0’为同一值
      if (!isNaN(Number(a[propName])) && !isNaN(Number(b[propName]))) { // 判断是否为数字字符串
        // 是数字，用Number把.0去掉再做比较
        aValue = Number(a[propName])
        bValue = Number(b[propName])
      }
      if (aValue.toString() !== bValue.toString()) {
        return false
      }
    }
  }
  return true
}
