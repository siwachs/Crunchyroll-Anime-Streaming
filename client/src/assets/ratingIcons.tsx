const StarOutlined: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      role="img"
    >
      <path d="M15.266 8.352l-3.278-6.629L8.73 8.352 1.431 9.397l5.279 5.131-1.245 7.32 6.534-3.458 6.545 3.46-1.259-7.322 5.285-5.13-7.304-1.046zm-5.207 1.83l1.934-3.937 1.948 3.938 4.313.617-3.118 3.027.748 4.354L12 16.128l-3.884 2.054.742-4.355L5.743 10.8l4.316-.617z" />
    </svg>
  );
};

const StarFull: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      role="img"
    >
      <path d="M15.266 8.352L11.988 1.723 8.73 8.352 1.431 9.397 6.71 14.528 5.465 21.849 11.999 18.39 18.544 21.85 17.285 14.528 22.57 9.398z" />
    </svg>
  );
};

const StarHalf: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      role="img"
    >
      <path d="M15.266 8.352l-3.278-6.629L8.73 8.352 1.431 9.397l5.279 5.131-1.245 7.32 6.534-3.458 6.545 3.46-1.259-7.322 5.285-5.13-7.304-1.046zm-3.273-2.107l1.948 3.938 4.313.617-3.118 3.027.748 4.354L12 16.128l-.007-9.883z" />
    </svg>
  );
};

export { StarOutlined, StarFull, StarHalf };
