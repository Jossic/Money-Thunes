import React from 'react';

export default function Container({ ...props }) {
  return (
    <div className={`min-h-screen`} style={props.style && props.style}>
      {props.children}
    </div>
  );
}
