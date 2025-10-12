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
        if (line.includes('kw::moveToPoint(')) {
            const matches = line.match(/kw::moveToPoint\((-?\d+\.?\d*),\s*(-?\d+\.?\d*),/);
            if (matches) {
                const [fullMatch, x, y] = matches;
                if (mirrorMode === 'X') {
                    line = line.replace(x, (-parseFloat(x)).toString());
                } else {
                    line = line.replace(y, (-parseFloat(y)).toString());
                }
            }
        }

        // Process turnToAngle commands
        if (line.includes('kw::turnToAngle(')) {
            const matches = line.match(/kw::turnToAngle\((\d+\.?\d*),/);
            if (matches) {
                const [fullMatch, angle] = matches;
                const flippedAngle = (360 - parseFloat(angle)) % 360;
                line = line.replace(angle, flippedAngle.toString());
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