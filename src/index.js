import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'

class App extends Component {
  render() {
    return (
      <div>
        <div className="hello">This is App</div>
      </div>
    )
  }

  componentDidMount() {
    $('.hello').css('color', 'red')
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
