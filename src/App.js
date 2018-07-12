import React, { Component } from 'react';
import './App.css';

let btns = [
  'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#'
]

let chds = [
  'Maj', 'Min', '7', 'Maj7', 'Min7'
]

class App extends Component {
  state = {
    tone: '',
    mod: ''
  }
  renderTable() {
    let board = []
    for(let r = 0; r < 21; r++) {
      let fret = []
      for(let f = 0; f < 4; f++) {
        fret.push(btns[(r + f * 5) % 12])
      }
      board.push(fret)
    }
    return (
      <div className="tabl-out">
      <div className="c-tabl">
        {board.map((fret, i) => {
          let dot;
          if((i + 1) %  3 == 0 && i < 11) {
            dot = <div className="dot mid"></div>
          }
          if(i % 3 == 0 && i > 11) {
            if(i == 12) {
              dot = <div><div className="dot left"></div><div className="dot right"></div></div>
            } else dot = <div className="dot mid"></div>
          }
          return (
            <div className="row" key={i}>
              {dot}
              {fret.map(t => {
                let classes = ['col']
                if(t == this.state.tone) classes.push('root')
                if(this.state.mod == 'Maj' && this.isThirdMaj(this.state.tone, t)) classes.push('maj')
                if(this.state.mod == 'Min' && this.isThirdMin(this.state.tone, t)) classes.push('maj')
                if(this.state.mod == 'Maj7' && this.isMaj7(this.state.tone, t)) classes.push('maj')
                if(this.state.mod == 'Min7' && this.isMin7(this.state.tone, t)) classes.push('maj')
                if(this.state.mod == '7' && this.is7(this.state.tone, t)) classes.push('maj')
                return <div className={classes.join(' ')} key={t}><button>{t}</button></div>
              })}
            </div>
          )
        })}
      </div>
      </div>
    )
  }
  is7 = (root, tar) => {
    let idx = btns.indexOf(root)
    if(((idx + 4) % 12) == btns.indexOf(tar) || ((idx + 10) % 12) == btns.indexOf(tar)) {
      return true
    }
  }
  isMaj7 = (root, tar) => {
    let idx = btns.indexOf(root)
    if(((idx + 4) % 12) == btns.indexOf(tar) || ((idx + 11) % 12) == btns.indexOf(tar)) {
      return true
    }
  }
  isMin7 = (root, tar) => {
    let idx = btns.indexOf(root)
    if(((idx + 3) % 12) == btns.indexOf(tar) || ((idx + 10) % 12) == btns.indexOf(tar)) {
      return true
    }
  }
  isThirdMaj = (root, tar) => {
    let idx = btns.indexOf(root)
    if(((idx + 4) % 12) == btns.indexOf(tar)) {
      return true
    }
  }
  isThirdMin = (root, tar) => {
    let idx = btns.indexOf(root)
    if(((idx + 3) % 12) == btns.indexOf(tar)) {
      return true
    }
  }
  render() {
    return (
      <div className="App">
        <div className="btns">
          {btns.map(f => <button key={f} onClick={e => this.setState({tone:f})}>{f}</button>)}
        </div>
        <div className="btns">
          {chds.map(f => <button className="mod" key={f} onClick={e => this.setState({mod:f})}>{f}</button>)}
        </div>
        {this.renderTable()}
      </div>
    );
  }
}

export default App;
