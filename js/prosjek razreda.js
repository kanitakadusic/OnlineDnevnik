function ucitajProsjek() {
    let ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let response = JSON.parse(this.responseText);
            console.log(response);
            racunajProsjek(response);
        }
    };

    ajax.open("GET", `/prosjek`, true);
    ajax.send();
}

function racunajProsjek(response) {
    var prviId = response[0].id_ucenika;
    var brojac = 1, brojPredmeta = 1;

    while (response[brojac].id_ucenika == prviId) {
        brojPredmeta++;
        brojac++;
    }

    var brojUcenika = response.length / brojPredmeta;
    var pomocnaPredmeti = brojPredmeta, pomocnaUcenici = brojUcenika;

    var ucenik = 0, predmet = 0;
    var sumaOcjena = 0, sumaProsjeka = 0, prosjekRazreda;
    
    while (ucenik < brojUcenika) {
        brojac = 0;
        sumaOcjena = 0;

        while (predmet < brojPredmeta) {
            if (response[predmet].ocjene != '') {
                sumaOcjena += Math.round(parseFloat(dajProsjek(response[predmet].ocjene)));
                brojac++;
            }

            predmet++;
        }

        if (brojac != 0) {
            sumaProsjeka += Math.round((sumaOcjena / brojac));
        } else {
            sumaProsjeka += 0;
            pomocnaUcenici--;
        }
        
        brojPredmeta += pomocnaPredmeti;

        ucenik++;
    }

    if (sumaProsjeka != 0) {
        prosjekRazreda = (sumaProsjeka / pomocnaUcenici).toFixed(2);
    } else {
        prosjekRazreda = "nema podataka";
    }

    document.getElementById("prosjekRazreda").innerHTML = prosjekRazreda;
}