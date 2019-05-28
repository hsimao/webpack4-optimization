async function getComponent() {
  const { default: _ } = await import(/* webpackChunkName: "lodash" */ 'lodash')
  const element = document.createElement('div')
  element.innerHTML = _.join(['Hsi', 'Mao'], '-')
  return element
}

document.addEventListener('click', () => {
  getComponent().then(el => {
    document.body.appendChild(el)
  })
})
