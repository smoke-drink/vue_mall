import date from 'iview/src/utils/date'
import Vue from 'vue'

const watchDateRange = (modelOrFn, beginName, endName, formatter = 'yyyy-MM-dd HH:mm:ss') => {
  return function (val) {
    val = val || []
    let begin = val[0]
    let end = val[1]
    let model = modelOrFn
    if (typeof model === 'function') {
      model = modelOrFn()
    }
    Vue.set(model, beginName, begin ? date.format(begin, formatter) : '')
    Vue.set(model, endName, end ? date.format(end, formatter) : '')
  }
}

const watchDate = (modelOrFn, dateName, formatter = 'yyyy-MM-dd HH:mm:ss') => {
  return function (val) {
    let model = modelOrFn
    if (typeof model === 'function') {
      model = modelOrFn()
    }
    Vue.set(model, dateName, val ? date.format(val, formatter) : '')
    console.log('model', model)
  }
}

const watchDateRangeToTimestamp = (modelOrFn, beginName, endName) => {
  return function (val) {
    val = val || []
    let begin = val[0]
    let end = val[1]
    let model = modelOrFn
    if (typeof model === 'function') {
      model = modelOrFn()
    }
    Vue.set(model, beginName, begin ? begin.getTime() : '')
    Vue.set(model, endName, end ? end.getTime() : '')
  }
}

const watchDateToTimestamp = (modelOrFn, dateName) => {
  return function (val) {
    let model = modelOrFn
    if (typeof model === 'function') {
      model = modelOrFn()
    }
    Vue.set(model, dateName, val ? val.getTime() : '')
  }
}

const getDatePickerShortcuts = (days = [7, 30, 90]) => {
  return days.map(day => {
    return {
      text: `近${day}天`,
      value() {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * day)
        return [start, end]
      }
    }
  })
}

const msToDate = (msN, formatN) => {
  let ms = msN
  let format = formatN || 'yyyy-MM-dd hh:mm:ss'
  if (!ms) {
    return ''
    // }else if (ms.toString().length === 10) {
    //   ms *= 1000
  }
  const d = new Date(ms)
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  const hour = d.getHours()
  const minute = d.getMinutes()
  const seconds = d.getSeconds()

  const addPrefix = source => (source < 10 ? `0${source}` : source)

  format = format.replace('yyyy', year)
    .replace('MM', addPrefix(month))
    .replace('dd', addPrefix(day))
    .replace('hh', addPrefix(hour))
    .replace('mm', addPrefix(minute))
    .replace('ss', addPrefix(seconds))

  return format
}

export {
  watchDateRange,
  watchDate,
  watchDateRangeToTimestamp,
  watchDateToTimestamp,
  msToDate,
  date,
  getDatePickerShortcuts
}
