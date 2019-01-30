export function generalBtn(h, text, callback, opts = {}) {
  opts = Object.assign({
    type: 'primary',
    style: {}
  }, opts)
  return h('Button', {
    props: {
      type: opts.type,
      size: 'small'
    },
    class: 'mr5',
    style: opts.style,
    on: {
      click: callback
    }
  }, text)
}
