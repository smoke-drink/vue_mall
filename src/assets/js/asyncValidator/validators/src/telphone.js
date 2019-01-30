export default (rule, value, callback, source, options) => {
  let errors = []
  if (value && !/^(\d{3}-)(\d{8})$|^(\d{4}-)(\d{7})$|^(\d{4}-)(\d{8})$/.test(value)) {
    errors.push(rule.message || '请输入正确的电话号码')
  }
  callback(errors)
}
