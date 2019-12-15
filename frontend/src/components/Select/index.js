import React, { useRef, useEffect } from 'react';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';

import { useField } from '@rocketseat/unform';

import { Label } from './styles';

const animatedComponents = makeAnimated();

export default function ReactSelect({
  name,
  label,
  options,
  multiple,
  setChange,
  value,
  ...rest
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const renderLabel = label || name;

  function parseSelectValue(selectRef) {
    const selectValue = selectRef.state.value;
    if (!multiple) {
      return selectValue ? selectValue.id : '';
    }

    return selectValue ? selectValue.map(option => option.id) : [];
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  function getDefaultValue() {
    if (!defaultValue) return null;

    if (!multiple) {
      return options.find(option => option.id === defaultValue);
    }

    return options.filter(option => defaultValue.includes(option.id));
  }

  const customStyles = {
    option: provided => ({
      ...provided,
      color: '#444',
      fontWeight: '500',
      padding: 16,
    }),
  };

  function handleChangeSpecialty(specialty) {
    if (setChange) {
      setChange(specialty);
    }
  }

  return (
    <Label htmlFor={fieldName}>
      {error && <span>{error}</span>}

      <Select
        styles={customStyles}
        name={fieldName}
        components={animatedComponents}
        aria-label={fieldName}
        options={options}
        isMulti={multiple}
        defaultValue={getDefaultValue()}
        ref={ref}
        value={value || ''}
        getOptionValue={option => option.id}
        getOptionLabel={option => option.name}
        onChange={specialty => handleChangeSpecialty(specialty)}
        {...rest}
      />

      {label && <strong>{renderLabel}</strong>}
    </Label>
  );
}
