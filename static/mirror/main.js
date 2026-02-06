const input = document.getElementById('input');
const consoleOutput = document.getElementById('console');
const mirrorRadios = document.querySelectorAll('input[name="mirror"]');
const copyButton = document.getElementById('copyButton');
const clearButton = document.getElementById('clearButton');
const mirrorLabels = document.querySelectorAll('.mirror-label');

function processMirror() {
    const lines = input.value.split('\n');
    const mirrorMode = document.querySelector('input[name="mirror"]:checked').value;

    const processedLines = lines.map(line => {
        // Process moveToPoint commands regex ...(x, y,...) -> ...( -x, y)
        {
            const moveRegex = /(kw::|chassis\.)moveToPoint\(\s*(-?\d+\.?\d*)(\s*,\s*)(-?\d+\.?\d*)/;
            const matches = line.match(moveRegex);
            if (matches) {
            const [, prefix, x, commaSep, y] = matches;
            if (mirrorMode === 'X') {
                const flippedX = (-parseFloat(x)).toString();
                line = line.replace(moveRegex, `${prefix}moveToPoint(${flippedX}${commaSep}${y}`);
            } else {
                const flippedY = (-parseFloat(y)).toString();
                line = line.replace(moveRegex, `${prefix}moveToPoint(${x}${commaSep}${flippedY}`);
            }
            }
        }

        // Process turnToAngle commands
        if (line.includes('kw::turnToAngle(') || line.includes('chassis.turnToHeading(')) {
            const matches = line.match(/(kw::turnToAngle|chassis\.turnToHeading)\(\s*(-?\d+\.?\d*)/);
            if (matches) {
            const [, fn, angle] = matches;
            let a = parseFloat(angle) % 360;
            if (a < 0) a += 360;
            const flippedAngle = (360 - a) % 360;
            line = line.replace(/(kw::turnToAngle|chassis\.turnToHeading)\(\s*-?\d+\.?\d*/, `${fn}(${flippedAngle}`);
            }
        }

        // Process boomerang commands
        if (line.includes('kw::boomerang(')) {
            const boomerangRegex = /(kw::boomerang)\(\s*(-?\d+\.?\d*)(\s*,\s*)(-?\d+\.?\d*)(\s*,\s*)(-?\d+\.?\d*)/;
            const matches = line.match(boomerangRegex);
            if (matches) {
                const [, fn, x, commaSep1, y, commaSep2, angle] = matches;
                const flippedX = mirrorMode === 'X' ? (-parseFloat(x)).toString() : x;
                const flippedY = mirrorMode === 'X' ? y : (-parseFloat(y)).toString();
                let a = parseFloat(angle) % 360;
                if (a < 0) a += 360;
                const flippedAngle = (360 - a) % 360;
                line = line.replace(
                    boomerangRegex,
                    `${fn}(${flippedX}${commaSep1}${flippedY}${commaSep2}${flippedAngle}`
                );
            }
        }
        

        return line;
    });

    consoleOutput.textContent = processedLines.join('\n');
}

input.addEventListener('input', processMirror);

mirrorRadios.forEach((radio, index) => {
    radio.addEventListener('change', processMirror);
    mirrorLabels[index].addEventListener('click', () => {
        radio.checked = true;
        processMirror();
    });
});

copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(consoleOutput.textContent);
    copyButton.textContent = 'Copied!';
    setTimeout(() => {
        copyButton.textContent = 'Copy Results';
    }, 1500);
});

clearButton.addEventListener('click', () => {
    input.value = '';
    consoleOutput.textContent = 'Processed results will appear here...';
});