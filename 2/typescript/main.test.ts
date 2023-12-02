import { colorCount, gameNumber, parseHandfullsFromGame } from './main';

const example = [
    'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
    'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
    'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
    'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
    'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',
];

describe('gameNumber', () => {
    it('returns 0 given an empty string', () => {
        expect(gameNumber('')).toBe(0);
    });

    it('returns 1 given game 1', () => {
        expect(gameNumber(example[0])).toBe(1);
    });

    it('returns 2 given game 2', () => {
        expect(gameNumber(example[1])).toBe(2);
    });

    it('returns 3 given game 3', () => {
        expect(gameNumber(example[2])).toBe(3);
    });

    it('returns 4 given game 4', () => {
        expect(gameNumber(example[3])).toBe(4);
    });

    it('returns 42', () => {
        expect(gameNumber('Game 42: asdf')).toBe(42);
    });    
});

describe('parseHandfullsFromGame', () => {
    it('return an empty array if line is empty', () => {
        expect(parseHandfullsFromGame('')).toEqual([]);
    });

    it('returns tokens for game 1', () => {
        expect(parseHandfullsFromGame(example[0])).toEqual([
            '3 blue, 4 red',
            '1 red, 2 green, 6 blue',
            '2 green'
        ])
    });
});

describe('colorCount', () => {
    it('returns 0 given an empty string', () => {
        expect(colorCount('', 'red')).toBe(0);
    });

    it('returns 4 given there are 4 reds', () => {
        expect(colorCount('3 blue, 4 red', 'red')).toBe(4);
    });

    it('returns 3 given there are 3 blue', () => {
        expect(colorCount('3 blue, 4 red', 'blue')).toBe(3);
    });

    it('returns 3 given there are none of a given color', () => {
        expect(colorCount('3 blue, 4 red', 'green')).toBe(0);
    });
});
