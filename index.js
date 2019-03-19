const monsterContainerDiv = document.querySelector('#monster-container');
const monsterFormDiv = document.querySelector('#monster-form');


const monstersCard = (monster) => {
    return `<div class="card" data-id=${monster.id}>
                <h2 class="monster-name">${monster.name}</h2>
                <p class="monster-age">${monster.age}</p>
                <p class="monster-descr">${monster.description}</p>
            </div>`
}




fetch('http://localhost:3000/monsters')
.then(resp => resp.json())
.then(monstersObj => monstersObj.forEach(monster => {
    monsterContainerDiv.innerHTML += monstersCard(monster)
})
)


const createMonsterFetch = (name, age, description) => {
    return fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: name,
            age: age,
            description: description
        })
    })
}

monsterFormDiv.addEventListener('submit', (event) => {
    event.preventDefault();
    //debugger
    const name = event.target.children[0].value;
    const age = event.target.children[1].value;
    const description = event.target.children[2].value;
    createMonsterFetch(name, age, description)
    .then(resp => resp.json())
    .then(monster => monsterContainerDiv.innerHTML += monstersCard(monster))
    //console.log('hello is this working?')
})
