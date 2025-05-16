async function generarComprobante(nombre, cuenta, tipo, monto, saldoFinal) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
  
    const fecha = new Date().toLocaleString();
  
    doc.setFontSize(16);
    doc.text("Comprobante de Transacción", 20, 20);
  
    doc.setFontSize(12);
    doc.text(`Nombre: ${nombre}`, 20, 40);
    doc.text(`Cuenta: ${cuenta}`, 20, 50);
    doc.text(`Tipo de Transacción: ${tipo}`, 20, 60);
    doc.text(`Monto: $${monto.toFixed(2)}`, 20, 70);
    doc.text(`Saldo Final: $${saldoFinal.toFixed(2)}`, 20, 80);
    doc.text(`Fecha y Hora: ${fecha}`, 20, 90);
  
    doc.save(`comprobante_${tipo}_${fecha.replace(/[/: ]/g, "_")}.pdf`);
  }
  