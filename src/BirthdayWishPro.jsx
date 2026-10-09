import { useState, useEffect, useMemo } from "react";

const DEFAULT_NAME = "Bisma, Ulty Emoji";

const MESSAGES = [
  "May you get everything your heart desires. Wishing you a long life and good health, and may every moment of your life be full of joy",
  "May you be blessed with every joy in the world. You are always part of my prayers, and I send you lots of prayers and love",
  "Mujy Cake khilla daina warna sare dua wapas ly lu ga 😄",
  "Cake kha laina aj diet ni krna kl sy dubara start kr laina jo kabhi start ki he ni thi 😂 motto"
];

const COLORS = [
  "#FF6B8B",
  "#FFC857",
  "#7BDFF2",
  "#B8F2E6",
  "#C3A6FF",
  "#FFD7BA",
];

export default function BirthdayWish() {
  const name = useMemo(() => {
    try {
      return (
        new URLSearchParams(window.location.search).get("name") || DEFAULT_NAME
      );
    } catch {
      return DEFAULT_NAME;
    }
  }, []);

  const [lit, setLit] = useState(true);
  const [step, setStep] = useState(0);

  const falling = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        emoji: i % 3 === 0,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 5 + Math.random() * 4,
        size: 7 + Math.random() * 7,
        color: COLORS[i % COLORS.length],
      })),
    [],
  );

  useEffect(() => {
    if (lit || step >= MESSAGES.length) return;
    const t = setTimeout(() => setStep((s) => s + 1), 1100);
    return () => clearTimeout(t);
  }, [lit, step]);

  const blowOut = () => {
    setStep(0);
    setLit(false);
  };
  const relight = () => {
    setStep(0);
    setLit(true);
  };

  return (
    <main className={`bw ${lit ? "bw-dark" : "bw-soft"}`}>
      <style>{css}</style>

      {!lit &&
        falling.map((f) =>
          f.emoji ? (
            <span
              key={f.id}
              className="fall emo"
              aria-hidden="true"
              style={{
                left: `${f.left}%`,
                fontSize: 18 + f.size * 1.4,
                animationDelay: `${f.delay}s`,
                animationDuration: `${f.duration}s`,
              }}
            >
              🙃
            </span>
          ) : (
            <span
              key={f.id}
              className="fall piece"
              aria-hidden="true"
              style={{
                left: `${f.left}%`,
                width: f.size,
                height: f.size * 1.6,
                background: f.color,
                animationDelay: `${f.delay}s`,
                animationDuration: `${f.duration}s`,
              }}
            />
          ),
        )}

      <section className="stage">
        <button
          className="cake-btn"
          onClick={lit ? blowOut : undefined}
          disabled={!lit}
          aria-label="Candles bujhayein"
        >
          <div className={`glow ${lit ? "glow-on" : ""}`} />
          <svg viewBox="0 0 240 250" className="cake" aria-hidden="true">
            <defs>
              <linearGradient id="gBottom" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#FF8FA8" />
                <stop offset="1" stopColor="#E8587A" />
              </linearGradient>
              <linearGradient id="gTop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#FFE3CC" />
                <stop offset="1" stopColor="#FFC9A3" />
              </linearGradient>
              <radialGradient id="gFlame" cx="50%" cy="70%" r="60%">
                <stop offset="0" stopColor="#FFF7D6" />
                <stop offset="0.5" stopColor="#FFC857" />
                <stop offset="1" stopColor="#FF8A3D" />
              </radialGradient>
            </defs>

            <ellipse cx="120" cy="228" rx="106" ry="14" fill="#3A2260" />
            <rect
              x="26"
              y="150"
              width="188"
              height="72"
              rx="16"
              fill="url(#gBottom)"
            />
            {[56, 80, 104, 128, 152, 176].map((x) => (
              <circle
                key={x}
                cx={x + 4}
                cy="188"
                r="4.5"
                fill="#FFF4E6"
                opacity="0.85"
              />
            ))}
            <rect
              x="52"
              y="104"
              width="136"
              height="54"
              rx="14"
              fill="url(#gTop)"
            />
            <rect x="48" y="98" width="144" height="18" rx="9" fill="#FFF4E6" />
            {[66, 92, 120, 148, 174].map((x) => (
              <circle key={x} cx={x} cy="118" r="6" fill="#FFF4E6" />
            ))}

            {[
              { x: 90, c: "#7BDFF2" },
              { x: 120, c: "#FFC857" },
              { x: 150, c: "#C3A6FF" },
            ].map((cd) => (
              <rect
                key={cd.x}
                x={cd.x - 4}
                y="70"
                width="8"
                height="32"
                rx="2"
                fill={cd.c}
              />
            ))}

            <g className={lit ? "flames on" : "flames off"}>
              {[90, 120, 150].map((x, i) => (
                <g key={x} transform={`translate(${x} 66)`}>
                  <path
                    className="flame"
                    style={{ animationDelay: `${i * 0.25}s` }}
                    d="M0 -18 C7 -9 8 -2 0 5 C-8 -2 -7 -9 0 -18Z"
                    fill="url(#gFlame)"
                  />
                  <path
                    className="smoke"
                    style={{ animationDelay: `${i * 0.12}s` }}
                    d="M0 -6 q-6 -10 0 -18 t0 -16"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </g>
              ))}
            </g>
          </svg>
        </button>

        {lit ? (
          <p className="hint">Tap on the cake and blow out the candles.</p>
        ) : (
          <div className="reveal">
            <h1 className="title">
              Happy Birthday,
              <br />
              {name}
            </h1>

            <div className="msgs" aria-live="polite">
              {MESSAGES.slice(0, step).map((m, i) => (
                <p key={i} className="msg">
                  {m}
                </p>
              ))}
            </div>

            <button
              className="again"
              onClick={relight}
              style={{
                visibility: step >= MESSAGES.length ? "visible" : "hidden",
              }}
            >
              Relight the candles
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=DM+Sans:wght@400;500&display=swap');

.bw, .bw * { box-sizing: border-box; }
.bw {
  min-height: 100vh;
  min-height: 100svh;
  display: grid;
  place-items: center;
  padding: 32px 20px;
  position: relative;
  overflow: hidden;
  font-family: 'DM Sans', system-ui, sans-serif;
  color: #FFF4E6;
  transition: background-color 1.2s ease;
}
.bw-dark { background: #140B24; }
.bw-soft { background: #2A1649; }

.stage {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 460px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.cake-btn {
  position: relative;
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.cake-btn:disabled { cursor: default; }
.cake-btn:focus-visible, .again:focus-visible {
  outline: 3px solid #FFC857;
  outline-offset: 6px;
  border-radius: 12px;
}
.cake { width: min(62vw, 260px); height: auto; display: block; position: relative; }

.glow {
  position: absolute;
  inset: -40% -40% -10% -40%;
  background: radial-gradient(circle at 50% 38%, rgba(255,200,87,0.38), rgba(255,200,87,0) 60%);
  opacity: 0;
  transition: opacity 1s ease;
  pointer-events: none;
}
.glow-on { opacity: 1; animation: breathe 3s ease-in-out infinite; }

.flame { transform-box: fill-box; transform-origin: 50% 100%; animation: flicker 1.1s ease-in-out infinite; transition: opacity .25s, transform .25s; }
.smoke { opacity: 0; }
.flames.off .flame { opacity: 0; transform: scale(0); animation: none; }
.flames.off .smoke { animation: smoke 1.6s ease-out forwards; }

.hint {
  margin: 28px 0 0;
  font-size: 15px;
  letter-spacing: 0.01em;
  color: rgba(255,244,230,0.72);
}

.reveal { margin-top: 24px; display: flex; flex-direction: column; align-items: center; }
.title {
  margin: 0;
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 600;
  font-size: clamp(2.3rem, 9vw, 3.6rem);
  line-height: 1.06;
  letter-spacing: -0.015em;
  color: #FFF4E6;
  animation: rise .9s cubic-bezier(.2,.7,.2,1) both;
}
.msgs { margin-top: 22px; min-height: 168px; max-width: 34ch; }
.msg {
  margin: 0 0 12px;
  font-size: 17px;
  line-height: 1.55;
  color: rgba(255,244,230,0.9);
  animation: fadein .6s ease both;
}
.again {
  margin-top: 8px;
  padding: 11px 22px;
  border: 1px solid rgba(255,244,230,0.35);
  border-radius: 999px;
  background: transparent;
  color: #FFF4E6;
  font: 500 14px 'DM Sans', system-ui, sans-serif;
  cursor: pointer;
  transition: background .2s, border-color .2s;
}
.again:hover { background: rgba(255,244,230,0.1); border-color: rgba(255,244,230,0.6); }

.fall {
  position: fixed;
  top: 0;
  z-index: 1;
  line-height: 1;
  pointer-events: none;
  animation-name: fall;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  will-change: transform;
}
.piece { border-radius: 2px; }

@keyframes fall {
  0%   { transform: translateY(-12vh) rotate(0deg); opacity: 0; }
  8%   { opacity: 1; }
  100% { transform: translateY(112vh) rotate(540deg); opacity: .9; }
}
@keyframes flicker {
  0%, 100% { transform: scale(1, 1) rotate(-2deg); }
  50%      { transform: scale(0.92, 1.1) rotate(2deg); }
}
@keyframes breathe {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.06); }
}
@keyframes smoke {
  0%   { opacity: .7; transform: translateY(0); }
  100% { opacity: 0;  transform: translateY(-16px); }
}
@keyframes rise {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadein {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .fall, .flame, .glow-on, .title, .msg, .flames.off .smoke { animation: none !important; }
  .fall { display: none; }
}
`;
