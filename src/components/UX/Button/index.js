import React from 'react';

export default function Button({ action, text, classname }) {
  return (
    <button onClick={action} className={classname}>
      {text}
    </button>
  );
}
