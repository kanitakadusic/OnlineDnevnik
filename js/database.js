function posaljiPodatak(podatak) {
    localStorage.setItem('id', podatak);
}

function ucitajPodatke() {
    let ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let response = JSON.parse(this.responseText);
            console.log(response);
            prikaziPodatke(response);
        }
    };

    if (!isNaN(localStorage.getItem('id'))) { // Ucitaj ucenika
        ajax.open("GET", `/ucenik/${localStorage.getItem('id')}`, true);
        ajax.send();
    } else { // Ucitaj predmet
        ajax.open("GET", `/predmet/${localStorage.getItem('id')}`, true);
        ajax.send();
    }
}

function tabela(response, redniBroj, prosjek, ucenikPredmet) {
    var data = "";

    if (prosjek >= 1 && prosjek < 1.5) {
        data += "<tr><td><div class = \"number\" style = \"border-color: #EC1919; background-color: #EC1919; color: #FFFFFF\">" + redniBroj + "</div></td>";
    } else {
        data += "<tr><td><div class = \"number\">" + redniBroj + "</div></td>";
    }

    data += "<td class = \"data\">" + 
                "<div class = \"left\">" + ucenikPredmet + "</div>" + 
                "<div class = \"middle\">" + response[x].ocjene + "</div>" + 
                "<div class = \"right\">" + prosjek + "</div>" + 
            "</td>" + 
            "<td><div class = \"suggestion\">" + dajPrijedlog(response[x].ocjene) + "</div></td></tr>";
        
    return data;
}

function prikaziPodatke(response) {
    data = "<table>";
    var suma = 0, brojac = 0; // za ukupni prosjek
    var prosjek, redniBroj = 1;

    if (!isNaN(localStorage.getItem('id'))) { // Prikazi sve predmete (ocjene) na osnovu odabranog ucenika - BROJ
        document.getElementById("header").innerHTML = response[0].ime_ucenika + ' ' + response[0].prezime_ucenika;
        document.getElementById("podatak").innerHTML = "Predmet";

        for (x in response) {
            if (response[x].ocjene == '') {
                prosjek = '';
            } else {
                prosjek = dajProsjek(response[x].ocjene);
                suma += Math.round(parseFloat(prosjek));
                brojac++;
            }

            data += tabela(response, redniBroj, prosjek, response[x].naziv_predmeta);
            redniBroj++;
        }
    } else { // Prikazi sve ucenike (ocjene) na osnovu odabranog predmeta - STRING
        document.getElementById("header").innerHTML = response[0].naziv_predmeta;
        document.getElementById("podatak").innerHTML = "Učenik";

        for (x in response) {
            if (response[x].ocjene == '') {
                prosjek = '';
            } else {
                prosjek = dajProsjek(response[x].ocjene);
                suma += Math.round(parseFloat(prosjek));
                brojac++;
            }

            data += tabela(response, redniBroj, prosjek, response[x].prezime_ucenika + ' ' + response[x].ime_ucenika);
            redniBroj++;
        }
    }
    
    data += "</table>"    
    document.getElementById("tabela").innerHTML = data;
    
    if (brojac != 0) {
        document.getElementById("ukupniProsjek").innerHTML = (suma / brojac).toFixed(2);
    } else { // ako nikako nema ocjena
        document.getElementById("ukupniProsjek").innerHTML = "Nema podataka";
    }
}