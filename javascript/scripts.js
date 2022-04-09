const tableLines = 5
let currentPage = 1

function getTotalPages() {
    return Math.ceil(users.length / tableLines)
}

function getUsersData() {

    const startIndex = (currentPage - 1) * tableLines
    const endIndex = startIndex + tableLines

    return users.slice(startIndex, endIndex)
}


function deletePerson(usersData) {
    users = users.filter((person) => {
        return person.id !== usersData
    })
    render()
}


function createButtonElement(textContent) {
    
    const buttonElement = document.createElement('button')
    buttonElement.classList.add(textContent + '-button')
    buttonElement.type = 'button'
    buttonElement.textContent = textContent 

    return buttonElement
}


function createTableElement(usersData) {

    const dataTr = document.createElement('tr')
    dataTr.id = usersData.id

    const tdName = document.createElement('td')
    tdName.textContent = usersData.first_name + ' ' + usersData.last_name

    const tdEmail = document.createElement('td')
    tdEmail.textContent = usersData.email

    const tdRegisteredIn = document.createElement('td')
    tdRegisteredIn.textContent = usersData.created_at

    const tdButtons = document.createElement('td')
    tdButtons.classList.add('action-buttons')
    
    // criacao dos botoes
    
    const editButton = createButtonElement('editar')
    const deleteButton = createButtonElement('excluir')
    deleteButton.addEventListener('click', () => deletePerson(usersData.id))

    // adicionando os elementos

    tdButtons.appendChild(editButton)
    tdButtons.appendChild(deleteButton)


    dataTr.appendChild(tdName)
    dataTr.appendChild(tdEmail)
    dataTr.appendChild(tdRegisteredIn)
    dataTr.appendChild(tdButtons)

    return dataTr
}


function createTableElements(userDates) {

    return userDates.map(createTableElement)
}


function renderData() {

    const usersData = getUsersData()
    const tableElements = createTableElements(usersData)

    const tableBody = document.querySelector('.table-body')

    tableBody.replaceChildren()
    tableElements.forEach(element => {
        tableBody.appendChild(element)
        })
    }


function changePage(newPage) {
    const totalPages = getTotalPages()

    if (newPage >= 1 && newPage <= totalPages)
    currentPage = newPage
    render()
}


function createPrevButton() {
    const prevPageButton = createButtonElement('prev')
    prevPageButton.textContent = '<<'

    prevPageButton.addEventListener('click', () => {
        changePage(currentPage-1)
    })

    return prevPageButton
}


function createNextButton() {
    const nextPageButton = createButtonElement('next')
    nextPageButton.textContent = '>>'

    nextPageButton.addEventListener('click', () => {
        changePage(currentPage+1)
    })

    return nextPageButton
}


function createPaginationButton(page) {
    const paginationButton = createButtonElement(page)
    paginationButton.className = 'pageX'

    if (page == currentPage) paginationButton.classList.add('active')
    paginationButton.addEventListener('click', () => changePage(page))

    return paginationButton
}


function renderPagination(totalPages) {
    const pagination = document.querySelector('.pagination')
    pagination.replaceChildren()

    if (totalPages) {
        const prevPageButton = createPrevButton()
        pagination.appendChild(prevPageButton)

        for (let page = 1; page <= totalPages; page++) {
            const paginationButton = createPaginationButton(page)
            pagination.appendChild(paginationButton)
        }

        const nextPageButton = createNextButton()
        pagination.appendChild(nextPageButton)
    }
}


function render() {
    const totalPages = getTotalPages()
    if (currentPage > totalPages) currentPage = totalPages


    renderData()
    renderPagination(totalPages)

}

render()