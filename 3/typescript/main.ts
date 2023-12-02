const isNum = (c: string) =>
    c === '1' ||
    c === '2' ||
    c === '3' ||
    c === '4' ||
    c === '5' ||
    c === '6' ||
    c === '7' ||
    c === '8' ||
    c === '9' ||
    c === '0';

export const isSymbol = (c: string) => 
    c !== '' && !isNum(c) && !(c === '.');

type GetNeighborsParams = {
    line: string;
    charIndex: number;
    lineAbove?: string;
    lineBelow?: string;
};
export const getNeighbors = ({
    line,
    charIndex,
    lineAbove,
    lineBelow
}: GetNeighborsParams) => {
    if (charIndex >= line.length) return [];

    return [
        lineAbove?.[charIndex],
        lineBelow?.[charIndex],
        line[charIndex + 1],
        line[charIndex - 1],
        lineAbove?.[charIndex + 1],
        lineAbove?.[charIndex - 1],
        lineBelow?.[charIndex + 1],
        lineBelow?.[charIndex - 1]
    ]
        .filter(n => n !== undefined);
}

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

const partOne = (input: string[]) => {
    input.forEach(line => {
        let partNumber = '';
        let includePart = false;

        line.split('').forEach(c => {
            // console.log(c)
        });
    });
}

// console.log(partOne(example))