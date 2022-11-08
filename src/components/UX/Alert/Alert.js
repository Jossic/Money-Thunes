import React, { useEffect, useState } from 'react';
import { FaInfoCircle, FaExclamationTriangle, FaSmileWink } from 'react-icons/fa';

export default function Alert({ type = 'error', children }) {
  const [alertType, setAlertType] = useState('alert-info');
  const [alertTitle, setAlertTitle] = useState('');

  useEffect(() => {
    if (type === 'info') {
      setAlertType('alert-info');
      setAlertTitle('Info ');
    } else if (type === 'warning') {
      setAlertType('alert-warning');
      setAlertTitle('Erreur ');
    } else if (type === 'error') {
      setAlertType('alert-warning');
      setAlertTitle('Erreur ');
    } else {
      setAlertType('alert-success');
      setAlertTitle('Succès ');
    }
  }, []);

  const renderIcon = (type) => {
    if (type === 'info') {
      return <FaInfoCircle />;
    } else if (type === 'warning') {
      return <FaExclamationTriangle />;
    } else {
      return <FaSmileWink />;
    }
  };

  return (
    <div className={`flex p-4 mb-4 text-sm ${alertType} rounded-lg`} role="alert">
      <div className="my-auto pr-2">{renderIcon(type)}</div>
      <div>
        <span className="font-bold pr-7">{alertTitle}</span>
        {children}
      </div>
    </div>
  );
}
