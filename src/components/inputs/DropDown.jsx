import React from 'react'

const DropDown = ({label, options, value, onChange, error, startAdornment, endAdornment, className, placeholder, name, onBlur, ...rest }) => {
  return (
    <>
      {label && (<label className='form-label'>{label}</label>)}
      <div className='input-group'>
        {startAdornment && <span className='input-group-text'>{startAdornment}</span>}
        <select
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`form-control h-48-px bg-neutral-50 radius-6 ${error ? 'is-invalid' : ''} ${className || ''}`}
          {...rest}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className='input-group-text bg-neutral-50'>
          {endAdornment || <i className="ri-arrow-down-s-line"></i>}
        </span>
      </div>
      {error && <div className="invalid-feedback">{error}</div>}
    </>
  )
}

export default DropDown