let historialMovimientos =
  JSON.parse(localStorage.getItem("historialMovimientos")) || [];

const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

// Crear arrays vacíos para depósitos y retiros por mes
let depositos = Array(12).fill(0); // Iniciar un array con 12 ceros
let retiros = Array(12).fill(0); // Iniciar un array con 12 ceros

// Iterar sobre el historial de movimientos y acumular depósitos y retiros por mes
historialMovimientos.forEach((movimiento) => {
  const mes = new Date(movimiento.fecha).getMonth(); // Obtener el mes (0-11)
  const monto = parseFloat(movimiento.monto);

  if (movimiento.tipo === "Depósito") {
    depositos[mes] += monto;
  } else if (movimiento.tipo === "Retiro") {
    retiros[mes] += monto;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("depositosChart").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: meses,
      datasets: [
        {
          label: "Depósitos en Pokedolares",
          data: depositos,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("retirosChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: meses,
      datasets: [
        {
          label: "Retiros en Pokedolares",
          data: retiros,
          backgroundColor: "rgba(192, 75, 75, 0.6)",
          borderColor: "rgba(192, 75, 75, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const ctx = document
    .getElementById("depositosTransaccionesChart")
    .getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: meses,
      datasets: [
        {
          label: "Depósitos en Pokedólares",
          data: depositos,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Retiros en Pokedólares",
          data: retiros,
          backgroundColor: "rgba(192, 75, 75, 0.6)",
          borderColor: "rgba(192, 75, 75, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});

// Pie Chart

document.addEventListener("DOMContentLoaded", function () {
  const historialPagos = JSON.parse(localStorage.getItem("historialPagos"));

  if (!historialPagos || historialPagos.length === 0) {
    alert("No hay pagos registrados.");
    return;
  }

  const serviciosPagados = {};

  historialPagos.forEach((pago) => {
    if (serviciosPagados[pago.servicio]) {
      serviciosPagados[pago.servicio] += parseFloat(pago.monto);
    } else {
      serviciosPagados[pago.servicio] = parseFloat(pago.monto);
    }
  });

  const servicios = Object.keys(serviciosPagados); // Nombres de los servicios
  const pagos = Object.values(serviciosPagados); // Monto acumulado por servicio

  const colores = [
    "rgba(255, 99, 132, 0.7)", // Rojo
    "rgba(54, 162, 235, 0.7)", // Azul
    "rgba(255, 206, 86, 0.7)", // Amarillo
    "rgba(75, 192, 192, 0.7)", // Verde
    "rgba(153, 102, 255, 0.7)", // Púrpura
    "rgba(255, 159, 64, 0.7)", // Naranja
  ];

  // Crear el gráfico de pie con los datos obtenidos
  const ctx = document.getElementById("ServiciosChart").getContext("2d");

  new Chart(ctx, {
    type: "pie",
    data: {
      labels: servicios, // Etiquetas con los nombres de los servicios
      datasets: [
        {
          data: pagos, // Datos con los montos de los pagos por servicio
          backgroundColor: colores, // Colores de los segmentos
          borderColor: "rgba(255, 255, 255, 1)",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return `${tooltipItem.label}: $${tooltipItem.raw.toFixed(2)}`;
            },
          },
        },
      },
    },
  });
});
