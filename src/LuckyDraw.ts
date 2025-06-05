export class LuckyDraw {
    private participants: string[];

    constructor(participants: string[]) {
        this.participants = participants;
    }

    drawWinner(): string {
        const randomIndex = Math.floor(Math.random() * this.participants.length);
        return this.participants[randomIndex];
    }

    drawNWinners(n: number): string[] {
        const winners = new Set<string>();

        if (n > this.participants.length) {
            throw new Error("Cannot draw more winners than participants.");
        }

        while (winners.size < n) {
            const winner = this.drawWinner();
            winners.add(winner);
        }

        return Array.from(winners);
    }
}
