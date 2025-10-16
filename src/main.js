import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";
import * as bootstrap from 'bootstrap';
import { fillTable, generateTeams, fillCardTeams } from "./functions";

const form = document.getElementById("form");
const inputName = document.querySelector("#name");
const table = document.querySelector("#table>tbody");
const generatebtn = document.querySelector("#generate")
const numberOfTeam = document.querySelector("#numberOfTeam");
const modalEl = document.getElementById('modal');
const modal = new bootstrap.Modal(modalEl);
const error = document.getElementById("error");
const rest = document.querySelector("#reset");

const cardContainer = document.querySelector("#card-teams")

const caption = document.querySelector("#caption");

modalEl.addEventListener('shown.bs.modal', () => {
  numberOfTeam.focus()
})

let names = [

];

if (localStorage.getItem("names")) {
  names = JSON.parse(localStorage.getItem("names"));
  fillTable(names, table);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = inputName.value;
  names.push({ name, group: "" });
  names = names.map(el => { el.group = ""; return el });
  fillTable(names, table);
  inputName.value = "";
  caption.style.display = "none";
  cardContainer.innerHTML = "";
});

generatebtn.addEventListener("click", (e) => {
  e.preventDefault()
  if (numberOfTeam.value == "") {
    error.innerHTML = "Enter le nombre de chaque equipe "
    return;
  }
  if (names.length == 0) {
    alert("Entre les nom")
    modal.hide();
    return;
  }
  localStorage.setItem("names", JSON.stringify(names));
  const randomTeams = generateTeams(names, +numberOfTeam.value, Math.floor(names.length / +numberOfTeam.value));
  modal.hide();
  randomTeams.sort((a, b) => a.group - b.group);
  fillTable(randomTeams, table);
  fillCardTeams(randomTeams, cardContainer, +numberOfTeam.value);
  caption.style.display = "block";
  numberOfTeam.value = "";
  error.innerHTML = "";
})


rest.addEventListener("click", () => {
  names = [];
  table.innerHTML = `<tr>
          <td colspan="3">Rien a afficher</td>
        </tr>`;
  caption.style.display = "none";
  cardContainer.innerHTML = "";
  localStorage.removeItem("names");
})
