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

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    /* Fixing cities selection */
    citySelect.innerHTML = '<option value="">Selecione a Cidade</option>'
    citySelect.disabled = true
    /* Fixing cities selection */

    fetch(url)
    .then( (res) => { return res.json() } )
    .then( cities => {

        for(let city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false

    } )
}

document
    .querySelector('select[name=uf]')
    .addEventListener('change', getCities)


/* WASTE ITEMS */


const itemsToCollect = document.querySelectorAll('.items-grid li')

for(let item of itemsToCollect) {
    item.addEventListener('click', handleSelectedItem)
}

// Selected items will be put here
let selectedItems = []
const collectedItems = document.querySelector('input[name=items]')

function handleSelectedItem(event) {
    const itemLi = event.target
    itemLi.classList.toggle('selected')
    
    const itemId = itemLi.dataset.id

    // verify if item is already selected
    // if yes, catch the selected items
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId // true or false
        return itemFound
    })

    // if already selected
    if(alreadySelected >= 0) {
        // remove from selection
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId // false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        // if not selected
        // add it to selection
        selectedItems.push(itemId)
    }

    // update the hidden input with the selected items
    collectedItems.value = selectedItems
}