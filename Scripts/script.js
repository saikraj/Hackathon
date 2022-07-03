let baseURL = "https://www.anapioficeandfire.com/api/";
const getBooks = async () => {
    await fetch(`${baseURL}books`, { method: "GET" })
        .then((data) => data.json())
        .then((data) => {
            console.log(data);
            const repeat = (arr, n) => Array(n).fill(arr).flat();
            createBookData(repeat(data, 5));
        })
}

const getCharacters = (e, name) => {
    charHeader = document.getElementById('characterModalLabel');
    let characterTab = document.getElementById('characterTab');
    characterTab.innerHTML = '';
    charHeader.innerHTML = name;
    Promise.all(e.map(url => fetch(url).then(
        resp => resp.json()
    ).then((resp) => {
        createCharactersData(resp)
    })
    ))
}

const createCharactersData = (resp) => {
    console.log(resp)
    if (resp.name) {
        let characterTab = document.getElementById('characterTab');
        let tr = document.createElement("tr");
        let name = document.createElement("td");
        name.textContent = resp.name;
        tr.appendChild(name);
        let born = document.createElement("td");
        born.textContent = resp.born;
        tr.appendChild(born);
        characterTab.appendChild(tr);
    }
}
const createBookData = (data) => {
    let bookTab = document.getElementById("bookTab");


    for (let i = 0; i < data.length; i++) {
        console.log(data[i])
        let tr = document.createElement("tr");
        let bName = document.createElement("td");
        bName.textContent = data[i].name;
        tr.appendChild(bName);
        let isbn = document.createElement("td");
        isbn.textContent = data[i].isbn;
        tr.appendChild(isbn);
        let pages = document.createElement("td");
        pages.textContent = data[i].numberOfPages;
        tr.appendChild(pages);
        let publisher = document.createElement("td");
        publisher.textContent = data[i].publisher;
        tr.appendChild(publisher);
        let releaseDate = document.createElement("td");
        releaseDate.textContent = data[i].released;
        tr.appendChild(releaseDate);
        let authors = document.createElement("td");
        authorList = document.createElement("ul");
        for (let j = 0; j < data[i].authors.length; j++) {
            listAuth = document.createElement("li");
            listAuth.textContent = data[i].authors[j]
            authorList.appendChild(listAuth);
        }
        authors.appendChild(authorList);
        tr.appendChild(authors);
        let char = document.createElement("td");
        btn = document.createElement("button");
        btn.type = "button";
        btn.classList.add('btn', 'btn-outline-primary')
        btn.setAttribute("data-toggle", "modal");
        btn.setAttribute("data-target", "#characterModal");
        btn.textContent = "Click Here For Character List"
        btn.addEventListener('click', () => {
            getCharacters(data[i].characters.slice(0, 5), data[i].name)
        })
        char.appendChild(btn);
        tr.appendChild(char)

        bookTab.appendChild(tr);
    }
}

function search() {
    searchText = document.getElementById('searchBox').value;
    console.log(searchText)
    const tabs = document.querySelectorAll('#bookTab tr')
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].innerHTML = tabs[i].innerHTML.replace('<mark>', '');
        tabs[i].innerHTML = tabs[i].innerHTML.replace('</mark>', '');
    }
    if (searchText != '') {
        for (let i = 0; i < tabs.length; i++) {
            tabs[i].innerHTML = tabs[i].innerHTML.replace(new RegExp(searchText, "gi"), (match) => `<mark>${match}</mark>`);
        }
    }
}

getBooks()



