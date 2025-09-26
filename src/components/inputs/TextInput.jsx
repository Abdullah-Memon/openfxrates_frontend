import React from 'react'

const TextInput = ({ label, placeholder, type, value, onChange, onBlur, error, startAdornment, endAdornment, className, name, ...rest }) => {
  return (
    <>
      {label && (<label className='form-label'>{label}</label>)}
      <div className='input-group border radius-6 bg-neutral-50'>
        {startAdornment && <span className='input-group-text bg-neutral-50 border-0'>{startAdornment}</span>}
        <input
          type={type || 'text'}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`form-control h-48-px bg-neutral-50 radius-6 border-0 p-1 ${error ? 'is-invalid' : ''} ${className || ''}`}
          placeholder={placeholder}
          {...rest}
        />
        {endAdornment && <span className='input-group-text border-0 bg-neutral-50'>{endAdornment}</span>}
      </div>
      {error && <div className="invalid-feedback">{error}</div>}
    </>
  )
}

export default TextInput