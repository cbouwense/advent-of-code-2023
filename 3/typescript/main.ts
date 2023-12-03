const isNum = (c?: string) =>
    c !== undefined && (
        c === '1' ||
        c === '2' ||
        c === '3' ||
        c === '4' ||
        c === '5' ||
        c === '6' ||
        c === '7' ||
        c === '8' ||
        c === '9' ||
        c === '0'
    );

export const isSymbol = (c: string) => 
    c !== '' && !isNum(c) && !(c === '.');

type GetNeighborsParams = {
    line: string;
    charIndex: number;
    lineAbove?: string;
    lineBelow?: string;
};

export const getNumberNeighbors = (params: GetNeighborsParams): number[] => {
    return getNeighbors(params).map(Number);
}

const getNeighbors = ({
    line,
    charIndex,
    lineAbove,
    lineBelow
}: GetNeighborsParams): string[] => {
    const result = [];

    // Get north number (skip northeast and northwest if this happens).
    let northNumberStr = '';
    let northIndex = charIndex;
    if (lineAbove !== undefined && isNum(lineAbove[northIndex])) {
        northNumberStr = lineAbove[northIndex];

        // Get northwest
        while (isNum(lineAbove[northIndex - 1])) {
            northNumberStr = lineAbove[northIndex - 1] + northNumberStr;
            northIndex--;
        }

        northIndex = charIndex;

        // Get northeast
        while (isNum(lineAbove[northIndex + 1])) {
            northNumberStr += lineAbove[northIndex + 1];
            northIndex++;
        }
        if (northNumberStr !== '') result.push(northNumberStr);
    } else {
        // Get northwest number
        let northwestNumberStr = '';
        let northwestIndex = charIndex;
        while (isNum(lineAbove?.[northwestIndex - 1])) {
            northwestNumberStr = lineAbove?.[northwestIndex - 1] + northwestNumberStr;
            northwestIndex--;
        }
        if (northwestNumberStr !== '') result.push(northwestNumberStr);
    
        // Get northeast number
        let northeastNumberStr = '';
        let northeastIndex = charIndex;
        while (isNum(lineAbove?.[northeastIndex + 1])) {
            northeastNumberStr += lineAbove?.[northeastIndex + 1];
            northeastIndex++;
        }
        if (northeastNumberStr !== '') result.push(northeastNumberStr);
    }

    // Get south number (skip southeast and southwest if this happens).
    let southNumberStr = '';
    let southIndex = charIndex;
    if (lineBelow !== undefined && isNum(lineBelow[southIndex])) {
        southNumberStr = lineBelow[southIndex];

        // Get southwest
        while (isNum(lineBelow[southIndex - 1])) {
            southNumberStr = lineBelow[southIndex - 1] + southNumberStr;
            southIndex--;
        }

        southIndex = charIndex;

        // Get southeast
        while (isNum(lineBelow[southIndex + 1])) {
            southNumberStr += lineBelow[southIndex + 1];
            southIndex++;
        }
        if (southNumberStr !== '') result.push(southNumberStr);
    } else {
        // Get southwest number
        let southwestNumberStr = '';
        let southwestIndex = charIndex;
        while (isNum(lineBelow?.[southwestIndex - 1])) {
            southwestNumberStr = lineBelow?.[southwestIndex - 1] + southwestNumberStr;
            southwestIndex--;
        }
        if (southwestNumberStr !== '') result.push(southwestNumberStr);
    
        // Get southeast number
        let southeastNumberStr = '';
        let southeastIndex = charIndex;
        while (isNum(lineBelow?.[southeastIndex + 1])) {
            southeastNumberStr += lineBelow?.[southeastIndex + 1];
            southeastIndex++;
        }
        if (southeastNumberStr !== '') result.push(southeastNumberStr);
    }

    // Get east number
    let eastNumberStr = '';
    let eastIndex = charIndex;
    while (isNum(line[eastIndex + 1])) {
        eastNumberStr += line[eastIndex + 1];
        eastIndex++;
    }
    if (eastNumberStr !== '') result.push(eastNumberStr);

    // Get west number
    let westNumberStr = '';
    let westIndex = charIndex;
    while (isNum(line[westIndex - 1])) {
        westNumberStr = line[westIndex - 1] + westNumberStr;
        westIndex--;
    }
    if (westNumberStr !== '') result.push(westNumberStr);

    return result;
}

export const partOne = (input: string[]) => {
    let parts: number[] = [];

    for (let lineNo = 0; lineNo < input.length; lineNo++) {
        const line = input[lineNo];

        line.split('').forEach((c, i) => {
            const lineAbove = lineNo > 0 ? input[lineNo-1] : undefined;
            const lineBelow = lineNo < input.length-1 ? input[lineNo+1] : undefined;

            if (isSymbol(c)) {
                getNumberNeighbors({ line, lineAbove, lineBelow, charIndex: i })
                    .forEach(n => parts.push(n))
            }
        });
    }

    return [...parts].reduce((acc, curr) => acc += curr, 0);
};

export const partTwo = (input: string[]) => {
    const gearRatios: number[] = [];

    for (let lineNo = 0; lineNo < input.length; lineNo++) {
        const line = input[lineNo];

        line.split('').forEach((c, i) => {
            const lineAbove = lineNo > 0 ? input[lineNo-1] : undefined;
            const lineBelow = lineNo < input.length-1 ? input[lineNo+1] : undefined;

            if (c === '*') {
                const neighbors = getNumberNeighbors({ line, charIndex: i, lineAbove, lineBelow });
                if (neighbors.length > 1) {
                    gearRatios.push(neighbors.reduce((acc, curr) => acc *= curr, 1));
                }
            }
        });
    };

    return gearRatios.reduce((acc, curr) => acc += Number(curr), 0);
}
