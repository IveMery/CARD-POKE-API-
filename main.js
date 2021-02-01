const numeroAleatorio = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

console.log(numeroAleatorio(1, 151))

// DOMContentLoaded es disparado cuando el documento HTML ha sido completamente cargado y parseado
document.addEventListener('DOMContentLoaded', () => {
    const random = numeroAleatorio(1, 151)
    fetchData(random)
})



const fetchData = async(id) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await res.json()
        console.log(data)

        const pokemon = {
            img: data.sprites.other.dream_world.front_default,
            name: data.name,
            experience: data.base_experience,
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            special: data.stats[2].base_stat,
            defense: data.stats[3].base_stat

        }
        mostrarCard(pokemon)
    } catch (error) {
        console.log(error)
    }
}


const mostrarCard = (pokemon) => {
    // console.log(pokemon)

    const template = document.getElementById('template-card').content
    const flex = document.querySelector('.flex')
    const clone = template.cloneNode(true)
    const fragment = document.createDocumentFragment()

    const image = clone.querySelector('.card-body-img').setAttribute('src', pokemon.img)
    const title = clone.querySelector(
        ".card-body-title").innerHTML = `${pokemon.name} <span>${pokemon.hp}Hp</span>`;
    const experience = clone.querySelector(".card-body-text").textContent =
        ` ${pokemon.experience} exp`;
    const attack = clone.querySelectorAll(".card-footer-social h3")[0].textContent = `
    ${pokemon.attack}k`
    const special = clone.querySelectorAll(".card-footer-social h3")[1].textContent = `
    ${pokemon.special}k`
    const defense = clone.querySelectorAll(".card-footer-social h3")[2].textContent = `
    ${pokemon.defense}k`

    fragment.appendChild(clone)
    flex.appendChild(fragment)
}




// fetch(`https://pokeapi.co/api/v2/pokemon/`)
//     .then((data) => {
//         return data.json()
//     })
//     .then((pokemones) => {
//         console.log(pokemones)
//     })