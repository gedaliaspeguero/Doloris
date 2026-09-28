import type { Adorno, Arte } from "@/lib/catalogo";

// Ilustración de pastel generada con SVG, usada mientras no hay foto real.

const MEDIDAS: Record<Arte["pisos"], { w: number; h: number }[]> = {
  1: [{ w: 132, h: 72 }],
  2: [
    { w: 144, h: 52 },
    { w: 100, h: 46 },
  ],
  3: [
    { w: 152, h: 44 },
    { w: 116, h: 40 },
    { w: 82, h: 36 },
  ],
};

export default function CakeArt({ arte, className }: { arte: Arte; className?: string }) {
  const pisos = MEDIDAS[arte.pisos];
  const cajas = pisos.map((p, i) => {
    const y = 196 - pisos.slice(0, i + 1).reduce((suma, q) => suma + q.h, 0);
    return { x: 100 - p.w / 2, y, ...p };
  });
  const tope = cajas[cajas.length - 1];
  // Recorta el espacio vacío sobre los pasteles bajos para que se vean grandes.
  const arriba = Math.max(0, tope.y - 52);

  return (
    <svg viewBox={`0 ${arriba} 200 ${216 - arriba}`} className={className} role="img" aria-hidden>
      <ellipse cx="100" cy="204" rx="92" ry="10" fill="#000" opacity="0.08" />
      <rect x="14" y="194" width="172" height="8" rx="4" fill="#E9DCCB" />
      {cajas.map((c, i) => (
        <g key={i}>
          <rect x={c.x} y={c.y} width={c.w} height={c.h} rx="7" fill={arte.base} stroke="#00000014" />
          <rect x={c.x + 3} y={c.y + 3} width={c.w * 0.18} height={c.h - 6} rx="4" fill="#fff" opacity="0.22" />
          <rect x={c.x} y={c.y + c.h - 11} width={c.w} height="5" fill={arte.borde} opacity="0.9" />
          {Array.from({ length: Math.floor(c.w / 9) }).map((_, j) => (
            <circle key={j} cx={c.x + 5 + j * 9} cy={c.y + c.h - 1} r="4" fill={arte.acento} stroke="#00000010" />
          ))}
          {i === 0 && arte.numero && arte.adorno !== "numero" && (
            <text
              x="100"
              y={c.y + c.h / 2 + 4}
              textAnchor="middle"
              fontSize="20"
              fontWeight="800"
              fill={arte.borde}
              stroke="#00000022"
              strokeWidth="0.6"
              fontFamily="Georgia, serif"
            >
              {arte.numero}
            </text>
          )}
        </g>
      ))}
      {arte.chorreado && <Chorreado x={tope.x} y={tope.y} w={tope.w} color={arte.acento} />}
      <Tope adorno={arte.adorno} arte={arte} y={tope.y} />
    </svg>
  );
}

function Chorreado({ x, y, w, color }: { x: number; y: number; w: number; color: string }) {
  const gotas = Math.floor(w / 14);
  let d = `M${x} ${y + 4} Q${x} ${y} ${x + 6} ${y} L${x + w - 6} ${y} Q${x + w} ${y} ${x + w} ${y + 4}`;
  for (let i = gotas; i >= 0; i--) {
    const gx = x + (i * w) / gotas;
    const largo = 8 + ((i * 7) % 13);
    d += ` L${gx} ${y + 6} Q${gx - 3} ${y + largo} ${gx - 5} ${y + 6}`;
  }
  return <path d={`${d} Z`} fill={color} />;
}

function Tope({ adorno, arte, y }: { adorno: Adorno; arte: Arte; y: number }) {
  const c = 100;
  switch (adorno) {
    case "flores":
      return (
        <g>
          {[-22, -8, 8, 22, 0].map((dx, i) => (
            <g key={i} transform={`translate(${c + dx} ${y - (i === 4 ? 14 : 6)})`}>
              {[0, 72, 144, 216, 288].map((a) => (
                <circle
                  key={a}
                  cx={Math.cos((a * Math.PI) / 180) * 5}
                  cy={Math.sin((a * Math.PI) / 180) * 5}
                  r="5"
                  fill={i % 2 ? arte.acento : "#F4A7C3"}
                  stroke="#00000012"
                />
              ))}
              <circle r="3" fill={arte.borde} />
            </g>
          ))}
        </g>
      );
    case "orejas":
      return (
        <g>
          <circle cx={c - 18} cy={y - 18} r="13" fill="#1F1A1C" />
          <circle cx={c + 18} cy={y - 18} r="13" fill="#1F1A1C" />
          <path d={`M${c} ${y - 8} L${c - 18} ${y - 18} L${c - 18} ${y + 2} Z M${c} ${y - 8} L${c + 18} ${y - 18} L${c + 18} ${y + 2} Z`} fill="#F4A7C3" />
          <circle cx={c} cy={y - 8} r="5" fill="#E86A9A" />
        </g>
      );
    case "corazon":
      return (
        <path
          d={`M${c} ${y - 4} C${c - 30} ${y - 22} ${c - 16} ${y - 44} ${c} ${y - 30} C${c + 16} ${y - 44} ${c + 30} ${y - 22} ${c} ${y - 4} Z`}
          fill={arte.acento}
        />
      );
    case "estrella":
      return <Estrella cx={c} cy={y - 20} r={18} fill={arte.borde} />;
    case "balon":
      return (
        <g>
          <circle cx={c} cy={y - 16} r="16" fill="#fff" stroke="#1F1A1C" strokeWidth="1.5" />
          <polygon points={`${c},${y - 23} ${c + 6},${y - 18} ${c + 4},${y - 11} ${c - 4},${y - 11} ${c - 6},${y - 18}`} fill="#1F1A1C" />
        </g>
      );
    case "birrete":
      return (
        <g>
          <rect x={c - 14} y={y - 16} width="28" height="12" rx="3" fill="#1F1A1C" />
          <polygon points={`${c},${y - 30} ${c + 32},${y - 20} ${c},${y - 10} ${c - 32},${y - 20}`} fill="#1F1A1C" />
          <path d={`M${c} ${y - 20} L${c + 24} ${y - 14} L${c + 24} ${y - 2}`} stroke={arte.borde} strokeWidth="2" fill="none" />
          <circle cx={c + 24} cy={y - 1} r="3" fill={arte.borde} />
        </g>
      );
    case "cuerno":
      return (
        <g>
          <polygon points={`${c - 8},${y - 2} ${c + 8},${y - 2} ${c},${y - 44}`} fill="#E8C766" stroke="#C9A442" />
          <path d={`M${c - 7} ${y - 12} L${c + 7} ${y - 16} M${c - 5} ${y - 22} L${c + 5} ${y - 26}`} stroke="#C9A442" strokeWidth="1.5" />
          <polygon points={`${c - 28},${y - 2} ${c - 16},${y - 2} ${c - 24},${y - 20}`} fill="#fff" stroke="#E0C9D2" />
          <polygon points={`${c + 28},${y - 2} ${c + 16},${y - 2} ${c + 24},${y - 20}`} fill="#fff" stroke="#E0C9D2" />
          {[-34, -24, 24, 34].map((dx) => (
            <circle key={dx} cx={c + dx} cy={y + 4} r="6" fill={dx < 0 ? arte.acento : arte.borde} />
          ))}
        </g>
      );
    case "mariposa":
      return (
        <g>
          {[
            [-22, -14],
            [18, -24],
          ].map(([dx, dy], i) => (
            <g key={i} transform={`translate(${c + dx} ${y + dy})`}>
              <ellipse cx="-6" cy="-4" rx="7" ry="9" fill={arte.acento} stroke="#9C7BBF" />
              <ellipse cx="6" cy="-4" rx="7" ry="9" fill={arte.acento} stroke="#9C7BBF" />
              <ellipse cx="-5" cy="6" rx="5" ry="6" fill="#DCC8EE" stroke="#9C7BBF" />
              <ellipse cx="5" cy="6" rx="5" ry="6" fill="#DCC8EE" stroke="#9C7BBF" />
              <rect x="-1" y="-10" width="2" height="20" rx="1" fill="#5B4570" />
            </g>
          ))}
        </g>
      );
    case "paloma":
      return (
        <path
          d={`M${c - 24} ${y - 16} Q${c - 10} ${y - 24} ${c} ${y - 18} Q${c + 6} ${y - 40} ${c + 20} ${y - 36} Q${c + 8} ${y - 26} ${c + 10} ${y - 18} Q${c + 22} ${y - 18} ${c + 26} ${y - 22} Q${c + 22} ${y - 8} ${c} ${y - 8} Q${c - 16} ${y - 8} ${c - 24} ${y - 16} Z`}
          fill="#fff"
          stroke={arte.borde}
          strokeWidth="1.5"
        />
      );
    case "osito":
      return (
        <g fill="#B98A64">
          <circle cx={c - 13} cy={y - 32} r="7" />
          <circle cx={c + 13} cy={y - 32} r="7" />
          <circle cx={c} cy={y - 20} r="17" />
          <ellipse cx={c} cy={y - 14} rx="8" ry="6" fill="#E8CDB5" />
          <circle cx={c - 6} cy={y - 24} r="2" fill="#2B1B24" />
          <circle cx={c + 6} cy={y - 24} r="2" fill="#2B1B24" />
          <circle cx={c} cy={y - 16} r="2.5" fill="#2B1B24" />
        </g>
      );
    case "numero":
      return (
        <text
          x={c}
          y={y - 6}
          textAnchor="middle"
          fontSize="40"
          fontWeight="800"
          fill={arte.borde}
          stroke="#8A6D2A"
          strokeWidth="1"
          fontFamily="Georgia, serif"
        >
          {arte.numero ?? "1"}
        </text>
      );
    case "escudo":
      return (
        <g>
          <path d={`M${c} ${y - 4} Q${c - 22} ${y - 14} ${c - 20} ${y - 40} L${c + 20} ${y - 40} Q${c + 22} ${y - 14} ${c} ${y - 4} Z`} fill={arte.acento} stroke={arte.borde} strokeWidth="2" />
          <Estrella cx={c} cy={y - 24} r={9} fill={arte.borde} />
        </g>
      );
  }
}

function Estrella({ cx, cy, r, fill }: { cx: number; cy: number; r: number; fill: string }) {
  const puntos = Array.from({ length: 10 }, (_, i) => {
    const rad = i % 2 ? r * 0.45 : r;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    return `${cx + Math.cos(a) * rad},${cy + Math.sin(a) * rad}`;
  }).join(" ");
  return <polygon points={puntos} fill={fill} stroke="#00000020" />;
}
