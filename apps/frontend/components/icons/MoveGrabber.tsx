export const MoveGrabberIcon = ({ className }: { className: string }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <polyline points="9 5 12 2 15 5" />
        <polyline points="15 19 12 22 9 19" />
        <line x1={12} y1={2} x2={12} y2={22} />
      </svg>
    </>
  );
};
