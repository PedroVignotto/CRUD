import React, { useRef, useEffect } from 'react';

import { useField } from '@rocketseat/unform';

import { Label } from './styles';

export default function Input({
  label,
  name,
  size,
  iconStyle,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const renderLabel = label || name;

  useEffect(() => {
    if (!ref.current) return;
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'value',
    });
  }, [ref.current, fieldName]); //eslint-disable-line

  return (
    <Label htmlFor={fieldName}>
      {error && <span>{error}</span>}

      <input
        name={fieldName}
        ref={ref}
        id={fieldName}
        aria-label={fieldName}
        defaultValue={defaultValue}
        {...rest}
      />

      {label && <span>{renderLabel}</span>}
      {children}
    </Label>
  );
}
