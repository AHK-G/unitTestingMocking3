import { LuckyDraw } from "../src/LuckyDraw";

describe("LuckyDraw", () => {
  it("should creat an intance of luckyDraw", () => {
    const draw = new LuckyDraw(["Javier", "Arash"]);

    expect(draw).toBeDefined();
  });

  it("should draw a random winner", () => {
    const originalMathRandom = Math.random;

    Math.random = jest.fn(() => 0);
    const luckyDraw = new LuckyDraw(["Javier", "Arash"]);

    const drawResult = luckyDraw.drawWinner();

    expect(drawResult).toBe("Javier");

    Math.random = originalMathRandom;
  });

  it("should draw 2 winners", () => {
    const originalMathRandom = Math.random;

    Math.random = jest.fn().mockReturnValueOnce(0).mockReturnValueOnce(0.25);
    const luckyDraw = new LuckyDraw(["Javier", "Arash", "Rick", "Morty"]);

    const winners = luckyDraw.drawNWinners(2);

    expect(winners).toStrictEqual(["Javier", "Arash"]);

    Math.random = originalMathRandom;
  });

  it("shoul throw an error when trying to draw more winners than existing participants", () => {
    const luckyDraw = new LuckyDraw(["Javier", "Arash", "Rick", "Morty"]);

    const drawError = () => luckyDraw.drawNWinners(5);

    expect(drawError).toThrow("Cannot draw more winners than participants.");
  });
});
