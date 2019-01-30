export default (rule, value, callback, source, options) => {
  let errors = []
  if (value) {
    let valNumber = +value
    if (isNaN(valNumber) || !(/^-?\d+$/.test(String(valNumber)))) {
      errors.push(rule.message || '请输入正确的整数值')
    }
  }
  callback(errors)
}
