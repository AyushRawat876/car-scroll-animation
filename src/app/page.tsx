"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const greenTrackRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Initial Intro Animation (Entrance)
      const introTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      introTl
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 30, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 1.2 },
        )
        .fromTo(
          cardsRef.current,
          { opacity: 0, y: 40, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.12 },
          "-=0.6",
        );

      // 2. Scroll-Driven Animation (Car Movement + Pinning)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1800", // Distance to scroll while locked
          pin: stickyRef.current, // Pin hero screen in place
          scrub: 1.2, // Smooth interpolation delay
          anticipatePin: 1,
        },
      });

      scrollTl
        .to(
          carRef.current,
          {
            x: () => {
              if (typeof window !== "undefined") {
                return window.innerWidth + 100;
              }
              return 1500;
            },
            ease: "none",
          },
          0,
        )
        .to(
          greenTrackRef.current,
          {
            width: "100%",
            ease: "none",
          },
          0,
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToCardsRef = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#cccccc]">
      {/* Hero Section Container */}
      <section ref={containerRef} className="relative h-[250vh]">
        {/* Sticky 100vh Viewport */}
        <div
          ref={stickyRef}
          className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden px-6 py-10 md:px-16"
        >
          {/* Top Metric Cards */}
          <div className="flex w-full items-center justify-center gap-6 md:justify-end">
            <div
              ref={addToCardsRef}
              className="w-64 rounded-2xl bg-[#ccff00] p-6 text-black shadow-xl transition-transform hover:scale-105"
            >
              <h3 className="text-4xl font-extrabold tracking-tight md:text-5xl">
                58%
              </h3>
              <p className="mt-2 text-xs font-semibold leading-snug md:text-sm">
                Increase in pick up point use
              </p>
            </div>

            <div
              ref={addToCardsRef}
              className="w-64 rounded-2xl bg-[#2a2a2a] p-6 text-white shadow-xl transition-transform hover:scale-105"
            >
              <h3 className="text-4xl font-extrabold tracking-tight md:text-5xl">
                27%
              </h3>
              <p className="mt-2 text-xs font-semibold leading-snug md:text-sm text-gray-300">
                Increase in pick up point use
              </p>
            </div>
          </div>

          {/* Central Track & Headline Banner */}
          <div className="relative my-auto flex h-32 w-full items-center bg-[#18181b] shadow-2xl md:h-40">
            {/* Green Track Revealed by Car */}
            <div
              ref={greenTrackRef}
              className="absolute left-0 top-0 h-full w-0 bg-[#40d375] transition-all"
            />

            {/* Headline Text */}
            <h1
              ref={headlineRef}
              className="relative z-10 w-full text-center text-3xl font-black tracking-[0.25em] text-black sm:text-5xl md:text-7xl lg:text-8xl"
            >
              WELCOME ITZFIZZ
            </h1>

            {/* Top-down McLaren Supercar SVG */}
            <div
              ref={carRef}
              className="absolute -left-48 top-1/2 z-20 h-28 w-56 -translate-y-1/2 md:h-36 md:w-72"
            >
              <svg
                viewBox="0 0 500 220"
                className="h-full w-full drop-shadow-2xl"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30 110C30 50 80 25 200 25C340 25 450 55 480 95C495 110 495 120 480 135C450 175 340 205 200 205C80 205 30 180 30 110Z"
                  fill="#FF5500"
                  stroke="#111"
                  strokeWidth="5"
                />
                <path
                  d="M150 45C220 40 300 40 340 70C350 100 350 130 340 160C300 190 220 190 150 185C135 140 135 90 150 45Z"
                  fill="#1C1917"
                />
                <path
                  d="M270 55C320 70 330 100 330 110C330 120 320 150 270 165C290 130 290 90 270 55Z"
                  fill="#38BDF8"
                  opacity="0.4"
                />
                <rect x="230" y="8" width="25" height="12" rx="4" fill="#111" />
                <rect
                  x="230"
                  y="210"
                  width="25"
                  height="12"
                  rx="4"
                  fill="#111"
                />
                <path
                  d="M35 40H60V190H35V40Z"
                  fill="#09090B"
                  stroke="#27272A"
                  strokeWidth="3"
                />
                <path d="M430 60L465 80L430 88V60Z" fill="#38BDF8" />
                <path d="M430 170L465 150L430 142V170Z" fill="#38BDF8" />
              </svg>
            </div>
          </div>

          {/* Bottom Metric Cards */}
          <div className="flex w-full items-center justify-center gap-6 md:justify-end">
            <div
              ref={addToCardsRef}
              className="w-64 rounded-2xl bg-[#60a5fa] p-6 text-black shadow-xl transition-transform hover:scale-105"
            >
              <h3 className="text-4xl font-extrabold tracking-tight md:text-5xl">
                23%
              </h3>
              <p className="mt-2 text-xs font-semibold leading-snug md:text-sm text-slate-900">
                Decreased in customer phone calls
              </p>
            </div>

            <div
              ref={addToCardsRef}
              className="w-64 rounded-2xl bg-[#f97316] p-6 text-black shadow-xl transition-transform hover:scale-105"
            >
              <h3 className="text-4xl font-extrabold tracking-tight md:text-5xl">
                40%
              </h3>
              <p className="mt-2 text-xs font-semibold leading-snug md:text-sm text-slate-950">
                Decreased in customer phone calls
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Scroll Release Section */}
      <section className="flex h-screen w-full flex-col items-center justify-center bg-[#09090b] text-white">
        <h2 className="text-4xl font-bold tracking-wider md:text-6xl">
          Next Feature Section
        </h2>
        <p className="mt-4 text-gray-400">
          Scroll back up to re-trigger hero interaction.
        </p>
      </section>
    </main>
  );
}
