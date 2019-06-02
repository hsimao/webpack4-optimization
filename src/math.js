import _ from 'lodash'

export function add(a, b) {
  return a + b
}

export function minus(a, b) {
  return a - b
}

export function multiply(a, b) {
  return a * b
}

export function division(a, b) {
  return a / b
}

export function joinString() {
  return _.join(['CHEN', 'Mars', '--'])
}
