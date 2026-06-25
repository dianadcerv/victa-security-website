import React from 'react';

const inputClassName =
  'w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-50 placeholder-slate-500 focus:outline-none focus:border-amber-500';

export default function FormField({ field, value, onChange }) {
  const { id, label, type, required, placeholder, options, rows = 3 } = field;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold mb-2">
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
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={id}
          type={type}
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
