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
export const getSymbolNeighbors = (params: GetNeighborsParams) => {
    return getNeighbors(params).filter(isSymbol);
}

export const getNeighbors = ({
    line,
    charIndex,
    lineAbove,
    lineBelow
}: GetNeighborsParams): string[] => {
    if (charIndex >= line.length) return [];

    // TS Can't seem to realize that I'm filtering out undefineds. I think
    // I need a type guard and I don't want to write one.
    // @ts-ignore
    return [
        lineAbove?.[charIndex],
        lineBelow?.[charIndex],
        line[charIndex + 1],
        line[charIndex - 1],
        lineAbove?.[charIndex + 1],
        lineAbove?.[charIndex - 1],
        lineBelow?.[charIndex + 1],
        lineBelow?.[charIndex - 1]
    ].filter(n => n !== undefined);
}

export const partOne = (input: string[]) => {
    const partList: string[] = [];

    for (let lineNo = 0; lineNo < input.length; lineNo++) {
        let partNumber = '';
        let includePart = false;

        const line = input[lineNo];
        line.split('').forEach((c, i) => {
            const lineAbove = lineNo > 0 ? input[lineNo-1] : undefined;
            const lineBelow = lineNo < input.length-1 ? input[lineNo+1] : undefined;

            if (isNum(c)) {
                partNumber += c;
                const symbolNeighbors = getSymbolNeighbors({
                    line, charIndex: i, lineAbove, lineBelow
                });
                if (symbolNeighbors.length > 0) {
                    includePart = true;
                }
            } else if (partNumber != '') {
                if (includePart) partList.push(partNumber);
                partNumber = '';
                includePart = false;
            }
        });
        if (includePart) partList.push(partNumber);
    };

    return partList.reduce((acc, curr) => acc += Number(curr), 0);
}
