export class TailwindColor {
  private colors: string[];
  private range: {
    min: number;
    max: number;
  };
  private prefix: string;
  private tempColors: string[];
  constructor(options) {
    const {
      colors = [
        "gray",
        "red",
        "yellow",
        "green",
        "blue",
        "indigo",
        "purple",
        "pink",
      ],
      range = [1, 9],
      prefix = "bg",
    } = options || {};

    this.colors = colors;
    this.range = {
      min: range[0],
      max: range[1],
    };
    this.prefix = prefix;

    this.tempColors = [];
  }

  pick() {
    const number = this.random(this.range.min, this.range.max) * 100;
    const indexColor = this.random(0, this.colors.length - 1);
    return `${this.prefix}-${this.colors[indexColor]}-${number}`;
  }

  color(colors = "") {
    const isArray = Array.isArray(colors);
    if (!isArray) this.tempColors.push(colors);
    else colors.forEach((color) => this.tempColors.push(color));
    return this;
  }

  add() {
    this.tempColors.forEach((color) => this.colors.push(color));
  }

  remove() {
    this.tempColors.forEach((color) => {
      const index = this.colors.indexOf(color);
      if (index >= 0) this.colors.splice(index, 1);
    });
  }

  random(min = 1, max = 9) {
    return Math.floor(Math.random() * max) + min;
  }
}
