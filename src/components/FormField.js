import React from 'react';

const inputClassName =
  'w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none focus:border-amber-500';

export default function FormField({ field, value, onChange, onCheckboxChange }) {
  const { id, label, type, required, placeholder, options, rows = 3 } = field;

  return (
    <div>
      <label htmlFor={type === 'checkbox' ? undefined : id} className="block text-sm font-semibold mb-2">
        {label}
        {required && <span className="text-amber-500 ml-1">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          required={required}
          className={inputClassName}
        />
      ) : type === 'select' ? (
        <select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          required={required}
          className={inputClassName}
        >
          <option value="">Select one</option>
          {(options || []).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : type === 'checkbox' ? (
        <div className="space-y-2" role="group" aria-label={label}>
          {(options || []).map((option) => {
            const checked = Array.isArray(value) && value.includes(option);
            const optionId = `${id}__${option}`;
            return (
              <label
                key={option}
                htmlFor={optionId}
                className="flex items-start gap-3 text-sm text-slate-200 cursor-pointer"
              >
                <input
                  id={optionId}
                  type="checkbox"
                  name={id}
                  value={option}
                  checked={checked}
                  onChange={(e) => onCheckboxChange && onCheckboxChange(id, option, e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-800 text-amber-500 focus:ring-amber-500"
                />
                <span>{option}</span>
              </label>
            );
          })}
        </div>
      ) : (
        <input
          id={id}
          name={id}
          type={type || 'text'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={inputClassName}
        />
      )}
    </div>
  );
}
