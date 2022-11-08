import React from 'react';

export default function Button({ ...props }) {
  const { name, loading } = props;

  return (
    <button
      disabled={loading}
      className={props.classname ? props.classname : 'defaultButton'}
      {...props}>
      {loading ? 'Chargement' : <>{name}</>}
    </button>
  );
}
