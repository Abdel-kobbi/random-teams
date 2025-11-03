import { fillTable, generateTeams, fillCardTeams } from "./functions";

const form = document.getElementById("form");
const inputName = document.querySelector("#name");
const table = document.querySelector("#table>tbody");
const generatebtn = document.querySelector("#generate")
const numberOfTeam = document.querySelector("#numberOfTeam");
const error = document.getElementById("error");
const rest = document.querySelector("#reset");

const cardContainer = document.querySelector("#card-teams")

const caption = document.querySelector("#caption");

// modal
const modal = document.getElementById('modal');
const openModal = document.getElementById('openModal');
const closeModal = document.getElementById('closeModal');


function showModal() {
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  numberOfTeam.focus();
}

function hideModal() {
  modal.classList.remove('flex');
  modal.classList.add('hidden');
}

openModal.addEventListener('click', showModal);
closeModal.addEventListener('click', hideModal);

// Fermeture si clic en dehors du modal
window.addEventListener('click', (e) => {
  if (e.target === modal) hideModal;
});


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
    hideModal();
    return;
  }
  localStorage.setItem("names", JSON.stringify(names));
  const randomTeams = generateTeams(names, +numberOfTeam.value, Math.floor(names.length / +numberOfTeam.value));
  hideModal();
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
