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

const Loader: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <svg
      className={`animate-spin-fast fill-current text-[var(--app-background-crunchyroll-orange)] ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      role="img"
    >
      <path
        opacity="0.2"
        d="M24 0c13.255 0 24 10.745 24 24 0 13.122-10.531 23.785-23.603 23.997L24 48C10.745 48 0 37.255 0 24 0 10.878 10.531.215 23.603.003L24 0zm0 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4z"
      />
      <path d="M36.095 3.266a24.119 24.119 0 0 1 8.64 8.64l-3.424 1.996a20.099 20.099 0 0 0-7.24-7.167l2.024-3.47z" />
    </svg>
  );
};

export { Sort, RadioUnselect, RadioSelect, Loader };
