document.addEventListener("DOMContentLoaded", () => {
  const kuerzenBtn = document.getElementById("kuerzenBtn");
  const kopierenBtn = document.getElementById("kopierenBtn");
  const oeffnenBtn = document.getElementById("oeffnenBtn");
  const linkListe = document.getElementById("linkListe");

  kuerzenBtn.addEventListener("click", () => {
    const langeUrl = document.getElementById("langeUrl").value.trim();

    if (!langeUrl) {
      alert("Bitte geben Sie eine URL ein!");
      return;
    }

    const kurz = [...Array(5)]
      .map(
        () => "abcdefghijklmnopqrstuvwxyz0123456789"[(Math.random() * 36) | 0]
      )
      .join("");
    const kurzeUrl = `${window.location.origin}/short/${kurz}`;

    document.getElementById(
      "kurzeUrl"
    ).innerHTML = `Verkürzte URL: <a href="${langeUrl}" target="_blank">${kurzeUrl}</a>`;
    kopierenBtn.style.display = "block";
    oeffnenBtn.style.display = "block";

    speichern(langeUrl, kurzeUrl);
  });

  kopierenBtn.addEventListener("click", () => {
    const text = document.getElementById("kurzeUrl").innerText.split(": ")[1];
    navigator.clipboard
      .writeText(text)
      .then(() => alert("Die verkürzte URL wurde kopiert!"))
      .catch(() => alert("Fehler beim Kopieren!"));
  });

  oeffnenBtn.addEventListener("click", () => {
    const urlElement = document.querySelector("#kurzeUrl a");
    if (urlElement) {
      window.open(urlElement.href, "_blank");
    }
  });

  function speichern(original, kurz) {
    let links = JSON.parse(localStorage.getItem("links")) || [];
    links.unshift({ original, kurz });
    if (links.length > 5) links.pop();
    localStorage.setItem("links", JSON.stringify(links));
    anzeigen();
  }

  function anzeigen() {
    let links = JSON.parse(localStorage.getItem("links")) || [];
    linkListe.innerHTML = "";
    links.forEach((link) => {
      let li = document.createElement("li");
      li.innerHTML = `<a href="${link.original}" target="_blank">${link.kurz}</a>`;
      linkListe.appendChild(li);
    });
  }

  anzeigen();
});
