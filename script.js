let pelaajat = [];
let nykyPelaajaIndex = 0;
let nykyPisteet = 0;
let peliPaalla = false;

// Aloitusnäkymä
document.getElementById("aloitaPeli").addEventListener("click", () => {
    const pelaajaMaara = parseInt(document.getElementById("pelaajaMaara").value);
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
        nykyPisteet = 0;
        seuraavaPelaaja();
    }   else {
        nykyPisteet += noppaTulos;
    }
});


// Pisteissä pysyminen
document.getElementById("pysy").addEventListener("click", () => {
    if (!peliPaalla) return;

    pelaajat[nykyPelaajaIndex].pisteet += nykyPisteet;
    nykyPisteet = 0;
    seuraavaPelaaja();
});


// Seuraava pelaaja
function seuraavaPelaaja() {
    if (pelaajat[nykyPelaajaIndex].pisteet >= 100) {
        peliPaalla = false;
        alert(`${pelaajat[nykyPelaajaIndex].nimi} voitti pelin!`);
    }

    nykyPelaajaIndex = (nykyPelaajaIndex + 1) % pelaajat.length;
    paivitaPeliInfo();
}


// Pelin tietojen päivittäminen
function paivitaPeliInfo() {
    document.getElementById("nykyPelaaja").innerHTML = `Vuorossa on <strong>${pelaajat[nykyPelaajaIndex].nimi}</strong>`;

    const pisteetDiv = document.getElementById("pisteet");
    pisteetDiv.innerHTML = "<h3>Pisteet:</h3>";
    pelaajat.forEach(pelaaja => {
        pisteetDiv.innerHTML += `<p>${pelaaja.nimi}: ${pelaaja.pisteet}</p>`;
    });
}