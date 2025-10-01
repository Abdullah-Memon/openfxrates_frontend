import React, { useState, useRef, useEffect } from 'react'

const DropDown = ({label, options, value, onChange, error, startAdornment, endAdornment, className, placeholder, name, onBlur, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options || []);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Get the selected option label for display
  const selectedOption = options?.find(option => option.value === value);
  const displayValue = selectedOption ? selectedOption.label : '';

  // Filter options based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredOptions(options || []);
    } else {
      const filtered = (options || []).filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  }, [searchTerm, options]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
        if (onBlur) {
          onBlur({ target: { name, value } });
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [name, value, onBlur]);

  const handleInputClick = () => {
    setIsOpen(!isOpen);
    setSearchTerm('');
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleOptionSelect = (selectedOption) => {
    if (onChange) {
      onChange({
        target: {
          name,
          value: selectedOption.value
        }
      });
    }
    setIsOpen(false);
    setSearchTerm('');
    inputRef.current?.blur();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredOptions.length > 0) {
        handleOptionSelect(filteredOptions[0]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  return (
    <div ref={dropdownRef} className="position-relative">
      {label && (<label className='form-label'>{label}</label>)}
      <div className={`input-group border radius-6 bg-neutral-50 ${error ? 'border-danger' : ''}`}>
        {startAdornment && (
          <span className='input-group-text bg-neutral-50 border-0'>
            {startAdornment}
          </span>
        )}
        <input
          ref={inputRef}
          type="text"
          name={name}
          value={isOpen ? searchTerm : displayValue}
          onChange={handleInputChange}
          onClick={handleInputClick}
          onKeyDown={handleKeyDown}
          className={`form-control h-48-px bg-neutral-50 radius-6 border-0 p-1 ${error ? 'is-invalid' : ''} ${className || ''}`}
          placeholder={placeholder || 'Select an option'}
          autoComplete="off"
          {...rest}
        />
        <span 
          className='input-group-text border-0 bg-neutral-50 cursor-pointer'
          onClick={handleInputClick}
        >
          {endAdornment || (
            <i className={`ri-arrow-${isOpen ? 'up' : 'down'}-s-line transition-all`}></i>
          )}
        </span>
      </div>

      {/* Custom Dropdown Options Container */}
      {isOpen && (
        <div className="dropdown-options-container position-absolute w-100 mt-1 bg-white border border-light-subtle rounded shadow-lg z-3">
          <div className="dropdown-options-list" style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <div
                  key={index}
                  className="dropdown-option px-3 py-2 cursor-pointer hover-bg-light d-flex align-items-center"
                  onClick={() => handleOptionSelect(option)}
                  style={{
                    borderBottom: index < filteredOptions.length - 1 ? '1px solid #f0f0f0' : 'none',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#f8f9fa';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  <span className="text-sm">{option.label}</span>
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-muted text-sm">
                No options found
              </div>
            )}
          </div>
        </div>
      )}

      {error && <div className="invalid-feedback d-block">{error}</div>}

      <style jsx>{`
        .dropdown-options-container {
          z-index: 1050;
        }
        .dropdown-option:hover {
          background-color: #f8f9fa !important;
        }
        .dropdown-option:active {
          background-color: #e9ecef !important;
        }
        .cursor-pointer {
          cursor: pointer;
        }
        .transition-all {
          transition: all 0.2s ease;
        }
        .dropdown-options-list::-webkit-scrollbar {
          width: 6px;
        }
        .dropdown-options-list::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        .dropdown-options-list::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }
        .dropdown-options-list::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
    </div>
  )
}

export default DropDown