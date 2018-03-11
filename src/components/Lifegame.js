import React from 'react';

export default class Lifegame extends React.Component {
  constructor(props) {
    super(props);
    props.initialize(30+2);
  }

  render() {
    return (
      <div>
        <h1>ライフゲーム</h1>
        <button onClick={() => this.start()}>START</button>
        <button onClick={() => this.stop()}>STOP</button>
        <button onClick={() => this.props.next()}>NEXT</button>
        <button onClick={() => this.props.initialize(30+2)}>RESET</button>
        <br />
        <div style={styles.board}>
          {this.renderCells(this.props.cells)}
        </div>
        <div>
          <p>世代数: {this.props.age}</p>
        </div>
      </div>
    )
  }

  renderCells(cells) {
    const result = [];
    let index = 0;
    // 一番外側のセルは番兵(常にfalse)のため描画しない
    for (let y = 1; y < cells.length-1; y++) {
      const row = cells[y];
      for (let x = 1; x < row.length-1; x++) {
        const value = row[x];
        result.push(
          <div key={index++} 
            style={value ? styles.alive : styles.dead}
            onClick={() => this.props.setStatus(x, y, !this.props.cells[y][x])}
          />
        );
      }
    }
    return result;
  }

  state = {
    timerId: null
  }

  start() {
    const timerId = setInterval(this.props.next, 500);
    this.setState({ timerId: timerId });
  }

  stop() {
    if (this.state.timerId) {
      clearInterval(this.state.timerId);
      this.setState({ timerId: null });
    }
  }
}

const styles = {
  board: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '1rem auto',
    width: 8*30
  },
  alive: {
    width: 8,
    height: 8,
    backgroundColor: '#0CF925',
  },
  dead: {
    width: 8,
    height: 8,
    backgroundColor: '#000',
  },
}