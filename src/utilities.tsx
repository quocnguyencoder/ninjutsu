// Define our labelmap
const labelMap: any = {
  1: { name: "bird", color: "red" },
  2: { name: "boar", color: "yellow" },
  3: { name: "dog", color: "lime" },
  4: { name: "dragon", color: "blue" },
  5: { name: "hare", color: "purple" },
  6: { name: "horse", color: "purple" },
  7: { name: "monkey", color: "purple" },
  8: { name: "ox", color: "purple" },
  9: { name: "ram", color: "purple" },
  10: { name: "rat", color: "purple" },
  11: { name: "snake", color: "purple" },
  12: { name: "tiger", color: "purple" },
};

// Define a drawing function
export const drawRect = (
  boxes: any,
  classes: any,
  scores: any,
  threshold: any,
  imgWidth: number,
  imgHeight: number,
  ctx: CanvasRenderingContext2D
) => {
  for (let i = 0; i <= boxes.length; i++) {
    if (boxes[i] && classes[i] && scores[i] > 0.6) {
      console.log(scores[i]);
      // Extract variables
      const [y, x, height, width] = boxes[i];
      const text = classes[i];

      // Set styling
      ctx.strokeStyle = labelMap[text]["color"];
      ctx.lineWidth = 10;
      ctx.fillStyle = "white";
      ctx.font = "30px Arial";

      // DRAW!!
      ctx.beginPath();
      ctx.fillText(
        labelMap[text]["name"] + " - " + Math.round(scores[i] * 100) / 100,
        x * imgWidth,
        y * imgHeight - 10
      );
      ctx.rect(
        x * imgWidth,
        y * imgHeight,
        (width * imgWidth) / 2,
        (height * imgHeight) / 1.5
      );
      ctx.stroke();
      console.log(labelMap[text]["name"]);
    }
  }
};
