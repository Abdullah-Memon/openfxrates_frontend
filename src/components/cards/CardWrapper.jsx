import React from "react";

const Card = ({ title, body, footer }) => {
  return (
    <div className="card p-0 overflow-hidden position-relative radius-12 mt-16 mb-16">
      {title && (
        <div className="card-header py-16 px-24 bg-base border border-end-0 border-start-0 border-top-0">
          <h6 className="text-lg mb-0">{title}</h6>
        </div>
      )}
      <div className="card-body p-24">{body}</div>

      {footer && <div className="card-footer p-24">{footer}</div>}
    </div>
  );
};

export default Card;
