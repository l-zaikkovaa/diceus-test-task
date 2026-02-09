export function parseMoney(v: string): number {
  // "$2.3M" -> 2_300_000, "$850K" -> 850_000, "$120" -> 120
  const s = v
    .trim()
    .toUpperCase()
    .replace(/[$,\s]/g, "");
  const m = s.match(/^(-?\d+(\.\d+)?)([KMB])?$/);
  if (!m) return 0;

  const num = Number(m[1]);
  const suf = m[3];
  const mul = suf === "K" ? 1e3 : suf === "M" ? 1e6 : suf === "B" ? 1e9 : 1;
  return num * mul;
}

export function parsePercent(v: string): number {
  // "32%" -> 32
  const n = Number(v.replace("%", "").trim());
  return Number.isFinite(n) ? n : 0;
}

export function parseUSDate(v: string): number {
  // "04/16/2025" -> timestamp
  const [mm, dd, yyyy] = v.split("/").map((x) => Number(x));
  if (!mm || !dd || !yyyy) return 0;
  return new Date(yyyy, mm - 1, dd).getTime();
}

export function toTrendPath(points: number[]) {
  if (points.length < 2) return "";

  const W = 220;
  const H = 52;
  const pad = 6;

  const min = 0;
  const max = 100;

  const xs = points.map((_, i) => pad + (i * (W - pad * 2)) / (points.length - 1));
  const ys = points.map((p) => {
    const t = (p - min) / (max - min);
    return pad + (1 - t) * (H - pad * 2);
  });

  return xs.map((x, i) => `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${ys[i].toFixed(1)}`).join(" ");
}

export function stripPercentLabel(label: string) {
  return label.replace(/\s*:\s*\d+(\.\d+)?%\s*$/, "").trim();
}

export function clampPct(value: number) {
  return Math.max(0, Math.min(1, value));
}

export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
