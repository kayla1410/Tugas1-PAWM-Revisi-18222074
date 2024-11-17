let leftWeight = 0;
let rightWeight = 0;

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("weight", event.target.getAttribute("data-weight"));
}

function drop(event, side) {
    event.preventDefault();
    let weight = parseInt(event.dataTransfer.getData("weight"));
    let target = document.getElementById(side + '-load');

    if (side === 'left') {
        leftWeight += weight;
    } else if (side === 'right') {
        rightWeight += weight;
    }

    let weightElement = document.createElement('div');
    weightElement.innerHTML = `${weight} kg`;
    weightElement.className = 'placed-weight';
    target.appendChild(weightElement);

    updateBalance();
}

function updateBalance() {
    let beam = document.getElementById("beam");
    let balance = rightWeight - leftWeight;
    let angle = Math.min(Math.max(balance * 5, -30), 30); 

    beam.style.transform = `rotate(${angle}deg)`;
}

function reset() {
    leftWeight = 0;
    rightWeight = 0;

    document.getElementById("beam").style.transform = "rotate(0deg)";

    let leftLoad = document.getElementById("left-load");
    let rightLoad = document.getElementById("right-load");

    leftLoad.innerHTML = "";
    rightLoad.innerHTML = "";
}

function saveProgress() {
    let progress = {
        leftWeight: leftWeight,
        rightWeight: rightWeight
    };
    
    localStorage.setItem("simulatorProgress", JSON.stringify(progress));
    alert("Progress has been saved!");
}
