const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdown = document.querySelectorAll(".country-currencies select");

let btn = document.querySelector(".btn")
let fromval = document.querySelector(".from select");
let toval = document.querySelector(".to select");
let output = document.querySelector(".output");
let realvalue = document.querySelector(".real-value");

for (let select of dropdown) {
    for (code in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = code;
        newoption.value = code;
        if (select.name === "from" && code === "USD") {
            newoption.selected = "selected";
        }
        if (select.name === "to" && code === "INR") {
            newoption.selected = "selected";
        }
        select.append(newoption);
    }

    select.addEventListener("change", (evt) => {
        updateflag(evt.target);
    })
}

function updateflag(element) {
    // console.log(element);
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}
btn.addEventListener("click", async (evt) => {
    let amount = document.querySelector(".value-container input");
    let amtvalue = amount.value.trim();

    //entered value
    console.log(amtvalue);

    if (amtvalue === "" || amtvalue < 1) {
        amtvalue = 1;
        amount.value = "1";
    }
    let fromcurrency = fromval.value.toLowerCase();
    let tocurrency = toval.value.toLowerCase();


    let url = `${BASE_URL}/${fromcurrency}.json`;


    let response = await fetch(url);
    let data = await response.json();
    let final = data[fromcurrency][tocurrency];
    //currency value
    console.log(final);
    realvalue.innerHTML = "";
    let p1 = document.createElement("p");
    p1.innerText = `1 ${fromcurrency.toUpperCase()}= ${final} ${tocurrency.toUpperCase()}`;
    realvalue.appendChild(p1);

    //converison

    let answer = amtvalue * final;
    console.log(answer);
    output.innerText = "";
    let p = document.createElement("p");
    p.innerText = `${amtvalue} ${fromcurrency.toUpperCase()} = ${answer} ${tocurrency.toUpperCase()}`;
    output.appendChild(p);

})


