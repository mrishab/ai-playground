export function getCanvasCoords(
  e: { clientX: number; clientY: number },
  svgRef: React.RefObject<SVGSVGElement | null>,
): { x: number; y: number } {
  if (!svgRef.current) return { x: 300, y: 200 };
  const rect = svgRef.current.getBoundingClientRect();
  const width = rect.width > 0 ? rect.width : 640;
  const height = rect.height > 0 ? rect.height : 420;
  const scaleX = 640 / width;
  const scaleY = 420 / height;
  const rawX = (e.clientX - (rect.left || 0)) * scaleX;
  const rawY = (e.clientY - (rect.top || 0)) * scaleY;
  const x = Math.max(30, Math.min(610, Math.round((Number.isNaN(rawX) ? 100 : rawX) * 10) / 10));
  const y = Math.max(30, Math.min(390, Math.round((Number.isNaN(rawY) ? 100 : rawY) * 10) / 10));
  return { x, y };
}

export function computeEdgePoints(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  radius: number = 22,
) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < 1) return { startX: x1, startY: y1, endX: x2, endY: y2, midX: x1, midY: y1 };
  const uX = dx / dist;
  const uY = dy / dist;
  return {
    startX: x1 + uX * radius,
    startY: y1 + uY * radius,
    endX: x2 - uX * radius,
    endY: y2 - uY * radius,
    midX: (x1 + x2) / 2,
    midY: (y1 + y2) / 2,
  };
}
