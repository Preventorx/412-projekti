let pelaajat = [];
let nykyPelaajaIndex = 0;
let tulossaPisteet = 0;
let peliPaalla = false;
let voittoPisteet = 100;

// Aloitusnäkymä
document.getElementById("aloitaPeli").addEventListener("click", () => {
    const pelaajaMaara = parseInt(document.getElementById("pelaajaMaara").value);
    voittoPisteet = parseInt(document.getElementById("voittoPisteet").value);

    if (pelaajaMaara < 2 || pelaajaMaara > 6) {
        alert("Pelaajia on oltava 2-6!");
        return;
    }

    document.getElementById("asetus").classList.add("hidden");
    document.getElementById("pelaajaNimet").classList.remove("hidden");

    const nimiSyote = document.getElementById("nimiSyote");
    nimiSyote.innerHTML = "";
    for (let i = 0; i < pelaajaMaara; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = `Pelaajan ${i + 1} nimi`;
        nimiSyote.appendChild(input);
    }
});


// Nimien vahvistus ja pelin aloittaminen
document.getElementById("vahvistaNimet").addEventListener("click", () =>{
    const nimet = document.querySelectorAll("#nimiSyote input");
    pelaajat = Array.from(nimet).map(input => ({
        nimi: input.value || `Pelaaja ${Array.from(nimet).indexOf(input) + 1}`,
        pisteet: 0
    }));

    document.getElementById("pelaajaNimet").classList.add("hidden");
    document.getElementById("peli").classList.remove("hidden");

    peliPaalla = true;
    paivitaPeliInfo();
});


// Nopanheitto
document.getElementById("heitaNoppa").addEventListener("click", () => {
    if (!peliPaalla) return;

    const noppaTulos = Math.floor(Math.random() * 6) + 1;
    document.getElementById("noppaTulos").textContent = `Heitit: ${noppaTulos}`;

    if (noppaTulos === 1) {
        tulossaPisteet = 0;
        seuraavaPelaaja();
    }   else {
        tulossaPisteet += noppaTulos;
        paivitaPeliInfo();
    }
});


// Pisteissä pysyminen
document.getElementById("pysy").addEventListener("click", () => {
    if (!peliPaalla) return;

    pelaajat[nykyPelaajaIndex].pisteet += tulossaPisteet;
    tulossaPisteet = 0;
    seuraavaPelaaja();
});


// Seuraava pelaaja
function seuraavaPelaaja() {
    if (pelaajat[nykyPelaajaIndex].pisteet >= voittoPisteet) {
        peliPaalla = false;
        uusiPeli();
    } else {
    nykyPelaajaIndex = (nykyPelaajaIndex + 1) % pelaajat.length;
    tulossaPisteet = 0;
    paivitaPeliInfo();
    }
}


// Pelin tietojen päivittäminen
function paivitaPeliInfo() {
    document.getElementById("nykyPelaaja").innerHTML = `Vuorossa on <strong>${pelaajat[nykyPelaajaIndex].nimi}</strong> (tulossa: ${tulossaPisteet} pistettä)`;

    const pisteetDiv = document.getElementById("pisteet");
    pisteetDiv.innerHTML = "<h3>Pisteet:</h3>";
    pelaajat.forEach((pelaajat) => {
        pisteetDiv.innerHTML += `<p>${pelaajat.nimi}: ${pelaajat.pisteet}</p>`;
    });
}


// Uusi peli
function uusiPeli() {
    if (confirm(`${pelaajat[nykyPelaajaIndex].nimi} voitti pelin! Pelataanko uudestaan?`)) {
        pelaajat.forEach(pelaaja => pelaaja.pisteet = 0);
        nykyPelaajaIndex = 0;
        tulossaPisteet = 0;
        peliPaalla = true;

        document.getElementById("peli").classList.add("hidden");
        document.getElementById("asetus").classList.remove("hidden");
    }
}