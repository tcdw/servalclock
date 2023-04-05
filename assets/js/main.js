import { initCanvas, downloadCanvas } from "./canvas.js";
import { initShare } from "./share.js";

document.getElementById('dl-btn').addEventListener('click', downloadCanvas);

initCanvas();
initShare();
