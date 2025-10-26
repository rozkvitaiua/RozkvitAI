"use client";

import { useEffect, useState } from "react";
import svgPaths from "../imports/svg-rx8622p8ta";

export function SunflowerBg() {
  const [rotation, setRotation] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleMotionChange);

    // Scroll handler for rotation
    const handleScroll = () => {
      if (reducedMotion) return;
      
      const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      const rotationDegrees = scrollProgress * 360;
      setRotation(rotationDegrees);
    };

    if (!reducedMotion) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, [reducedMotion]);

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
      <div 
        className="relative"
        style={{
          width: "min(1200px, 80vw)",
          height: "min(1200px, 80vw)",
          maxWidth: "100%",
          maxHeight: "100%",
        }}
      >
        <div className="absolute inset-[-1.75%]">
          <svg 
            className="block size-full" 
            fill="none" 
            preserveAspectRatio="none" 
            viewBox="0 0 968 967"
            style={{ opacity: 0.16 }}
          >
            <g id="Group 2">
              <g 
                filter="url(#filter0_dd_1_3)" 
                id="petals"
                style={{
                  transform: reducedMotion ? "none" : `rotate(${rotation}deg)`,
                  transformOrigin: "center",
                  transition: reducedMotion ? "none" : "transform 0.05s linear",
                }}
              >
                <path 
                  d={svgPaths.p12bffe80} 
                  shapeRendering="crispEdges" 
                  stroke="url(#paint0_radial_1_3)" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              </g>
              <g filter="url(#filter1_dd_1_3)" id="Ellipse 2">
                <mask fill="white" id="path-2-inside-1_1_3">
                  <path d={svgPaths.p31d14300} />
                  <path d={svgPaths.p3561f200} />
                </mask>
                <path 
                  d={svgPaths.p395a6580} 
                  fill="url(#paint1_radial_1_3)" 
                  mask="url(#path-2-inside-1_1_3)" 
                />
              </g>
              <circle 
                cx="477.191" 
                cy="482.098" 
                fill="var(--neon-cyan)" 
                id="Ellipse 3" 
                r="4.94361" 
              />
            </g>
            <defs>
              <filter 
                colorInterpolationFilters="sRGB" 
                filterUnits="userSpaceOnUse" 
                height="966.547" 
                id="filter0_dd_1_3" 
                width="967.095" 
                x="8.9407e-07" 
                y="2.98023e-08"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dx="1" dy="1" />
                <feGaussianBlur stdDeviation="8.4" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 1 0 0 0 0 0.995614 0 0 0 1 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_3" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dx="-1" dy="-1" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 1 0 0 0 0 0.995614 0 0 0 0.85 0" />
                <feBlend in2="effect1_dropShadow_1_3" mode="normal" result="effect2_dropShadow_1_3" />
                <feBlend in="SourceGraphic" in2="effect2_dropShadow_1_3" mode="normal" result="shape" />
              </filter>
              <filter 
                colorInterpolationFilters="sRGB" 
                filterUnits="userSpaceOnUse" 
                height="367.968" 
                id="filter1_dd_1_3" 
                width="367.968" 
                x="295.855" 
                y="299.663"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dx="1" dy="1" />
                <feGaussianBlur stdDeviation="8.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.0705882 0 0 0 0 0.964706 0 0 0 0 0.960784 0 0 0 1 0" />
                <feBlend in2="BackgroundImageFix" mode="plus-darker" result="effect1_dropShadow_1_3" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dx="1" dy="1" />
                <feGaussianBlur stdDeviation="7.7" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.0705882 0 0 0 0 0.964706 0 0 0 0 0.960784 0 0 0 1 0" />
                <feBlend in2="effect1_dropShadow_1_3" mode="normal" result="effect2_dropShadow_1_3" />
                <feBlend in="SourceGraphic" in2="effect2_dropShadow_1_3" mode="normal" result="shape" />
              </filter>
              <radialGradient 
                cx="0" 
                cy="0" 
                gradientTransform="translate(482.135 482.647) rotate(180) scale(509.192 437.673)" 
                gradientUnits="userSpaceOnUse" 
                id="paint0_radial_1_3" 
                r="1"
              >
                <stop offset="0.288521" stopColor="#02F5FB" stopOpacity="0.28" />
                <stop offset="0.682772" stopColor="#12F6F5" />
              </radialGradient>
              <radialGradient 
                cx="0" 
                cy="0" 
                gradientTransform="translate(478.839 482.647) rotate(90) scale(166.984)" 
                gradientUnits="userSpaceOnUse" 
                id="paint1_radial_1_3" 
                r="1"
              >
                <stop stopColor="#12F6F5" />
                <stop offset="1" stopColor="#12F6F5" stopOpacity="0.68" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
