import bird from "../images/handseals/bird.png";
import boar from "../images/handseals/boar.png";
import dog from "../images/handseals/dog.png";
import dragon from "../images/handseals/dragon.png";
import hare from "../images/handseals/hare.png";
import horse from "../images/handseals/horse.png";
import monkey from "../images/handseals/monkey.png";
import ox from "../images/handseals/ox.png";
import ram from "../images/handseals/ram.png";
import rat from "../images/handseals/rat.png";
import snake from "../images/handseals/snake.png";
import tiger from "../images/handseals/tiger.png";

export const handSeals: any = {
  1: { name: "bird", color: "red", img: `${bird}` },
  2: { name: "boar", color: "yellow", img: `${boar}` },
  3: { name: "dog", color: "lime", img: `${dog}` },
  4: { name: "dragon", color: "blue", img: `${dragon}` },
  5: { name: "hare", color: "purple", img: `${hare}` },
  6: { name: "horse", color: "red", img: `${horse}` },
  7: { name: "monkey", color: "yellow", img: `${monkey}` },
  8: { name: "ox", color: "lime", img: `${ox}` },
  9: { name: "ram", color: "blue", img: `${ram}` },
  10: { name: "rat", color: "purple", img: `${rat}` },
  11: { name: "snake", color: "red", img: `${snake}` },
  12: { name: "tiger", color: "yellow", img: `${tiger}` },
  13: { name: "clone", color: "lime", img: "clone" },
  14: { name: "clap", color: "blue", img: "clap" },
};

// Define a drawing function
export const drawRect = (
  boxes: any,
  classes: any,
  scores: any,
  threshold: number,
  imgWidth: number,
  imgHeight: number,
  ctx: CanvasRenderingContext2D
) => {
  for (let i = 0; i <= boxes.length; i++) {
    if (boxes[i] && classes[i] && scores[i] > threshold) {
      console.log(scores[i]);
      // Extract variables
      const [y, x, height, width] = boxes[i];
      const text = classes[i];

      // Set styling
      ctx.strokeStyle = handSeals[text]["color"];
      ctx.lineWidth = 10;
      ctx.fillStyle = "white";
      ctx.font = "30px Arial";

      // DRAW!!
      ctx.beginPath();
      ctx.fillText(
        handSeals[text]["name"] + " - " + Math.round(scores[i] * 100) / 100,
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
      console.log(handSeals[text]["name"]);
    }
  }
};
