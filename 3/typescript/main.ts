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
type GetNeighborsResult = {
    north?: string;
    south?: string;
    east?: string;
    west?: string;
    northEast?: string;
    northWest?: string;
    southEast?: string;
    southWest?: string;
}

export const getNeighbors = ({
    line,
    charIndex,
    lineAbove,
    lineBelow
}: GetNeighborsParams): GetNeighborsResult => {
    if (charIndex >= line.length) return {};

    return {
        north: lineAbove?.[charIndex],
        south: lineBelow?.[charIndex],
        east: line[charIndex + 1],
        west: line[charIndex - 1],
        northEast: lineAbove?.[charIndex + 1],
        northWest: lineAbove?.[charIndex - 1],
        southEast: lineBelow?.[charIndex + 1],
        southWest: lineBelow?.[charIndex - 1]
    };
}

export const getNumberNeighbors = ({
    line,
    charIndex,
    lineAbove,
    lineBelow
}: GetNeighborsParams): number[] => {
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
        if (northNumberStr !== '') result.push(Number(northNumberStr));
    } else {
        // Get northwest number
        let northwestNumberStr = '';
        let northwestIndex = charIndex;
        while (isNum(lineAbove?.[northwestIndex - 1])) {
            northwestNumberStr = lineAbove?.[northwestIndex - 1] + northwestNumberStr;
            northwestIndex--;
        }
        if (northwestNumberStr !== '') result.push(Number(northwestNumberStr));
    
        // Get northeast number
        let northeastNumberStr = '';
        let northeastIndex = charIndex;
        while (isNum(lineAbove?.[northeastIndex + 1])) {
            northeastNumberStr += lineAbove?.[northeastIndex + 1];
            northeastIndex++;
        }
        if (northeastNumberStr !== '') result.push(Number(northeastNumberStr));
    }

    // Get east number
    let eastNumberStr = '';
    let eastIndex = charIndex;
    while (isNum(line[eastIndex + 1])) {
        eastNumberStr += line[eastIndex + 1];
        eastIndex++;
    }
    if (eastNumberStr !== '') result.push(Number(eastNumberStr));

    // Get west number
    let westNumberStr = '';
    let westIndex = charIndex;
    while (isNum(line[westIndex - 1])) {
        westNumberStr = line[westIndex - 1] + westNumberStr;
        westIndex--;
    }
    if (westNumberStr !== '') result.push(Number(westNumberStr));

    return result;
}

// export const partOne = (input: string[]) => {
//     const partList: string[] = [];

//     for (let lineNo = 0; lineNo < input.length; lineNo++) {
//         let partNumber = '';
//         let includePart = false;

//         const line = input[lineNo];
//         line.split('').forEach((c, i) => {
//             const lineAbove = lineNo > 0 ? input[lineNo-1] : undefined;
//             const lineBelow = lineNo < input.length-1 ? input[lineNo+1] : undefined;

//             if (isNum(c)) {
//                 partNumber += c;
//                 const symbolNeighbors = getSymbolNeighbors({
//                     line, charIndex: i, lineAbove, lineBelow
//                 });
//                 if (symbolNeighbors.length > 0) {
//                     includePart = true;
//                 }
//             } else if (partNumber != '') {
//                 if (includePart) partList.push(partNumber);
//                 partNumber = '';
//                 includePart = false;
//             }
//         });
//         if (includePart) partList.push(partNumber);
//     };

//     return partList.reduce((acc, curr) => acc += Number(curr), 0);
// }
export const partOne = (input: string[]) => 0;

export const partTwo = (input: string[]) => {
    const gearRatios: number[] = [];

    for (let lineNo = 0; lineNo < input.length; lineNo++) {
        const line = input[lineNo];

        line.split('').forEach((c, i) => {
            const lineAbove = lineNo > 0 ? input[lineNo-1] : undefined;
            const lineBelow = lineNo < input.length-1 ? input[lineNo+1] : undefined;

            if (c === '*') {
                const neighbors = getNeighbors({
                    line, charIndex: i, lineAbove, lineBelow
                });
                if (isNum(neighbors.east) && isNum(neighbors.west)) {
                    // Numbers can extend to the left, so get the entire thing
                    const westNumberStr = '';
                    

                }
            }
        });
    };

    return gearRatios.reduce((acc, curr) => acc += Number(curr), 0);
}
