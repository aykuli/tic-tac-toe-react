import React from 'react';
import Board from './Board';

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
  
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {
          sign: squares[a],
          positions: [a, b, c],
        }
      }
    }
    return null;
  }

export default class Game extends React.Component {
  state = {
    history: [
      {
        squares: Array(9).fill(null),
      },
    ],
    stepNumb: 0,
    isXNext: true,
  };

  handleClick = i => {
    const history = this.state.history.slice(0, this.state.stepNumb + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.isXNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{ squares: squares }]),
      stepNumb: history.length,
      isXNext: !this.state.isXNext,
    });
  };

  jumpTo = (step) => {
    this.setState({
      stepNumb: step,
      isXNext: (step % 2) === 0,
    });

  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumb];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ? `Перейти к ходу #${move}` : 'К началу игры';

      return (
        <li key={move}>
          <button className="btn" onClick={() => {this.jumpTo(move)}}>{desc}</button>
        </li>
      );
    });

    let status = winner
      ? `Выиграл ${winner.sign}`
      : `Следующий ход: ${this.state.isXNext ? 'X' : 'O'}`;

    return (
      <div className="game">
        <div className="game-board">
          {winner ? <Board squares={current.squares} onClick={i => this.handleClick(i)} winnerPositions={winner.positions}/> : 
          <Board squares={current.squares} onClick={i => this.handleClick(i)}/>}
        </div>
        <div className="game-info">
          <div className={winner ? 'status highlight' : 'status'}>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}