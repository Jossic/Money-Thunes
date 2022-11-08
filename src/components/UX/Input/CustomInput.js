import React from 'react';
import { Controller, useController } from 'react-hook-form';

function CustomInput({ ...props }) {
  const { fieldState } = useController({
    ...props
  });
  const errorText = fieldState.error ? fieldState.error.message : '';

  return (
    <Controller
      {...props}
      render={({ field }) => (
        <>
          <input {...props} {...field} className="defaultInput" />
          {errorText ? (
            <small data-testid={`${props.name}-error`} className="errorHelperText">
              {errorText}
            </small>
          ) : (
            props.helperText
          )}
        </>
      )}
    />
  );
}

export default CustomInput;
