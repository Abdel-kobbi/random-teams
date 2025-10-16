export const fillTable = (data, table) => {
    let rows = "";
    data.forEach(({ name, group }, index) => {
        rows += `
            <tr>
                <td>${index + 1}</td>
                <td>${name}</td>
                <td>${group}</td>
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


export function fillCardTeams(teams, cardContainer, nbOfTeams) {
    let cards = ``;
    let filterdTeams = [];

    for (let i = 0; i <= teams.length; i++) {
        filterdTeams.push(teams.filter(({ group }) => group == i));
    }

    filterdTeams.filter(team => team.length > 0).forEach((team) => {

        cards += `<div class='col-3'>
            <ul class="list-group">
        `;
        team.forEach(({ name }, index) => {
            cards += `
            <li class="list-group-item" ${index == 0 ? "style='background-color: lightgreen;'" : ""}>${name}</li>
            `;
        })
        cards += `
            </ul>
        </div>
        `;
    })

    cardContainer.innerHTML = cards;
}