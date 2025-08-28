const colonias = ["Centro", "Las Flores", "La Esperanza"];
const preciosColonias = { "Centro": 30, "Las Flores": 35, "La Esperanza": 40 };
let conductores = [];

function mostrarConductores() {
  const contenedor = document.getElementById("conductoresList");
  contenedor.innerHTML = "";
  conductores.forEach((c, index) => {
    const coloniaOptions = colonias.map(col => `<option value="${col}">${col}</option>`).join("");
    const div = document.createElement("div");
    div.classList.add("conductor");
    div.innerHTML = `
      <img src="${c.foto}" alt="Foto Conductor">
      <div class="info">
        <h3>${c.nombre}</h3>
        <p>${c.moto}</p>
        <label>Colonia destino:</label>
        <select id="colonia${index}" onchange="actualizarPrecio(${index})">
          ${coloniaOptions}
        </select>
        <p id="precio${index}">Precio: $${preciosColonias[colonias[0]]}</p>
        <div class="actions">
          <a href="#" class="btn whatsapp" onclick="pedirViaje('${c.numero}','${c.nombre}','colonia${index}')">Pedir por WhatsApp</a>
          <a href="tel:+${c.numero}" class="btn llamar">Llamar</a>
        </div>
      </div>
    `;
    contenedor.appendChild(div);
  });
}

function actualizarPrecio(index) {
  const colonia = document.getElementById(`colonia${index}`).value;
  document.getElementById(`precio${index}`).innerText = `Precio: $${preciosColonias[colonia]}`;
}

function pedirViaje(numero, nombre, selectId) {
  const colonia = document.getElementById(selectId).value;
  const precio = preciosColonias[colonia];
  const mensaje = `Hola ${nombre}, quiero un viaje a la colonia ${colonia}. Precio: $${precio}`;
  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`, "_blank");
}

// Fetch desde GitHub JSON
fetch("conductores.json")
  .then(response => response.json())
  .then(data => { conductores = data; mostrarConductores(); })
  .catch(err => console.error("No se pudo cargar conductores:", err));
