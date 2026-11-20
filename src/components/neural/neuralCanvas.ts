import { DataPoint } from "@/data/neuralProblems";
import { NeuralWeights, forwardPass } from "./neuralMath";

export function renderNeuralCanvas(
  canvas: HTMLCanvasElement, weights: NeuralWeights, points: DataPoint[], algo: string = "mlp_sgd",
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const { width, height } = canvas;
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  const step = 4;
  for (let px = 0; px < width; px += step) {
    for (let py = 0; py < height; py += step) {
      const x = (px / width) * 2 - 1;
      const y = -((py / height) * 2 - 1);
      const { output } = forwardPass(x, y, weights, algo);
      const r = Math.floor(output * 220 + 20);
      const b = Math.floor((1 - output) * 220 + 20);

      for (let dx = 0; dx < step; dx++) {
        for (let dy = 0; dy < step; dy++) {
          if (px + dx < width && py + dy < height) {
            const idx = ((py + dy) * width + (px + dx)) * 4;
            data[idx] = r; data[idx + 1] = 40; data[idx + 2] = b; data[idx + 3] = 200;
          }
        }
      }
    }
  }
  ctx.putImageData(imgData, 0, 0);

  const style = typeof window !== "undefined" ? getComputedStyle(document.documentElement) : null;
  const borderHsl = style?.getPropertyValue("--border").trim() || "220 13% 88%";
  const destHsl = style?.getPropertyValue("--destructive").trim() || "0 84% 60%";
  const primHsl = style?.getPropertyValue("--primary").trim() || "217 91% 54%";
  const cardHsl = style?.getPropertyValue("--card").trim() || "0 0% 100%";

  ctx.strokeStyle = `hsl(${borderHsl})`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, height / 2); ctx.lineTo(width, height / 2);
  ctx.moveTo(width / 2, 0); ctx.lineTo(width / 2, height);
  ctx.stroke();

  for (const p of points) {
    const cx = ((p.x + 1) / 2) * width;
    const cy = ((-p.y + 1) / 2) * height;
    ctx.beginPath();
    ctx.arc(cx, cy, 7, 0, 2 * Math.PI);
    ctx.fillStyle = p.label === 1 ? `hsl(${destHsl})` : `hsl(${primHsl})`;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = `hsl(${cardHsl})`;
    ctx.stroke();
  }
}
