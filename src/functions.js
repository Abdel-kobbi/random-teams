export const fillTable = (data, table) => {
    let rows = "";
    data.forEach(({ name, group }, index) => {
        rows += `
            <tr>
                <td class="border-2">${index + 1}</td>
                <td class="capitalize border-2">${name}</td>
                <td class="border-2">${group}</td>
            </tr>
        `;
    })

    table.innerHTML = rows;
}


export const generateTeams = (teams, nbOfTeams = 3, iteration) => {
    if (iteration == 0 || teams.length < nbOfTeams) {
        return teams.map(el => { el.group = 0; return el });
    }
    let equipes = [...teams];
    let randomTeams = [];
    for (let i = 0; i < nbOfTeams; i++) {
        let max = equipes.length;
        let randomIndex = Math.floor(Math.random() * (max - 1));
        equipes[randomIndex].group = iteration;
        randomTeams.push(equipes[randomIndex]);
        equipes.splice(randomIndex, 1);
    }
    return [...randomTeams, ...generateTeams(equipes, nbOfTeams, iteration - 1)]
};


export function fillCardTeams(teams, cardContainer) {
    let cards = ``;
    let filterdTeams = [];

    for (let i = 0; i <= teams.length; i++) {
        filterdTeams.push(teams.filter(({ group }) => group == i));
    }

    filterdTeams.filter(team => team.length > 0).forEach((team) => {

        cards += `<div class='hover:scale-[1.08] transition duration-[0.8s] my-2 p-2 '>
            <ul class="bg-amber-100 rounded-xl p-2">
        `;
        team.forEach(({ name }, index) => {
            cards += `
            <li class="capitalize" ${index == 0 ? "style='background-color: lightgreen;'" : ""}>${name}</li>
            `;
        })
        cards += `
            </ul>
        </div>
        `;
    })

    cardContainer.innerHTML = cards;
}