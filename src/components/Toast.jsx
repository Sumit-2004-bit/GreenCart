import { useEffect } from "react";

function Toast({ message, type = "success", onClose }) {
  useEffect(
    function () {
      const timer = setTimeout(function () {
        onClose();
      }, 2500);

      return function () {
        clearTimeout(timer);
      };
    },
    [onClose],
  );

  return (
    <div className={`app-toast ${type}`}>
      <div className="app-toast-icon">{type === "success" ? "✓" : "!"}</div>

      <div className="app-toast-content">
        <strong>{type === "success" ? "Success" : "Notice"}</strong>

        <span>{message}</span>
      </div>

      <button
        className="app-toast-close"
        onClick={onClose}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}

export default Toast;
