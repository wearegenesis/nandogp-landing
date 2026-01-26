  import React, { useState, useEffect } from "react";
  import { HERO_VIDEO_URL } from "../constants";
  import "../truck-cards.css";
  import DrivingScene from "./DrivingScene";

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
        {/* 1. LAYER: SVG BACKGROUND (Driver View with Mountains) - NO MASKS */}
        <DrivingScene speed={speed} signType={signType} signContent={signContent} isSignActive={isSignActive} />

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
