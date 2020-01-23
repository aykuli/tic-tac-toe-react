import React from 'react';

import Square from './Square';

export default class Board extends React.Component {
  renderSquare(i) {
    const pos = this.props.winnerPositions;
        
    let isHighlight = false;
    if (pos !== undefined) {
      for (let j = 0; j < pos.length; j++) {
        if (pos[j] === i) isHighlight = true;
      }
    }
    
    return (
      <Square key={`square-${i}`}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        isHighlight={isHighlight}
      />
    );
  }

  renderRow(i) {
    return (
      <div className="board-row">
        {this.renderSquare(i)}
        {this.renderSquare(i + 1)}
        {this.renderSquare(i + 2)}
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderRow(0)}
        {this.renderRow(3)}
        {this.renderRow(6)}
      </div>
    );
  }
}