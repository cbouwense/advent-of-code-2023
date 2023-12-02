const isNumeric = (str: string) => !isNaN(Number(str));

const extractNumbersFromLine = (line: string) => {
    let result = '';

    for (let i = 0; i < line.length; i++) {
        if (isNumeric(line.charAt(i))) {
            result += line.charAt(i);
        }
    }

    return result;
}

const firstAndLast = (line: string) => {
    if (line.length === 0) return '';
    if (line.length === 1) return line + line;
    if (line.length === 2) return line;
    
    return line.slice(0) + line.slice(-1);
}

const solution = (lines: string[]) =>
    lines
        .map(extractNumbersFromLine)
        .map(firstAndLast)
        .map(Number)
        .reduce((acc, curr) => acc + curr, 0);
