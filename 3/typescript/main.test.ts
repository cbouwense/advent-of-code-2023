import { getNeighbors, isSymbol } from './main';

const example = [
    '467..114..',
    '...*......',
    '..35..633.',
    '......#...',
    '617*......',
    '.....+.58.',
    '..592.....',
    '......755.',
    '...$.*....',
    '.664.598..'
];

describe('isSymbol', () => {
    it('returns false given an empty string', () => {
        expect(isSymbol('')).toBe(false);
    });

    it('returns false given a number', () => {
        expect(isSymbol('1')).toBe(false);
    });

    it('returns false given a period', () => {
        expect(isSymbol('.')).toBe(false);
    });

    it('returns true given a hash', () => {
        expect(isSymbol('#')).toBe(true);
    });

    it('returns true given a forward slash', () => {
        expect(isSymbol('/')).toBe(true);
    });

    it('returns true given a forward slash', () => {
        expect(isSymbol('\\')).toBe(true);
    });
});

describe('getNeighbors', () => {
    it('returns an empty object given an empty line', () => {
        expect(getNeighbors({ line: '', charIndex: 0 })).toEqual(expect.arrayContaining([]));
    });

    it('returns all cardinal directions', () => {
        const lineAbove = 'abc';
        const line      = 'd1e';
        const lineBelow = 'fgh';
        const charIndex = 1;

        expect(getNeighbors({ line, charIndex, lineAbove, lineBelow }))
            .toEqual(expect.arrayContaining(['b','g','e','d','c','a','h','f']));
    });

    it('does not return anything north if there is no line above', () => {
        const line      = 'd1e';
        const lineBelow = 'fgh';
        const charIndex = 1;

        expect(getNeighbors({ line, charIndex, lineBelow })).toEqual(expect.arrayContaining([
            'g',
            'e',
            'd',
            'h',
            'f',
        ]));
    });

    it('does not return anything south if there is no line below', () => {
        const lineAbove = 'abc';
        const line      = 'd1e';
        const charIndex = 1;

        expect(getNeighbors({ line, charIndex, lineAbove })).toEqual(expect.arrayContaining([
            'b',
            'e',
            'd',
            'c',
            'a'
        ]));
    });

    it('does not return anything east if the char index is at the end of the line', () => {
        const lineAbove = 'ab';
        const line      = 'd1';
        const lineBelow = 'fg';
        const charIndex = 1;

        expect(getNeighbors({ line, charIndex, lineAbove, lineBelow })).toEqual(expect.arrayContaining([
            'b',
            'g',
            'd',
            'a',
            'f',
        ]));
    });

    it('does not return anything west if the char index is at the beginning of the line', () => {
        const lineAbove = 'bc';
        const line      = '1e';
        const lineBelow = 'gh';
        const charIndex = 0;

        expect(getNeighbors({ line, charIndex, lineAbove, lineBelow })).toEqual(expect.arrayContaining([
            'b',
            'g',
            'e',
            'c',
            'h',
        ]));
    });

    it('returns an empty object given a char index that is longer than the line length', () => {
        const lineAbove = 'abc';
        const line      = 'd1e';
        const lineBelow = 'fgh';
        const charIndex = 3;

        expect(getNeighbors({ line, charIndex, lineAbove, lineBelow })).toEqual(expect.arrayContaining([]));
    });

    it('returns the correct neighbors for the first 4 in the example', () => {
        const line      = '467..114..';
        const lineBelow = '...*......';
        const charIndex = 0;

        expect(getNeighbors({ line, charIndex, lineBelow })).toEqual(expect.arrayContaining([
            '6',
            '.',
            '.'
        ]));
    });

    it('returns the correct neighbors for the first 4 in the example', () => {
        const lineAbove = '467..114..';
        const line      = '...*......';
        const lineBelow = '..35..633.';
        const charIndex = 3;

        expect(getNeighbors({ line, charIndex, lineAbove, lineBelow })).toEqual(expect.arrayContaining([
            '.',
            '5',
            '.',
            '.',
            '.',
            '7',
            '.',
            '3'
        ]));
    });
});
