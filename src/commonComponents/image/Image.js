import React from "react";

export default function Image({
  src,
  alt,
  className,
  height,
  width,
  onClick,
  style,
  defaultSrc = "/icons/jewasity.png",
  defaultHeight = "200px",
  defaultWidth = "200px",
  onLoad,
  credit
}) {
  return (
    <div>
      <img
        src={src || defaultSrc}
        alt={alt || "broken-image"}
        className={src ? className : "object-cover"}
        height={src ? height : 200}
        width={src ? width : 200}
        onClick={onClick}
        style={style}
        onLoad={onLoad}
      />
      {credit && <p className="mt-[-40px] font-semibold">Image credit: {credit}</p>}
    </div>
  );
}
