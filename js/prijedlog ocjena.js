function prosjekNiz(ocjene) {
    var broj = ocjene.length, suma = 0;

    for (var i = 0; i < broj; i++) {
        suma += ocjene[i];
    }

    return suma / broj;
}

function prosjek(suma, broj) {
    return suma / broj;
}

function kombinovaneOcjene(suma, broj, granica, dodatak) {
    var noviProsjek;
    var prijedlog = 0;

    do {
        if (prosjek(suma + dodatak - 1, broj + 1) >= granica) {
            prijedlog = prijedlog * 10 + (dodatak - 1);
            break;
        }

        noviProsjek = prosjek(suma += dodatak, ++broj);
        prijedlog = prijedlog * 10 + dodatak;
    } while (noviProsjek < granica);

    return prijedlog;
}

function isteOcjene(suma, broj, granica, dodatak) {
    var noviProsjek = 0;
    var prijedlog = 0;

    do {
        noviProsjek = prosjek(suma += dodatak, ++broj);
        prijedlog = prijedlog * 10 + dodatak;
    } while (noviProsjek < granica);

    return prijedlog;
}

function algoritam(ocjene) {
    var broj = ocjene.length, suma = 0;
    for (var i = 0; i < broj; i++) {
        suma += ocjene[i];
    }

    var prosjekOcjena = suma / broj; // prosjek trenutnih ocjena ucenika
    var zeljena = parseInt(prosjekOcjena + 0.5 + 1); // zeljena ocjena ucenika - za jednu veca od one koju ima
    var granica = parseFloat(zeljena - 0.5); // granica do koje vrti petlju - do koje dodaje prijedloge

    var prijedlog = 0; // prijedlog ocjena koje ucenik treba dobiti da poveca prosjek
    var finalni_prijedlog = ""; // string u koji skladistim finalni prijedlog

    if (zeljena == 5) {
        prijedlog = isteOcjene(suma, broj, granica, zeljena);
        finalni_prijedlog += prijedlog;
        return finalni_prijedlog;
    }

    // sprijeciti da program predlaze vise od 4 ocjene jer ih ucenik nema kad dobiti
    if (zeljena - prosjekOcjena > 1) {
        zeljena++;
    } else { // poziva isteOcjene kada zeljenu ocjenu salje kao dodatak - nema smisla provjeravati za manje
        prijedlog = isteOcjene(suma, broj, granica, zeljena++);
        finalni_prijedlog += prijedlog + " ";
    }

    var pomocna; // kako bi se rijesio problem problem slucajeva - 1114 / 1123 / 1222

    // ako je za povecanje prosjeka dovoljna cetvorka, dovoljna je i petica - prekid
    while ((prijedlog != 2 && prijedlog != 3 && prijedlog != 4) && zeljena <= 5) {
        pomocna = prijedlog;
        prijedlog = kombinovaneOcjene(suma, broj, granica, zeljena++);

        if (prijedlog < pomocna || pomocna == 0) {
            finalni_prijedlog += prijedlog + " ";
        }
    }

    return finalni_prijedlog;
}

function formatiraj(prijedlog) {
    var rezultat = "";

    for (var i = 0; i < prijedlog.length; i++) {
        if (prijedlog[i] == ' ') {
            rezultat += "/ ";
        } else {
            rezultat += prijedlog[i] + " ";
        }
    }

    if (rezultat[rezultat.length - 1] == ' ' && rezultat[rezultat.length - 2] == '/') {
        rezultat = rezultat.substring(0, rezultat.length - 2);
    }

    return rezultat;
}

function dajPrijedlog(unos) {
    const ocjene = unos.split(' ').map(Number);

    if (prosjekNiz(ocjene) >= 4.5 || unos == '') {
        return '';
    } else {
        return formatiraj(algoritam(ocjene));
    }
}

function dajProsjek(unos) {
    const ocjene = unos.split(' ').map(Number);    
    
    return prosjekNiz(ocjene).toFixed(2);
}