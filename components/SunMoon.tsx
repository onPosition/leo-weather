interface SunMoonProps {
  sunProgress: number;
  moonProgress: number;
}

const SunMoonArc = ({ sunProgress, moonProgress }: SunMoonProps) => {
  console.log(sunProgress, moonProgress);
  const cx = 100;
  const cy = 200;
  const rSun = 180;
  const rMoon = 150;
  0;

  const startAngle = -Math.PI * 0.7;
  const endAngle = -Math.PI * 0.3;
  const sunAngle = startAngle + sunProgress * (endAngle - startAngle);
  const moonAngle = startAngle + moonProgress * (endAngle - startAngle);

  const sunX = cx + rSun * Math.cos(sunAngle);
  const sunY = cy + rSun * Math.sin(sunAngle);

  const moonX = cx + rMoon * Math.cos(moonAngle);
  const moonY = cy + rMoon * Math.sin(moonAngle);

  const isSunVisible = sunProgress > 0 && sunProgress < 1;
  const isMoonVisible = moonProgress > 0 && moonProgress < 1;

  return (
    <svg viewBox="0 10 200 80" className="m-auto">
      {/* Arcs */}
      <path
        d={`M ${cx - rSun} ${cy} A ${rSun} ${rSun} 0 0 1 ${cx + rSun} ${cy}`}
        fill="none"
        stroke="#fff"
        strokeWidth="0.5"
        strokeDasharray={isSunVisible ? "none" : "4 2"}
      />
      <path
        d={`M ${cx - rMoon} ${cy} A ${rMoon} ${rMoon} 0 0 1 ${
          cx + rMoon
        } ${cy}`}
        fill="none"
        stroke="#fff"
        strokeWidth="0.5"
        strokeDasharray={isMoonVisible ? "none" : "4 2"}
      />

      {/* Sun */}
      {isSunVisible && <circle cx={sunX} cy={sunY} r="8" fill="#FFD700" />}

      {/* Moon */}
      {isMoonVisible && <circle cx={moonX} cy={moonY} r="6" fill="#E0E0FF" />}
    </svg>
  );
};
export default SunMoonArc;
