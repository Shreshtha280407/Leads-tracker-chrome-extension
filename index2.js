let myLeads = []

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

// SAVE TAB
tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const url = tabs[0].url

        if (!myLeads.includes(url)) {
            myLeads.push(url)
            localStorage.setItem("myLeads", JSON.stringify(myLeads))
            render(myLeads)
        }
    })
})

// RENDER
function render(leads) {
    let listItems = ""

    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target="_blank" href="${leads[i]}">
                    ${leads[i]}
                </a>
            </li>
        `
    }

    ulEl.innerHTML = listItems
}

// DELETE ALL (double click)
deleteBtn.addEventListener("dblclick", function () {
    localStorage.removeItem("myLeads")
    myLeads = []
    render(myLeads)
})

// SAVE INPUT
inputBtn.addEventListener("click", function () {
    const value = inputEl.value.trim()

    if (value && !myLeads.includes(value)) {
        myLeads.push(value)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    }

    inputEl.value = ""
})


