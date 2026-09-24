import '@testing-library/jest-dom';

// Mock canvas getContext for tests
HTMLCanvasElement.prototype.getContext = (() => {
  return {
    fillRect: () => {},
    clearRect: () => {},
    getImageData: (x: number, y: number, w: number, h: number) => ({
      data: new Array(w * h * 4).fill(0)
    }),
    putImageData: () => {},
    createImageData: (w: number, h: number) => ({
      data: new Array(w * h * 4).fill(0)
    }),
    setTransform: () => {},
    drawImage: () => {},
    save: () => {},
    fillText: () => {},
    restore: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    closePath: () => {},
    stroke: () => {},
    arc: () => {},
    fill: () => {},
  } as any;
}) as any;

// Mock window.scrollTo
window.scrollTo = (() => {}) as any;
