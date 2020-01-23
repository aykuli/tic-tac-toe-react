import React from 'react';

export default function Square(props) {
    return (
      <button className={props.isHighlight ? "square square-winner" : "square"}  
              onClick={props.onClick}>
        {props.value}
      </button>
    );
  }