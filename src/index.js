import _ from 'lodash'
import $ from  'jquery'

const dom = $('div')

dom.html(_.join(['HSI', 'Maooo']), '***')
$('body').append(dom)