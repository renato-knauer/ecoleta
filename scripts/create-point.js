
function populateUFs() {
    const ufSelect = document.querySelector('select[name=uf]')

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then( (res) => { return res.json() } )
    .then( estates => {

        for(let estate of estates) {
            ufSelect.innerHTML += `<option value="${estate.id}">${estate.nome}</option>`
        }

    } )
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector('select[name=city]')
    
    const ufValue = event.target.value

    /* Changing url values */
    const estateInput = document.querySelector('input[name=estate]')
    const indexOfSelectedEstate = event.target.selectedIndex
    estateInput.value = event.target.options[indexOfSelectedEstate].text
    /* Changing url values */

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${event.target.value}/municipios`

    fetch(url)
    .then( (res) => { return res.json() } )
    .then( cities => {

        for(let city of cities) {
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }

        citySelect.disabled = false

    } )
}

document
    .querySelector('select[name=uf]')
    .addEventListener('change', getCities)