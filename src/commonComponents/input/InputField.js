import React from "react";

export default function InputField({
  placeholder,
  value,
  onChange,
  type,
  className,
  fieldType,
  error,
  loading,
}) {
  return (
    <>
      {fieldType == "input" ? (
        <input
          disabled={loading}
          className={`rounded-[15px] outline-none  bg-white-1 ${
            error ? "border border-red-400" : "border border-white-1"
          } py-[18px] px-[22px]
            ${className}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          type={type}
        />
      ) : (
        <textarea
        disabled={loading}
          className={`rounded-[15px] outline-none  bg-white-1 py-[18px] px-[22px]  resize-none mt-[9px] ${
            error ? "border border-red-400" : "border border-white-1"
          }  ${className}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </>
  );
}
