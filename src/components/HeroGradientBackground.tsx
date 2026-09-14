import React, { useEffect, useRef } from 'react';

// Aurora Blend JSON Configuration
export const AURORA_BLEND_JSON = {
  name: "Untitled blend",
  type: "aurora",
  profile: "sRGB",
  dividers: [0.25, 0.5, 0.75],
  soften: 11,
  noise: 100,
  speed: 26,
  texts: [
    {
      id: "feral-brand",
      content: "Saudade",
      ink: "auto",
      color: "#FBF8F3",
      family: "'Instrument Serif', Georgia, serif",
      sizePct: 9,
      x: 50,
      y: 50,
      align: "center",
      bold: false,
      italic: false,
      underline: false,
      letter: 0,
      line: 1.2,
      shadow: 10,
      blur: 30,
      textBlur: 0,
      skew: 0,
      rotate: 0,
      curve: 0
    }
  ],
  stops: [
    {
      name: "BLACK",
      hex: "#0D0D0D",
      rgb: [13, 13, 13],
      oklch: [0.1591, 0, 89.9],
      cmyk: [0, 0, 0, 95],
      position: 0.125
    },
    {
      name: "BLACK",
      hex: "#0D0D0D",
      rgb: [13, 13, 13],
      oklch: [0.1591, 0, 89.9],
      cmyk: [0, 0, 0, 95],
      position: 0.375
    },
    {
      name: "INK GREY",
      hex: "#707070",
      rgb: [112, 112, 112],
      oklch: [0.5452, 0, 89.9],
      cmyk: [0, 0, 0, 56],
      position: 0.625
    },
    {
      name: "BLACK",
      hex: "#0D0D0D",
      rgb: [13, 13, 13],
      oklch: [0.1591, 0, 89.9],
      cmyk: [0, 0, 0, 95],
      position: 0.875
    }
  ]
};

export const HeroGradientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const { dividers, speed, stops } = AURORA_BLEND_JSON;
    let t = 0;

    const render = () => {
      // Speed 26 normalized
      t += 0.008 * (speed / 26);

      // Base background color #0D0D0D
      ctx.fillStyle = '#0D0D0D';
      ctx.fillRect(0, 0, width, height);

      // Save context for additive aurora curtain blending
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      // 1. Subtle gradient touches in all 4 corners (top-left, top-right, bottom-left, bottom-right)
      const cornerRadius = Math.min(width, height) * 0.55;
      const corners = [
        { x: 0, y: 0 },
        { x: width, y: 0 },
        { x: 0, y: height },
        { x: width, y: height }
      ];

      corners.forEach((corner, idx) => {
        const radGrad = ctx.createRadialGradient(corner.x, corner.y, 0, corner.x, corner.y, cornerRadius);
        const intensity = 0.14 + Math.sin(t * 0.9 + idx * 1.5) * 0.04;
        radGrad.addColorStop(0, `rgba(112, 112, 112, ${intensity})`);
        radGrad.addColorStop(0.5, `rgba(80, 80, 80, ${intensity * 0.5})`);
        radGrad.addColorStop(1, 'rgba(13, 13, 13, 0)');
        ctx.fillStyle = radGrad;
        ctx.fillRect(0, 0, width, height);
      });

      // 2. Draw original aurora ribbons along the JSON dividers [0.25, 0.5, 0.75]
      dividers.forEach((div, index) => {
        const baseCenterX = div * width;
        const phaseOffset = index * 1.8;

        // Draw multiple light curtain layers for each divider
        for (let layer = 0; layer < 3; layer++) {
          const layerPhase = phaseOffset + layer * 1.2;
          const ribbonWidth = 110 + layer * 55;

          ctx.beginPath();

          const steps = 14;
          const stepY = height / steps;
          const pointsLeft: { x: number; y: number }[] = [];
          const pointsRight: { x: number; y: number }[] = [];

          for (let i = 0; i <= steps; i++) {
            const y = i * stepY;
            // Aurora sinusoidal undulation
            const sway =
              Math.sin(y * 0.004 + t * 1.2 + layerPhase) * 60 +
              Math.sin(y * 0.009 - t * 0.9 + index) * 35 +
              Math.cos(y * 0.002 + t * 0.5) * 25;

            const cx = baseCenterX + sway;
            pointsLeft.push({ x: cx - ribbonWidth * 0.5, y });
            pointsRight.push({ x: cx + ribbonWidth * 0.5, y });
          }

          // Build ribbon path
          ctx.moveTo(pointsLeft[0].x, pointsLeft[0].y);
          for (let i = 1; i < pointsLeft.length; i++) {
            const prev = pointsLeft[i - 1];
            const curr = pointsLeft[i];
            const midX = (prev.x + curr.x) / 2;
            const midY = (prev.y + curr.y) / 2;
            ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
          }
          ctx.lineTo(pointsLeft[pointsLeft.length - 1].x, pointsLeft[pointsLeft.length - 1].y);

          ctx.lineTo(pointsRight[pointsRight.length - 1].x, pointsRight[pointsRight.length - 1].y);
          for (let i = pointsRight.length - 2; i >= 0; i--) {
            const prev = pointsRight[i + 1];
            const curr = pointsRight[i];
            const midX = (prev.x + curr.x) / 2;
            const midY = (prev.y + curr.y) / 2;
            ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
          }
          ctx.closePath();

          // Gradient with INK GREY #707070 (rgb: 112, 112, 112)
          const grad = ctx.createLinearGradient(0, 0, 0, height);
          const alphaPeak = 0.28 / (layer + 1);
          grad.addColorStop(0, 'rgba(13, 13, 13, 0)');
          grad.addColorStop(0.2, `rgba(112, 112, 112, ${alphaPeak * 0.6})`);
          grad.addColorStop(0.5, `rgba(112, 112, 112, ${alphaPeak})`);
          grad.addColorStop(0.75, `rgba(112, 112, 112, ${alphaPeak * 0.8})`);
          grad.addColorStop(1, 'rgba(13, 13, 13, 0)');

          ctx.fillStyle = grad;
          ctx.fill();
        }
      });

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const textConfig = AURORA_BLEND_JSON.texts[0];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Aurora Canvas Layer with soften: 11 (blur: 11px) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          filter: `blur(${AURORA_BLEND_JSON.soften}px)`,
        }}
      />

      {/* Atmospheric Text Glow from JSON: "Saudade" */}
      {textConfig && (
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-0"
          style={{
            left: `${textConfig.x}%`,
            top: `${textConfig.y}%`,
            fontFamily: textConfig.family,
            color: textConfig.color,
            fontSize: `clamp(42px, ${textConfig.sizePct}vw, 110px)`,
            filter: `blur(${textConfig.blur}px)`,
            textShadow: `0 0 ${textConfig.shadow}px rgba(251, 248, 243, 0.45), 0 0 35px rgba(112, 112, 112, 0.5)`,
            opacity: 0.38,
            letterSpacing: `${textConfig.letter}em`,
            lineHeight: textConfig.line,
            fontStyle: textConfig.italic ? 'italic' : 'normal',
            fontWeight: textConfig.bold ? 'bold' : 'normal',
          }}
        >
          {textConfig.content}
        </div>
      )}

      {/* Noise Texture Layer (noise: 100) with overlay blend mode */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          mixBlendMode: 'overlay',
          opacity: 1, // Full 100% noise
        }}
      />
    </div>
  );
};
