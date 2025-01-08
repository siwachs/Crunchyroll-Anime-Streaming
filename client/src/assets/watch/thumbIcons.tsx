const ThumbUpOutlined: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-labelledby="thumbs-up-svg"
      role="img"
    >
      <title id="thumbs-up-svg">Like this</title>
      <path d="M7 20h12v-4c0-.155.036-.309.105-.447l1.33-2.658c.28-.561.28-1.229 0-1.79L19.382 9H14a1 1 0 0 1-1-1V4c0-1.103-.897-2-2-2h-1v4.879a3.973 3.973 0 0 1-1.172 2.828l-.021.021L7 11.432V20zm12 2H6a1 1 0 0 1-1-1V11a1 1 0 0 1 .314-.728l2.109-1.989C7.795 7.906 8 7.408 8 6.879V1a1 1 0 0 1 1-1h2c2.206 0 4 1.794 4 4v3h4.382c.764 0 1.449.424 1.789 1.106l1.053 2.105a4.02 4.02 0 0 1 0 3.578L21 16.236V20c0 1.103-.897 2-2 2zm-17-.063a1 1 0 0 1-1-1V11a1 1 0 0 1 2 0v9.938a1 1 0 0 1-1 1z" />
    </svg>
  );
};

const ThumbUpFilled: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-labelledby="thumbs-up-filled-svg"
      role="img"
    >
      <title id="thumbs-up-filled-svg">You like this</title>
      <path d="M19 22H6a1 1 0 0 1-1-1V11a1 1 0 0 1 .314-.728l2.109-1.989C7.795 7.906 8 7.408 8 6.879V1a1 1 0 0 1 1-1h2c2.206 0 4 1.794 4 4v3h4.382c.764 0 1.449.424 1.789 1.106l1.053 2.105a4.02 4.02 0 0 1 0 3.578L21 16.236V20c0 1.103-.897 2-2 2zm-17-.063a1 1 0 0 1-1-1V11a1 1 0 0 1 2 0v9.938a1 1 0 0 1-1 1z" />
    </svg>
  );
};

const ThumbDownOutlined: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-labelledby="thumbs-down-svg"
      role="img"
    >
      <title id="thumbs-down-svg">Dislike this</title>
      <path d="M17 4H5v4c0 .155-.036.309-.105.447l-1.33 2.658a2.012 2.012 0 0 0 0 1.79L4.618 15H10a1 1 0 0 1 1 1v4c0 1.103.897 2 2 2h1v-4.879c0-1.068.416-2.072 1.172-2.828l.021-.021L17 12.568V4zM5 2h13a1 1 0 0 1 1 1v10a1 1 0 0 1-.314.728l-2.109 1.989A1.987 1.987 0 0 0 16 17.121V23a1 1 0 0 1-1 1h-2c-2.206 0-4-1.794-4-4v-3H4.618a1.987 1.987 0 0 1-1.789-1.106l-1.053-2.105a4.02 4.02 0 0 1 0-3.578L3 7.764V4c0-1.103.897-2 2-2zm17 .063a1 1 0 0 1 1 1V13a1 1 0 1 1-2 0V3.063a1 1 0 0 1 1-1z" />
    </svg>
  );
};

const ThumbDownFilled: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-labelledby="thumbs-down-filled-svg"
      role="img"
    >
      <title id="thumbs-down-filled-svg">You dislike this</title>
      <path d="M5 2h13a1 1 0 0 1 1 1v10a1 1 0 0 1-.314.728l-2.109 1.989A1.987 1.987 0 0 0 16 17.121V23a1 1 0 0 1-1 1h-2c-2.206 0-4-1.794-4-4v-3H4.618a1.987 1.987 0 0 1-1.789-1.106l-1.053-2.105a4.02 4.02 0 0 1 0-3.578L3 7.764V4c0-1.103.897-2 2-2zm17 .063a1 1 0 0 1 1 1V13a1 1 0 1 1-2 0V3.063a1 1 0 0 1 1-1z"></path>
    </svg>
  );
};

export { ThumbUpOutlined, ThumbUpFilled, ThumbDownOutlined, ThumbDownFilled };
