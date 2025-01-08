import Link from "next/link";

const Badge: React.FC<{
  href?: string;
  className?: string;
  badgeText: string;
  [key: string]: any;
}> = ({ href, className = "", badgeText, ...props }) => {
  return (
    <div
      className={`inline-flex max-w-[20.9375rem] bg-[var(--app-badge)] ${className}`}
    >
      {href ? (
        <Link
          href={href}
          prefetch={false}
          className="outline-sm app-transition-colors flex w-full select-none items-center border-l border-[#192e38] px-2 py-1.5 hover:bg-[hsla(0,0%,100%,.078)] focus-visible:bg-[hsla(0,0%,100%,.078)]"
          {...props}
        >
          <small className="inline-block truncate text-xs font-semibold uppercase text-[var(--app-icon-primary)]">
            {badgeText}
          </small>
        </Link>
      ) : (
        <button className="outline-sm app-transition-colors flex w-full select-none items-center border-l border-[#192e38] px-2 py-1.5 hover:bg-[hsla(0,0%,100%,.078)] focus-visible:bg-[hsla(0,0%,100%,.078)]">
          <small className="inline-block truncate text-xs font-semibold uppercase text-[var(--app-icon-primary)]">
            {badgeText}
          </small>
        </button>
      )}
    </div>
  );
};

export default Badge;
