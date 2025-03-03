const Sort: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      role="img"
    >
      <path d="M9 18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h6zM21 4a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h18zm-6 7a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h12z" />
    </svg>
  );
};

const RadioUnselect: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className={className}
    >
      <circle cx="10" cy="10" r="9" style={{ fill: "rgb(25, 46, 56)" }} />
      <path
        d="M10,2a8,8,0,1,1-8,8,8.009,8.009,0,0,1,8-8m0-2A10,10,0,1,0,20,10,10,10,0,0,0,10,0Z"
        style={{ fill: "rgb(160, 160, 160)" }}
      ></path>
    </svg>
  );
};

const RadioSelect: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className={className}
    >
      <circle cx="10" cy="10" r="9" style={{ fill: "rgb(25, 46, 56)" }} />
      <circle cx="10" cy="10" r="4" style={{ fill: "rgb(68, 195, 171)" }} />
      <path
        d="M10,2a8,8,0,1,1-8,8,8.009,8.009,0,0,1,8-8m0-2A10,10,0,1,0,20,10,10,10,0,0,0,10,0Z"
        style={{ fill: "rgb(68, 195, 171)" }}
      />
    </svg>
  );
};

export { Sort, RadioUnselect, RadioSelect };
