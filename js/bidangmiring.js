const massInput = document.getElementById("mass");
const angleInput = document.getElementById("angle");
const frictionInput = document.getElementById("friction");
const baseLengthInput = document.getElementById("baseLength");

const weightResult = document.getElementById("weightResult");
const wxResult = document.getElementById("wxResult");
const wyResult = document.getElementById("wyResult");
const velocityResult = document.getElementById("velocityResult");
const timeResult = document.getElementById("timeResult");

const startButton = document.getElementById("executeButton");
const stopButton = document.getElementById("stopButton");

const g = 9.8; // Percepatan gravitasi (m/s^2)
let animationFrame;
let isAnimating = false;

function calculatePhysics(mass, angle, friction, length) {
    const theta = (angle * Math.PI) / 180; 
    const weight = mass * g; 
    const wx = weight * Math.sin(theta); 
    const wy = weight * Math.cos(theta); 
    const frictionForce = friction * wy; 

    let acceleration = (wx - frictionForce) / mass;
    if (acceleration < 0) acceleration = 0; 

    const velocity = Math.sqrt(2 * acceleration * length);

    const time = acceleration > 0 ? velocity / acceleration : 0;

    return { weight, wx, wy, velocity, time };
}

function startSimulation() {
    const mass = parseFloat(massInput.value);
    const angle = parseFloat(angleInput.value);
    const friction = parseFloat(frictionInput.value);
    const length = parseFloat(baseLengthInput.value);

    const { weight, wx, wy, velocity, time } = calculatePhysics(
        mass, angle, friction, length
    );

    weightResult.textContent = `${weight.toFixed(2)} N`;
    wxResult.textContent = `${wx.toFixed(2)} N`;
    wyResult.textContent = `${wy.toFixed(2)} N`;
    velocityResult.textContent = `${velocity.toFixed(2)} m/s`;
    timeResult.textContent = `${time.toFixed(2)} s`;

    if (!isAnimating) {
        isAnimating = true;
        animateBox(velocity, time, length);
    }
}

function animateBox(velocity, time, length) {
    const startTime = performance.now();

    function animate(currentTime) {
        const elapsedTime = (currentTime - startTime) / 1000; 

        const remainingDistance = Math.max(length - (elapsedTime / time) * length, 0);

        drawScene(remainingDistance);

        if (remainingDistance > 0 && isAnimating) {
            animationFrame = requestAnimationFrame(animate);
        } else {
            isAnimating = false;
        }
    }

    animationFrame = requestAnimationFrame(animate);
}

function drawScene(distance) {
    const canvas = document.getElementById("simulationCanvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const angle = parseFloat(angleInput.value);
    const theta = (angle * Math.PI) / 180;
    const baseLength = parseFloat(baseLengthInput.value) * 25; 
    const inclineHeight = Math.tan(theta) * baseLength; 

    const startX = 30; 
    const startY = canvas.height - 30; 

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX + baseLength, startY);
    ctx.lineTo(startX + baseLength, startY - inclineHeight); 
    ctx.closePath();
    ctx.stroke();

   
    const x = startX + distance * (baseLength / parseFloat(baseLengthInput.value)); 
    const y = startY - (distance * Math.tan(theta) * (baseLength / parseFloat(baseLengthInput.value))); 

    ctx.save(); 

    
    ctx.translate(x + 10, y - 10);
    ctx.rotate(-theta);


    ctx.fillStyle = "#FF5733";
    ctx.fillRect(-10, -10, 20, 20); 

    ctx.restore(); 
}


window.onload = function() {
    drawScene(0);
};

startButton.addEventListener("click", startSimulation);
stopButton.addEventListener("click", () => {
    isAnimating = false;
    cancelAnimationFrame(animationFrame);
});

function resetSimulation() {
    massInput.value = 5;
    angleInput.value = 30;
    frictionInput.value = 0.25;
    baseLengthInput.value = 10;

    document.getElementById("angleDisplay").textContent = angleInput.value;
    document.getElementById("frictionDisplay").textContent = frictionInput.value;

    weightResult.textContent = "0.00 N";
    wxResult.textContent = "0.00 N";
    wyResult.textContent = "0.00 N";
    velocityResult.textContent = "0.00 m/s";
    timeResult.textContent = "0.00 s";

    const canvas = document.getElementById("simulationCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawScene(0);

    isAnimating = false;
    cancelAnimationFrame(animationFrame);
}

stopButton.addEventListener("click", resetSimulation);

baseLengthInput.addEventListener("input", () => {
    drawScene(0);
});

const saveButton = document.getElementById("saveButton");


function saveResults() {
    const mass = massInput.value;
    const angle = angleInput.value;
    const friction = frictionInput.value;
    const baseLength = baseLengthInput.value;

    const weight = weightResult.textContent;
    const wx = wxResult.textContent;
    const wy = wyResult.textContent;
    const velocity = velocityResult.textContent;
    const time = timeResult.textContent;

    const results = `
        Parameter:
        - Massa Beban (kg): ${mass}
        - Sudut (derajat): ${angle}
        - Koefisien Gesekan: ${friction}
        - Panjang Dasar (m): ${baseLength}

        Hasil Perhitungan:
        - Berat (W): ${weight}
        - Gaya kubus menuruni bidang (Wx): ${wx}
        - Komponen Berat sumbu-y (Wy): ${wy}
        - Kecepatan kotak: ${velocity}
        - Waktu sampai ke dasar: ${time}
    `;

    const blob = new Blob([results], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hasil_perhitungan_dan_parameter.txt';

    link.click();

    URL.revokeObjectURL(url);
}

saveButton.addEventListener("click", saveResults);
