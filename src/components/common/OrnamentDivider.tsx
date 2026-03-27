interface OrnamentDividerProps {
  className?: string;
  lineWidth?: string; // e.g. 'w-12' or 'w-24'
  dark?: boolean;     // white variant for dark backgrounds
}

const OrnamentDivider = ({
  className = '',
  lineWidth = 'w-16',
  dark = false,
}: OrnamentDividerProps) => {
  const lineColor = dark ? 'bg-white/20' : 'bg-gold/30';
  const svgColor = dark ? 'text-white/60' : 'text-gold';

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`h-[1px] ${lineWidth} ${lineColor}`} />
      <div className={`mx-4 ${svgColor}`}>
        <svg
          width="56"
          height="28"
          viewBox="0 0 56 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ornamental infinity / scroll motif */}
          <path
            d="M28 14 C34 6 44 4 52 10 C44 16 34 22 28 14Z"
            stroke="currentColor"
            strokeWidth="0.8"
            fill="none"
          />
          <path
            d="M28 14 C22 6 12 4 4 10 C12 16 22 22 28 14Z"
            stroke="currentColor"
            strokeWidth="0.8"
            fill="none"
          />
          <circle cx="28" cy="14" r="2" fill="currentColor" opacity="0.5" />
          <circle cx="4" cy="10" r="1.2" fill="currentColor" opacity="0.4" />
          <circle cx="52" cy="10" r="1.2" fill="currentColor" opacity="0.4" />
        </svg>
      </div>
      <div className={`h-[1px] ${lineWidth} ${lineColor}`} />
    </div>
  );
};

export default OrnamentDivider;
