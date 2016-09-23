interface PlayerStats {
    wins: number;
    losses: number;
    moves: Array<{ count: number, wins: number, losses: number, ties: number }>;
}