import React, { useState, useEffect } from 'react';

export default function Title({ title = 'Mon titre', size = 'small', color = 'red', fontWeight }) {
  const [sizes, setSizes] = useState('small');

  useEffect(() => {
    if (size == 'small') {
      setSizes('1rem');
    } else if (size == 'medium') {
      setSizes('1.5rem');
    } else if (size == 'large') {
      setSizes('2rem');
    }
  }, []);

  return (
    <span style={{ color: `${color}`, fontSize: `${sizes}`, fontWeight: `${fontWeight}` }}>
      {title}
    </span>
  );
}
