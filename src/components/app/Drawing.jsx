export const drawRect = (detection, ctx) => {
  detection.forEach((prediction) => {
    const [x, y, width, height] = prediction["bbox"];
    const text = prediction["class"];

    ctx.strokeStyle = "green";
    ctx.font = "18px Arial";
    ctx.fillStyle = "red";

    ctx.beginPath();
    ctx.fillText(text, x, y);
    ctx.rect(x, y, width, height);
    ctx.stroke();
  });
};
