export const WorkoutIcon = ({ className }: { className: string; }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 40 40"
  >
    <defs>
      <linearGradient id="a" x1="50%" x2="50%" y1="0%" y2="100%">
        <stop offset="0%" stopColor="#C1EC34" />
        <stop offset="100%" stopColor="#A2FC3C" />
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd">
      <circle cx={20} cy={20} r={20} fill="currentColor" />
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
        d="M15.299736,18.3881278 L16.0929506,13.3737601 L21.3533967,12.7493323 C22.0931205,13.0784758 22.4629824,13.2430475 22.4629824,13.2430475 C23.9906535,16.8619419 24.754489,18.6713891 24.754489,18.6713891 L29.007595,16.418353" />
      <polyline
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
        points="12.273 31.274 16.575 26.556 18.551 20.146 20.497 20.554 25.308 24.69 19.719 28.446" />
      <path
        stroke="#000"
        strokeWidth="4.5"
        d="M21.5899193,13.1733843 L19.4438056,20.6823994" />
      <circle cx={23} cy="8.75" r="2.25" fill="#000" />
    </g>
  </svg>
);
