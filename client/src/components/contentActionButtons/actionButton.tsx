import "./common.css";

const ActionButton: React.FC<{
  text: string;
  shadow?: "action-button-shadow";
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}> = ({ text, shadow = "", className, disabled, onClick }) => {
  return (
    <button
      className={`action-button ${shadow} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      <span className="action-button-child">{text}</span>
    </button>
  );
};

export default ActionButton;
