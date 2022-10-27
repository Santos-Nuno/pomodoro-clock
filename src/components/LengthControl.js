import React from "react";

function LengthControl(props) {
  return (
    <div className={`lengthControl ${props.type}`}>
      <div id={`${props.type}-label`}>
        {`${props.type[0].toUpperCase() + props.type.substring(1)} length`}
      </div>
      <button
        id={`${props.type}-decrement`}
        value={-60}
        onClick={props.length > 1 ? props.functionClick : undefined}
        className="btn purple lighten-2"
      >
        -
      </button>
      <div id={`${props.type}-length`} className={`lengthControl-length`}>{`${
        props.length
      }`}</div>
      <button
        id={`${props.type}-increment`}
        value={60}
        onClick={props.length < 60 ? props.functionClick : undefined}
        className="btn purple lighten-2"
      >
        +
      </button>
    </div>
  );
}

export default LengthControl;