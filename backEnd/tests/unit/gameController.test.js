import { describe, it, expect, vi, afterEach, beforeEach, afterAll, beforeAll } from 'vitest';
import * as gameController from '../../src/controllers/GameController.js';
import { players, stats, games, rounds, playerRounds, playerGames } from '../utils/mockData.js';
import db from '../../src/models/index.js';

const { Game, PlayerGame, Round} = db;

vi.mock('../../src/models/index.js', () => ({
    default: {
        Game: { create: vi.fn() },
        PlayerGame: { create: vi.fn() },
        Round: { create: vi.fn() },
    }
}));

describe('Game Controller', () => {
    const mockDate = new Date('2024-01-01T00:00:00Z');

    beforeAll(() => {
        vi.useFakeTimers();
        vi.setSystemTime(mockDate);
    });
    
    afterAll(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    beforeEach(() => {
        vi.clearAllMocks();
    });


    describe('createGame', () => {
        it('should create a game and return 201', async () => {
            const req = { body: { players: [1, 2], rounds_needed: 5 } }; 
            const res = { status: vi.fn().mockReturnThis(), json: vi.fn(), };

            const gameCreate = vi.spyOn(Game, 'create').mockResolvedValue({ 
                 id: 1,
                 date_played: mockDate,
                 finished: false,
                 rounds_needed: 5,
                 players: [1, 2] });
            const playerGameCreate = vi.spyOn(PlayerGame, 'create').mockResolvedValue({ id: 1});
            const roundCreate = vi.spyOn(Round, 'create').mockResolvedValue({ id: 1, round_number: 1 });

            await gameController.createGame(req, res);

            expect(gameCreate).toHaveBeenCalledWith({ rounds_needed: 5, players: [1, 2] });
            expect(playerGameCreate).toHaveBeenCalledTimes(2);
            expect(playerGameCreate).toHaveBeenNthCalledWith(1, { game_id: 1, player_id: 1 });
            expect(playerGameCreate).toHaveBeenNthCalledWith(2, { game_id: 1, player_id: 2 });
            expect(roundCreate).toHaveBeenCalledWith({ game_id: 1, round_number: 1 });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: "Game Created",
                round_info: { id: 1, round_number: 1 },
                game_info: {
                    id: 1,
                    date_played: mockDate,
                    finished: false,
                    rounds_needed: 5,
                    players: [1, 2],
                },
            });
        });
            
        it('should return 500 if there is an error', async () => {
            const req = { body: { players: [1, 2], rounds_needed: 5 } };
            const res = { status: vi.fn().mockReturnThis(), json: vi.fn(), };

            const gameCreate = vi.spyOn(Game, 'create').mockRejectedValue(new Error('DB Error'));

            await gameController.createGame(req, res);

            expect(gameCreate).toHaveBeenCalledWith({ rounds_needed: 5, players: [1, 2] });
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
        });
    });
});