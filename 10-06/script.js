let rootDiv = document.querySelector("#root");

let genreData = ["rock", "pop", "jazz", "classical", "hip-hop"];

let selectElement = document.createElement("select");
rootDiv.apeend(selectElement);

selectElement.addEventListener("change",  e => console.log("CHANGED"));

for (let genre of genreData) {
    let optionElement = document.createElement("option");
    optionElement.value = genre;
    optionElement.innerHTML = genre;
    selectElement.append(optionElement);
}