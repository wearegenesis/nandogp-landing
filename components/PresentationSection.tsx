import React, { useState, useEffect } from "react";
import { HERO_VIDEO_URL } from "../constants";
import "../truck-cards.css";

const PresentationSection: React.FC = () => {
  const [speed, setSpeed] = useState(62);
  const [signType, setSignType] = useState<"circle" | "triangle">("circle");
  const [signContent, setSignContent] = useState<string>("60");
  const [isSignActive, setIsSignActive] = useState(false);

  useEffect(() => {
    // Simulate speed fluctuation
    const interval = setInterval(() => {
      const fluctuation = Math.floor(Math.random() * 6); // 0 to 5
      setSpeed(60 + fluctuation);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const triggerSign = () => {
      // 1. Randomize Sign
      const types: ("circle" | "triangle")[] = ["circle", "triangle"];
      const nextType = types[Math.floor(Math.random() * types.length)];
      setSignType(nextType);

      if (nextType === "circle") {
        const speeds = ["60", "80", "90", "100"];
        setSignContent(speeds[Math.floor(Math.random() * speeds.length)]);
      } else {
        // 'narrow' or 'warning'
        const variants = ["narrow", "warning"];
        setSignContent(variants[Math.floor(Math.random() * variants.length)]);
      }

      // 2. Trigger Animation
      setIsSignActive(true);

      // 3. Reset after animation completes (4s)
      setTimeout(() => {
        setIsSignActive(false);
      }, 4000);
    };

    // Start interval
    const signInterval = setInterval(triggerSign, 10000);

    return () => clearInterval(signInterval);
  }, []);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col items-center justify-start overflow-hidden bg-light"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes driveTurn {
          0% { transform: rotate(0deg); }
          20% { transform: rotate(-6deg); }
          40% { transform: rotate(-2deg); }
          60% { transform: rotate(6deg); }
          80% { transform: rotate(2deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes roadScroll {
          from { stroke-dashoffset: 200; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes signPass {
          0% { 
            transform: translate(960px, 600px) scale(0); 
            opacity: 0; 
          }
          5% { 
             opacity: 1; 
          }
          100% { 
            /* Moves to bottom-left offscreen diagonal */
            transform: translate(-200px, 1200px) scale(6); 
            opacity: 1; 
          }
        }
        @keyframes birdFloat {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(10px, -5px) rotate(2deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        @keyframes birdFloatReverse {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-10px, -8px) rotate(-1deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        @keyframes digitalPulse {
          0% { filter: drop-shadow(0 0 2px rgba(207, 250, 254, 0.3)); }
          50% { filter: drop-shadow(0 0 5px rgba(207, 250, 254, 0.6)); }
          100% { filter: drop-shadow(0 0 2px rgba(207, 250, 254, 0.3)); }
        }
        @keyframes speedWobble {
           0% { stroke-dashoffset: 140; }
           50% { stroke-dashoffset: 130; }
           100% { stroke-dashoffset: 140; }
        }
        
        /* NEW: Cabin Suspension Bounce */
        @keyframes cabinBounce {
          0% { transform: translateY(0); }
          25% { transform: translateY(1.5px); }
          50% { transform: translateY(0.5px); }
          75% { transform: translateY(2px); }
          100% { transform: translateY(0); }
        }

        .driving-animation {
          /* Default Mobile Center - 985px */
          transform-origin: 960px 985px;
          animation: driveTurn 8s ease-in-out infinite;
        }
        
        .dashboard-placement {
           /* Mobile: Moved UP from 100 to 60 */
           transform: translate(0px, 60px);
        }
        
        .wheel-placement {
           /* Mobile: 985px */
           transform: translate(960px, 985px);
        }

        /* DESKTOP ADJUSTMENTS (1024px) */
        @media (min-width: 1024px) {
          .dashboard-placement {
             /* Desktop: Moved UP significantly from 60 to 20 */
             transform: translate(0px, 20px);
          }
          .wheel-placement {
             /* Standard Desktop: Keep 985px */
             transform: translate(960px, 985px);
          }
          .driving-animation {
             transform-origin: 960px 985px;
          }
        }

        /* LARGE SCREENS / TV (Starting from 1080px) */
        @media (min-width: 1080px) {
           .wheel-placement {
             /* Adjusted to 975px as requested */
             transform: translate(960px, 975px);
           }
           .driving-animation {
             transform-origin: 960px 975px;
           }
        }

        .road-moving {
          stroke-dasharray: 80 120;
          animation: roadScroll 0.5s linear infinite;
        }
        .sign-passing {
          opacity: 0; /* Hidden by default */
        }
        .sign-passing.active {
          animation: signPass 4s linear forwards;
        }
        .bird-anim-1 { animation: birdFloat 6s ease-in-out infinite; }
        .bird-anim-2 { animation: birdFloatReverse 7s ease-in-out infinite; }
        .bird-anim-3 { animation: birdFloat 8s ease-in-out infinite 1s; }
        .digital-glow { animation: digitalPulse 3s ease-in-out infinite; }
        .speed-bar-anim { animation: speedWobble 0.5s ease-in-out infinite alternate; }
        
        /* Apply subtle bounce to cabin elements */
        .cabin-vibration {
          animation: cabinBounce 0.6s ease-in-out infinite;
        }
      `,
        }}
      />

      {/* 1. LAYER: SVG BACKGROUND (Driver View with Mountains) - NO MASKS */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full text-secondary fill-current"
        >
          <defs>
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#EFE8DE" stopOpacity="0" />
              <stop offset="100%" stopColor="#A69F91" stopOpacity="0.3" />
            </linearGradient>

            {/* 3D Wheel Gradients - WARMER/LIGHTER TONES */}
            <linearGradient
              id="wheelLeather"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#57534E" /> {/* Stone 600 */}
              <stop offset="50%" stopColor="#44403C" /> {/* Stone 700 */}
              <stop offset="100%" stopColor="#292524" /> {/* Stone 800 */}
            </linearGradient>
            <linearGradient
              id="wheelRimHighlight"
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#78716C" stopOpacity="0.8" />{" "}
              {/* Stone 500 */}
              <stop offset="50%" stopColor="#44403C" stopOpacity="0" />
              <stop offset="100%" stopColor="#292524" stopOpacity="0.5" />
            </linearGradient>
            <radialGradient id="hubGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#57534E" />
              <stop offset="100%" stopColor="#292524" />
            </radialGradient>
            <linearGradient
              id="roadGradient"
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#6B7280" />
              <stop offset="100%" stopColor="#374151" />
            </linearGradient>
            <linearGradient id="poleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#5D4037" />
              <stop offset="100%" stopColor="#8D6E63" />
            </linearGradient>

            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
              <feOffset dx="2" dy="4" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.3" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Center Line Triangle Clip */}
            <clipPath id="centerLineClip">
              <path d="M960,600 L925,1080 L995,1080 Z" />
            </clipPath>
          </defs>

          {/* Sky */}
          <rect width="1920" height="700" fill="url(#skyGrad)" opacity="0.5" />

          {/* Mountains */}
          <g id="Mountains" transform="translate(0, 50)" opacity="0.3">
            {/* Back Range */}
            <path
              d="M0,600 L200,300 L400,550 L600,250 L800,500 L1100,200 L1400,550 L1700,300 L1920,500 L1920,700 L0,700 Z"
              fill="#8B5E3C"
              opacity="0.5"
            />
            {/* Front Range */}
            <path
              d="M0,700 L300,500 L500,650 L800,450 L1100,680 L1400,480 L1600,650 L1920,500 L1920,700 L0,700 Z"
              fill="#1F2937"
              opacity="0.4"
            />
          </g>

          {/* Birds */}
          <g id="Birds" opacity="0.7">
            <g className="hidden md:block">
              <g transform="translate(350, 250)">
                <path
                  d="M0,10 Q10,0 20,10 M20,10 Q30,0 40,10"
                  fill="none"
                  stroke="#1F2937"
                  strokeWidth="2.5"
                  className="bird-anim-1"
                />
                <path
                  d="M-40,30 Q-30,20 -20,30 M-20,30 Q-10,20 0,30"
                  fill="none"
                  stroke="#1F2937"
                  strokeWidth="2"
                  className="bird-anim-2"
                  transform="scale(0.8)"
                />
                <path
                  d="M30,-20 Q40,-30 50,-20 M50,-20 Q60,-30 70,-20"
                  fill="none"
                  stroke="#1F2937"
                  strokeWidth="2"
                  className="bird-anim-3"
                  transform="scale(0.7)"
                />
              </g>
              <g transform="translate(1500, 200)">
                <path
                  d="M0,10 Q12,0 24,10 M24,10 Q36,0 48,10"
                  fill="none"
                  stroke="#1F2937"
                  strokeWidth="2.5"
                  className="bird-anim-2"
                />
                <path
                  d="M60,-10 Q70,-20 80,-10 M80,-10 Q90,-20 100,-10"
                  fill="none"
                  stroke="#1F2937"
                  strokeWidth="2"
                  className="bird-anim-1"
                  transform="scale(0.8)"
                />
              </g>
            </g>

            <g className="block md:hidden">
              <g transform="translate(780, 260) scale(0.7)">
                <path
                  d="M0,10 Q10,0 20,10 M20,10 Q30,0 40,10"
                  fill="none"
                  stroke="#1F2937"
                  strokeWidth="2.5"
                  className="bird-anim-1"
                />
                <path
                  d="M-40,30 Q-30,20 -20,30 M-20,30 Q-10,20 0,30"
                  fill="none"
                  stroke="#1F2937"
                  strokeWidth="2"
                  className="bird-anim-2"
                  transform="scale(0.8)"
                />
              </g>
              <g transform="translate(1140, 220) scale(0.7)">
                <path
                  d="M0,10 Q12,0 24,10 M24,10 Q36,0 48,10"
                  fill="none"
                  stroke="#1F2937"
                  strokeWidth="2.5"
                  className="bird-anim-2"
                />
                <path
                  d="M60,-10 Q70,-20 80,-10 M80,-10 Q90,-20 100,-10"
                  fill="none"
                  stroke="#1F2937"
                  strokeWidth="2"
                  className="bird-anim-1"
                  transform="scale(0.8)"
                />
              </g>
            </g>
          </g>

          {/* Road Perspective */}
          <g id="Road">
            {/* Main Asphalt - Darker */}
            <path
              d="M960,600 L-100,1080 L2020,1080 Z"
              fill="url(#roadGradient)"
              opacity="0.9"
            />

            {/* Side Lines */}
            <path
              d="M960,600 L150,1080"
              stroke="#FFFFFF"
              strokeWidth="4"
              opacity="0.8"
            />
            <path
              d="M960,600 L1770,1080"
              stroke="#FFFFFF"
              strokeWidth="4"
              opacity="0.8"
            />

            {/* Center Wedge */}
            <g clipPath="url(#centerLineClip)">
              <line
                x1="960"
                y1="600"
                x2="960"
                y2="1080"
                stroke="#FFFFFF"
                strokeWidth="90"
                strokeLinecap="butt"
                className="road-moving"
              />
            </g>
          </g>

          {/* PASSING OBJECTS */}
          <g
            id="PassingSign"
            className={`sign-passing ${isSignActive ? "active" : ""}`}
          >
            <rect
              x="-4"
              y="-140"
              width="8"
              height="140"
              fill="url(#poleGradient)"
            />

            {signType === "circle" ? (
              <g>
                <circle
                  cx="0"
                  cy="-140"
                  r="35"
                  fill="#FFFFFF"
                  stroke="#B91C1C"
                  strokeWidth="8"
                />
                <text
                  x="0"
                  y="-128"
                  textAnchor="middle"
                  fill="#000000"
                  fontSize="30"
                  fontWeight="bold"
                  fontFamily="sans-serif"
                  letterSpacing="-1"
                >
                  {signContent}
                </text>
              </g>
            ) : (
              <g transform="translate(0, -145)">
                <path
                  d="M0,-40 L42,35 L-42,35 Z"
                  fill="#FFFFFF"
                  stroke="#B91C1C"
                  strokeWidth="8"
                  strokeLinejoin="round"
                />
                {signContent === "narrow" ? (
                  <g stroke="#000000" strokeWidth="5" strokeLinecap="round">
                    <path d="M-12,15 L-12,5 L-5,-15" />
                    <path d="M12,15 L12,5 L5,-15" />
                  </g>
                ) : (
                  <g>
                    <rect
                      x="-3"
                      y="-15"
                      width="6"
                      height="25"
                      rx="1"
                      fill="#000000"
                    />
                    <circle cx="0" cy="20" r="3" fill="#000000" />
                  </g>
                )}
              </g>
            )}
            <ellipse
              cx="-15"
              cy="-160"
              rx="10"
              ry="5"
              fill="#FFFFFF"
              opacity="0.3"
              transform="rotate(-45 -15 -160)"
            />
          </g>

          {/* Dashboard & Interior */}
          <g id="Dashboard" className="dashboard-placement">
            <g className="cabin-vibration">
              {/* Dashboard Main Structure - Warmer color */}
              <path
                d="M-100,800 Q960,700 2020,800 L2020,1080 L-100,1080 Z"
                fill="#44403C"
                opacity="0.6"
              />
              <path
                d="M-100,810 Q960,710 2020,810"
                stroke="#A69F91"
                strokeWidth="1"
                fill="none"
                opacity="0.2"
              />

              {/* DIGITAL CLUSTER */}
              <g
                id="DigitalCluster"
                transform="translate(960, 770)"
                className="digital-glow"
              >
                <path
                  d="M-280,0 Q0,-50 280,0 L250,150 Q0,120 -250,150 Z"
                  fill="#000000"
                  opacity="0.6"
                />
                <path
                  d="M-280,0 Q0,-50 280,0 L250,150 Q0,120 -250,150 Z"
                  fill="none"
                  stroke="#A69F91"
                  strokeWidth="1"
                  opacity="0.3"
                />

                {/* 1. CENTER GAUGE (Speed) */}
                <g id="GaugeCenter">
                  <circle
                    cx="0"
                    cy="60"
                    r="105"
                    fill="none"
                    stroke="#CFFAFE"
                    strokeWidth="1"
                    opacity="0.3"
                  />
                  <path
                    d="M-75,90 A85,85 0 1,1 75,90"
                    fill="none"
                    stroke="#CFFAFE"
                    strokeWidth="8"
                    opacity="0.1"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="0"
                    cy="60"
                    r="95"
                    fill="none"
                    stroke="#CFFAFE"
                    strokeWidth="4"
                    opacity="0.2"
                    strokeDasharray="2 8"
                  />
                  <path
                    d="M-75,90 A85,85 0 1,1 75,90"
                    fill="none"
                    stroke="#CFFAFE"
                    strokeWidth="8"
                    strokeDasharray="400"
                    strokeDashoffset="140"
                    strokeLinecap="round"
                    className="speed-bar-anim"
                    opacity="0.9"
                  />
                  <text
                    x="0"
                    y="70"
                    textAnchor="middle"
                    fill="#CFFAFE"
                    fontSize="65"
                    fontWeight="bold"
                    fontFamily="monospace"
                    opacity="0.95"
                    letterSpacing="-2"
                  >
                    {speed}
                  </text>
                  <text
                    x="0"
                    y="95"
                    textAnchor="middle"
                    fill="#CFFAFE"
                    fontSize="12"
                    opacity="0.7"
                    letterSpacing="2"
                  >
                    KM/H
                  </text>
                </g>

                {/* 2. LEFT GAUGE (Fuel) - RESTORED CIRCULAR TRACKS WITH NEW ICON */}
                <g id="GaugeLeft" transform="translate(-190, 50)">
                  {/* Circular Gauge Tracks (Restored) */}
                  <circle
                    cx="0"
                    cy="0"
                    r="62"
                    fill="none"
                    stroke="#CFFAFE"
                    strokeWidth="1"
                    opacity="0.2"
                    strokeDasharray="280 400"
                    transform="rotate(135)"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="0"
                    cy="0"
                    r="54"
                    fill="none"
                    stroke="#CFFAFE"
                    strokeWidth="6"
                    opacity="0.1"
                    strokeDasharray="240 400"
                    transform="rotate(135)"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="0"
                    cy="0"
                    r="54"
                    fill="none"
                    stroke="#CFFAFE"
                    strokeWidth="6"
                    opacity="0.1"
                    strokeDasharray="2 6"
                    transform="rotate(135)"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="0"
                    cy="0"
                    r="54"
                    fill="none"
                    stroke="#CFFAFE"
                    strokeWidth="6"
                    opacity="0.9"
                    strokeDasharray="180 400"
                    transform="rotate(135)"
                    strokeLinecap="round"
                  />

                  {/* New Gasoline Pump Icon (Centered) */}
                  <g
                    transform="translate(0, 2) scale(1.8)"
                    fill="#CFFAFE"
                    opacity="0.95"
                  >
                    {/* Pump Body with Screen Cutout */}
                    <path
                      fillRule="evenodd"
                      d="M-5,-9 H5 A1.5,1.5 0 0,1 6.5,-7.5 V7.5 A1.5,1.5 0 0,1 5,9 H-5 A1.5,1.5 0 0,1 -6.5,7.5 V-7.5 A1.5,1.5 0 0,1 -5,-9 Z M-3.5,-6 V-2 H3.5 V-6 H-3.5 Z"
                    />
                    {/* Base */}
                    <path d="M-7,9 H7 V11 H-7 Z" />
                    {/* Nozzle Handle & Hose */}
                    <path d="M6.5,-7 H8.5 A0.5,0.5 0 0,1 9,-6.5 V-0.5 H8 V-6 H6.5 V-7 Z" />
                    <path d="M8,-0.5 H9 V5 A2,2 0 0,1 7,7 H5.5 V6 H7 A1,1 0 0,0 8,5 V-0.5 Z" />
                    {/* Nozzle Gun Tip */}
                    <path d="M8.5,-5.5 L10.5,-3.5 L8.5,-1.5 V-5.5 Z" />
                  </g>

                  {/* Low Fuel Warning Dot (Positioned for circle) */}
                  <circle cx="-25" cy="25" r="3" fill="#EF4444" opacity="0.8">
                    <animate
                      attributeName="opacity"
                      values="0.8;0.3;0.8"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>

                {/* 3. RIGHT GAUGE (RPM) */}
                <g id="GaugeRight" transform="translate(190, 50)">
                  <circle
                    cx="0"
                    cy="0"
                    r="62"
                    fill="none"
                    stroke="#CFFAFE"
                    strokeWidth="1"
                    opacity="0.2"
                    strokeDasharray="280 400"
                    transform="rotate(135)"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="0"
                    cy="0"
                    r="54"
                    fill="none"
                    stroke="#CFFAFE"
                    strokeWidth="6"
                    opacity="0.1"
                    strokeDasharray="240 400"
                    transform="rotate(135)"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="0"
                    cy="0"
                    r="54"
                    fill="none"
                    stroke="#CFFAFE"
                    strokeWidth="6"
                    opacity="0.1"
                    strokeDasharray="2 6"
                    transform="rotate(135)"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="0"
                    cy="0"
                    r="54"
                    fill="none"
                    stroke="#CFFAFE"
                    strokeWidth="6"
                    opacity="0.9"
                    strokeDasharray="100 400"
                    transform="rotate(135)"
                    strokeLinecap="round"
                  />
                  <text
                    x="0"
                    y="5"
                    textAnchor="middle"
                    fill="#CFFAFE"
                    fontSize="16"
                    fontWeight="bold"
                    opacity="0.9"
                  >
                    2.5
                  </text>
                  <text
                    x="0"
                    y="20"
                    textAnchor="middle"
                    fill="#CFFAFE"
                    fontSize="10"
                    opacity="0.7"
                  >
                    x1000
                  </text>
                </g>
              </g>
            </g>
          </g>

          {/* DRIVING GROUP: Wheel Only (Animated) */}
          <g className="cabin-vibration">
            <g className="driving-animation">
              {/* Steering Wheel - 3D Improved */}
              <g
                id="Steering_wheel"
                className="wheel-placement"
                filter="url(#shadow)"
              >
                {/* Column behind wheel - Warmer */}
                <path d="M-40,-50 L40,-50 L60,150 L-60,150 Z" fill="#292524" />

                {/* Wheel Rim */}
                <ellipse
                  cx="0"
                  cy="0"
                  rx="340"
                  ry="290"
                  stroke="url(#wheelLeather)"
                  strokeWidth="60"
                  fill="none"
                />
                <ellipse
                  cx="0"
                  cy="0"
                  rx="340"
                  ry="290"
                  stroke="url(#wheelRimHighlight)"
                  strokeWidth="50"
                  fill="none"
                  style={{ mixBlendMode: "overlay" }}
                />
                <ellipse
                  cx="0"
                  cy="0"
                  rx="315"
                  ry="265"
                  stroke="#000"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.3"
                />

                {/* Top Center Marker */}
                <path
                  d="M-12,-322 L12,-322 L12,-258 L-12,-258 Z"
                  fill="#CFFAFE"
                  stroke="#000"
                  strokeWidth="1"
                  opacity="0.9"
                />

                {/* Center Hub */}
                <path
                  d="M-120,20 L120,20 L80,120 L-80,120 Z"
                  fill="url(#hubGradient)"
                />

                {/* Spokes */}
                <path
                  d="M-290,10 L-120,20 L-80,90 L-250,150 Z"
                  fill="url(#wheelLeather)"
                />
                <path
                  d="M290,10 L120,20 L80,90 L250,150 Z"
                  fill="url(#wheelLeather)"
                />
                <path
                  d="M-60,110 L-50,285 L50,285 L60,110 Z"
                  fill="url(#wheelLeather)"
                />

                {/* Center Horn/Airbag */}
                <ellipse
                  cx="0"
                  cy="50"
                  rx="90"
                  ry="70"
                  fill="url(#wheelLeather)"
                  stroke="#2D3748"
                  strokeWidth="1"
                />

                {/* Logo on Horn */}
                <text
                  x="0"
                  y="65"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="42"
                  fontFamily="'Racing Sans One', sans-serif"
                  fontWeight="bold"
                  letterSpacing="2"
                >
                  GP
                </text>

                {/* Side Buttons */}
                <g transform="translate(-290, -120) rotate(-20)">
                  <rect
                    x="-25"
                    y="-30"
                    width="50"
                    height="60"
                    rx="10"
                    fill="#292524"
                    stroke="#000"
                    strokeWidth="2"
                  />
                  <circle
                    cx="0"
                    cy="0"
                    r="15"
                    fill="#B91C1C"
                    stroke="#7F1D1D"
                    strokeWidth="2"
                  >
                    <animate
                      attributeName="fill"
                      values="#B91C1C;#EF4444;#B91C1C"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <text
                    x="0"
                    y="5"
                    textAnchor="middle"
                    fill="white"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    L
                  </text>
                </g>

                <g transform="translate(290, -120) rotate(20)">
                  <rect
                    x="-25"
                    y="-30"
                    width="50"
                    height="60"
                    rx="10"
                    fill="#292524"
                    stroke="#000"
                    strokeWidth="2"
                  />
                  <circle
                    cx="0"
                    cy="0"
                    r="15"
                    fill="#B91C1C"
                    stroke="#7F1D1D"
                    strokeWidth="2"
                  >
                    <animate
                      attributeName="fill"
                      values="#B91C1C;#EF4444;#B91C1C"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <text
                    x="0"
                    y="5"
                    textAnchor="middle"
                    fill="white"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    R
                  </text>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>

      {/* 2. LAYER: VIDEO OVERLAY - NO MASKS */}
      <div className="absolute inset-0 z-10 w-full h-full overflow-hidden mix-blend-multiply opacity-20 pointer-events-none">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </video>
      </div>

      {/* 3. LAYER: GRADIENT OVERLAY TOP */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-light/60 via-transparent to-transparent pointer-events-none"></div>

      {/* 5. LAYER: CONTENT */}
      {/* UPDATE: Usamos max-lg en landscape para coger también los iphone Plus y Max */}
      <div
        className="relative z-30 w-full max-w-7xl mx-auto mt-20 pt-10 px-4 sm:px-6 lg:px-8 min-h-[58vh] md:min-h-0 flex 
    flex-col
    items-center justify-start 
    landscape:max-lg:mt-1 landscape:max-lg:pt-2 landscape:max-lg:min-h-0"
      >
        {/* TEXT CONTENT */}
        <div className="relative z-20 flex flex-col items-center text-center min-w-0 px-1 sm:px-2 sm:mx-20 ">
          {/* UPDATE: Reducimos texto a 3xl en landscape para todos los móviles */}
          <h1 className="text-5xl font-bold landscape:max-lg:text-3xl md:text-5xl">
            <span className="block">Transportes.</span>
            <span className="block">Mudanzas.</span>
            <span className="block text-primary">Express.</span>
          </h1>

          <div className="h-1.5 w-20 sm:w-24 bg-accent rounded-full mt-1.5 mb-4 sm:mb-6 landscape:mb-2 " />

          {/* UPDATE: Texto más pequeño en landscape */}
          <p className="text-lg text-dark/100 font-medium max-w-[28ch] landscape:max-lg:text-sm text-xl lg:text-xl">
            Muebles, oficinas y mercancía.
          </p>
          <p className="text-lg text-dark/100 font-medium max-w-[28ch] landscape:max-lg:text-sm text-xl lg:text-xl mb-8 sm:mb-10 ">
            En toda España.
          </p>
        </div>

        {/* CAPA DECORATIVA (cards detrás) */}

        {/* Card izquierda - Mobile: Bottom Left | Desktop: Top Left (Flanking Text) */}
        {/* UPDATE: Oculto en landscape hasta max-lg (1024px) para limpiar la vista en móviles grandes */}
        <div
          className="absolute z-10 
                        bottom-10 -left-2 
                        md:bottom-auto md:top-40 md:left-4 
                        lg:top-16 lg:left-12
                        landscape:max-lg:hidden"
        >
          <div className="stack">
            <div className="card">
              <div className="image">
                <img
                  src="https://lmazbqzrsywkkqjt.public.blob.vercel-storage.com/worker-outside-van.avif"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card derecha - Mobile: Bottom Right | Desktop: Top Right (Flanking Text) */}
        {/* UPDATE: Oculto en landscape hasta max-lg (1024px) */}
        <div
          className="absolute z-10 
                        bottom-10 -right-2 
                        md:bottom-auto md:top-40 md:right-4 
                        lg:top-16 lg:right-12
                        landscape:max-lg:hidden"
        >
          <div className="stackInsideRotation">
            <div className="card">
              <div className="image">
                <img
                  src="https://lmazbqzrsywkkqjt.public.blob.vercel-storage.com/delivery-van-packed-with-boxes-warehouse.avif"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PresentationSection;
