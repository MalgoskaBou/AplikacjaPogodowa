// CITY SEARCH 

const history_key = "names";
const inpValue = document.getElementsByClassName('.form__search');
const IsOutput = document.getElementsByClassName('.form__city');

btnInsert.onclick = function () {
    const storedNames = JSON.parse(localStorage.getItem(history_key));
    if (storedNames == null) {
        storedNames = [];
    }
    if (storedNames.length == 3) {
        storedNames.splice(0, 1);
    }

    const value = inpValue.value;
    if (value) {
        storedNames[storedNames.length] = value;
        localStorage.setItem(history_key, JSON.stringify(storedNames));
        location.reload();
    }
};

// Autocomplete
function autocomplete(inp, arr) {
    const currentFocus;
    inp.addEventListener("input", function (e) {
        const a, b, i, val = this.value;
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;

        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "form__list-item");


        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

                b.addEventListener("click", function (e) {
                    inp.value = this.getElementsByTagName("input")[0].value

                    closeAllLists();
                });

                a.appendChild(b);
            }
        }
    });

    inp.addEventListener("keydown", function (e) {
        const x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        for (const i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        const x = document.getElementsByClassName("form__list-item");

        for (const i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

// An Array of all the cities in the Poland
const cities = JSON.parse(localStorage.getItem('cities')) || [];

autocomplete(document.getElementsByClassName('.form__search'), cities);



export {btnInsert, autocomplete};