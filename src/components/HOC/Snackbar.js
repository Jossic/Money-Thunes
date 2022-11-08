import React, { useState } from 'react';
import Snackbar from '../UX/Snackbar/Snackbar';
import Alert from '../UX/Alert/Alert';

export const withSnackbar = (WrappedComponent) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('Snackbar');
    const [duration, setDuration] = useState(6000);
    const [severity, setSeverity] = useState('error'); /** error | warning | info | success */

    const showMessage = (message, severity = 'error', duration = 6000) => {
      setMessage(message);
      setSeverity(severity);
      setDuration(duration);
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <>
        <WrappedComponent {...props} snackbarShowMessage={showMessage} />
        <Snackbar
          duration={duration}
          open={open}
          onClose={handleClose}
          //   TransitionComponent={Slide}
        >
          <Alert onClose={handleClose} type={severity}>
            {message}
          </Alert>
        </Snackbar>
      </>
    );
  };
};
