import React, { useEffect } from 'react';

export default function Snackbar({ duration, onClose, open, children }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [open]);

  if (open)
    return (
      <div className="snackbar absolute bottom-5 w-2/3 m-auto z-50 inset-x-0 transition">
        {children}
      </div>
    );
}
