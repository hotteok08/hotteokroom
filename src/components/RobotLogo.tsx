"use client";

interface RobotLogoProps {
  color?: string;          // accent color for the zigzag lines
  size?: number;
  className?: string;
  animate?: boolean;
}

export default function RobotLogo({
  color = "#10b981",
  size = 48,
  className = "",
  animate = false,
}: RobotLogoProps) {
  const id = `clip-${color.replace("#", "")}-${size}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={animate ? { animation: "float 4s ease-in-out infinite" } : {}}
    >
      <defs>
        <clipPath id={id}>
          <circle cx="60" cy="60" r="54" />
        </clipPath>
      </defs>

      {/* Outer ring */}
      <circle cx="60" cy="60" r="56" fill="none" stroke="white" strokeWidth="5" />
      {/* Black background */}
      <circle cx="60" cy="60" r="54" fill="#111" />

      {/* Robot face — dumbbell / barbell shape */}
      {/* Left eye socket (white circle) */}
      <circle cx="38" cy="60" r="15" fill="white" />
      {/* Left pupil */}
      <circle cx="38" cy="60" r="7" fill="#111" />

      {/* Right eye socket */}
      <circle cx="82" cy="60" r="15" fill="white" />
      {/* Right pupil */}
      <circle cx="82" cy="60" r="7" fill="#111" />

      {/* Bridge connecting the two eyes */}
      <rect x="38" y="52" width="44" height="16" fill="white" />

      {/* Top zigzag line */}
      <polyline
        points="3,34 16,20 28,32 42,17 57,30 72,15 86,27 100,16 117,28"
        stroke={color}
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath={`url(#${id})`}
        style={animate ? { animation: `pulseGlow 2s ease-in-out infinite` } : {}}
      />

      {/* Bottom zigzag line */}
      <polyline
        points="3,86 16,100 30,85 44,98 59,83 74,97 88,82 102,94 117,80"
        stroke={color}
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath={`url(#${id})`}
        style={animate ? { animation: `pulseGlow 2s ease-in-out infinite 0.4s` } : {}}
      />
    </svg>
  );
}
