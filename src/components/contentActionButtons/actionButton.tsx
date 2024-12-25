import { ButtonType } from "./types";

import "./common.css";

const ActionButton: React.FC<{
  actionButtonText: string;
  className?: string;
  buttonType?: ButtonType;
}> = ({ actionButtonText, className = "", buttonType = "one" }) => {
  return (
    <button
      className={`action-button w-full min-w-[7.5rem] ${buttonType === "one" ? "bg-[var(--app-badge)] px-4 hover:bg-[#2f5161] focus-visible:bg-[#2f5161]" : ""} ${className}`}
    >
      <span className="action-button-child">{actionButtonText}</span>
    </button>
  );
};

export default ActionButton;
