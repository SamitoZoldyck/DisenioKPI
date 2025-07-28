const empleados = ["Samuel", "Eric", "Miguel", "Evelyn", "Fabricio"];
const totalPreguntas = 10;
const maxPuntaje = 5;

const valores = {
  "Cumplió con lo establecido": 5,
  "Cumplió parcialmente": 4,
  "Neutral / Indiferente": 3,
  "Deficiente": 2,
  "No cumplió con lo establecido": 1,
};

function calcularKPI() {
  let sumaGeneral = 0;

  empleados.forEach((nombre) => {
    let valorTotal = 0;

    for (let i = 1; i <= totalPreguntas; i++) {
      const radios = document.querySelectorAll(`input[name="${nombre}-${i}"]`);
      radios.forEach((radio) => {
        if (radio.checked) {
          valorTotal += valores[radio.value] || 0;
        }
      });
    }

    const kpi = (valorTotal / (totalPreguntas * maxPuntaje)) * 100;

    document.getElementById(`${nombre}-total`).textContent = valorTotal;
    document.getElementById(`${nombre}-kpi`).textContent = `${kpi.toFixed(1)}%`;
    sumaGeneral += kpi;
  });

  const promedioGeneral = sumaGeneral / empleados.length;
  document.getElementById("promedio-general").textContent = `${promedioGeneral.toFixed(1)}%`;
}

document.querySelectorAll("input[type=radio]").forEach((radio) => {
  radio.addEventListener("change", calcularKPI);
});

document.addEventListener("DOMContentLoaded", () => {
  empleados.forEach((nombre) => {
    const totalCell = document.getElementById(`${nombre}-total`);
    const kpiCell = document.getElementById(`${nombre}-kpi`);

    if (totalCell && kpiCell) {
      totalCell.textContent = "—";
      kpiCell.textContent = "0%";
    }
  });
});
