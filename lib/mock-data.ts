// Mock data for dashboard

export const financialMetrics = {
  ticketMedio: {
    value: 28.5,
    trend: 3.2,
    prevValue: 27.6,
  },
  ocupacion: {
    value: 78,
    trend: -2.5,
    prevValue: 80,
  },
  puntoEquilibrio: {
    value: 65,
    trend: 0,
    prevValue: 65,
  },
  beneficioNeto: {
    value: 12450,
    trend: 5.8,
    prevValue: 11800,
  },
  ebitda: {
    value: 15670,
    trend: 6.2,
    prevValue: 14780,
  },
  diasAbiertos: {
    value: 26,
    trend: 1,
    prevValue: 25.74,
  },
  ratioAprovechamiento: {
    value: 83,
    trend: 4.5,
    prevValue: 79.4,
  },
}

// Actualizar los datos históricos para incluir el punto de equilibrio
export const beneficioNetoHistorico = [
  { mes: "Ene", beneficio: 8500, puntoEquilibrio: 7800 },
  { mes: "Feb", beneficio: 9200, puntoEquilibrio: 7800 },
  { mes: "Mar", beneficio: 10500, puntoEquilibrio: 8200 },
  { mes: "Abr", beneficio: 9800, puntoEquilibrio: 8200 },
  { mes: "May", beneficio: 11200, puntoEquilibrio: 8500 },
  { mes: "Jun", beneficio: 12800, puntoEquilibrio: 8500 },
  { mes: "Jul", beneficio: 14500, puntoEquilibrio: 9000 },
  { mes: "Ago", beneficio: 15200, puntoEquilibrio: 9000 },
  { mes: "Sep", beneficio: 13800, puntoEquilibrio: 9200 },
  { mes: "Oct", beneficio: 12450, puntoEquilibrio: 9200 },
  { mes: "Nov", beneficio: 11700, puntoEquilibrio: 8800 },
  { mes: "Dic", beneficio: 10900, puntoEquilibrio: 8800 },
]

export const distribucionCostos = [
  { name: "Personal", value: 35000 },
  { name: "Suministros", value: 12000 },
  { name: "Materias primas", value: 28000 },
  { name: "Alquiler", value: 15000 },
  { name: "Marketing", value: 5000 },
  { name: "Otros", value: 8000 },
]

// Añadir datos de referencia estándar para la industria de restaurantes
export const distribucionCostosEstandar = {
  Personal: 35,
  Suministros: 8,
  "Materias primas": 30,
  Alquiler: 10,
  Marketing: 5,
  Otros: 12,
}

export const comparativaIngresosGastos = [
  { mes: "Ene", ingresos: 45000, gastos: 36500 },
  { mes: "Feb", ingresos: 48000, gastos: 38800 },
  { mes: "Mar", ingresos: 52000, gastos: 41500 },
  { mes: "Abr", ingresos: 49000, gastos: 39200 },
  { mes: "May", ingresos: 53000, gastos: 41800 },
  { mes: "Jun", ingresos: 58000, gastos: 45200 },
  { mes: "Jul", ingresos: 62000, gastos: 47500 },
  { mes: "Ago", ingresos: 65000, gastos: 49800 },
  { mes: "Sep", ingresos: 59000, gastos: 45200 },
  { mes: "Oct", ingresos: 56000, gastos: 43550 },
  { mes: "Nov", ingresos: 54000, gastos: 42300 },
  { mes: "Dic", ingresos: 52000, gastos: 41100 },
]

export const ocupacionData = [
  { mes: "Ene", real: 65, objetivo: 70 },
  { mes: "Feb", real: 68, objetivo: 70 },
  { mes: "Mar", real: 72, objetivo: 75 },
  { mes: "Abr", real: 70, objetivo: 75 },
  { mes: "May", real: 74, objetivo: 75 },
  { mes: "Jun", real: 78, objetivo: 80 },
  { mes: "Jul", real: 82, objetivo: 80 },
  { mes: "Ago", real: 85, objetivo: 80 },
  { mes: "Sep", real: 80, objetivo: 75 },
  { mes: "Oct", real: 78, objetivo: 75 },
  { mes: "Nov", real: 73, objetivo: 70 },
  { mes: "Dic", real: 72, objetivo: 70 },
]

export const ingresosPorTurno = [
  { x: 1, y: 12000, size: 80, turno: "Comida Lunes" },
  { x: 1, y: 8500, size: 60, turno: "Cena Lunes" },
  { x: 2, y: 10500, size: 70, turno: "Comida Martes" },
  { x: 2, y: 9200, size: 65, turno: "Cena Martes" },
  { x: 3, y: 11800, size: 75, turno: "Comida Miércoles" },
  { x: 3, y: 9800, size: 68, turno: "Cena Miércoles" },
  { x: 4, y: 13200, size: 85, turno: "Comida Jueves" },
  { x: 4, y: 11500, size: 75, turno: "Cena Jueves" },
  { x: 5, y: 16500, size: 95, turno: "Comida Viernes" },
  { x: 5, y: 18200, size: 98, turno: "Cena Viernes" },
  { x: 6, y: 16800, size: 92, turno: "Comida Sábado" },
  { x: 6, y: 19500, size: 100, turno: "Cena Sábado" },
  { x: 7, y: 15200, size: 88, turno: "Comida Domingo" },
  { x: 7, y: 12800, size: 78, turno: "Cena Domingo" },
]

export const alertas = [
  {
    id: 1,
    titulo: "Ocupación por debajo del punto equilibrio",
    descripcion: "La ocupación del martes noche (62%) estuvo por debajo del punto de equilibrio (65%)",
    tipo: "warning",
    fecha: "2023-10-17",
  },
  {
    id: 2,
    titulo: "Ticket medio superior al objetivo",
    descripcion: "El ticket medio del fin de semana ha sido un 8% superior al objetivo",
    tipo: "success",
    fecha: "2023-10-16",
  },
  {
    id: 3,
    titulo: "Incremento de costes de suministros",
    descripcion: "Los costes de suministros han aumentado un 12% respecto al mes anterior",
    tipo: "danger",
    fecha: "2023-10-15",
  },
  {
    id: 4,
    titulo: "Alto ratio de cancelaciones",
    descripcion: "Se han registrado un 15% de cancelaciones el viernes noche",
    tipo: "warning",
    fecha: "2023-10-14",
  },
]

// Datos operativos
export const datosOperativosDiarios = [
  {
    fecha: "2023-10-17",
    turnos: [
      {
        nombre: "Comida",
        ingresos: 3250,
        comensales: 115,
        ocupacion: 72,
        ticket: 28.26,
      },
      {
        nombre: "Cena",
        ingresos: 4150,
        comensales: 135,
        ocupacion: 84,
        ticket: 30.74,
      },
    ],
  },
  {
    fecha: "2023-10-16",
    turnos: [
      {
        nombre: "Comida",
        ingresos: 2850,
        comensales: 100,
        ocupacion: 62.5,
        ticket: 28.5,
      },
      {
        nombre: "Cena",
        ingresos: 2650,
        comensales: 92,
        ocupacion: 57.5,
        ticket: 28.8,
      },
    ],
  },
  {
    fecha: "2023-10-15",
    turnos: [
      {
        nombre: "Comida",
        ingresos: 4550,
        comensales: 152,
        ocupacion: 95,
        ticket: 29.93,
      },
      {
        nombre: "Cena",
        ingresos: 4280,
        comensales: 145,
        ocupacion: 90.6,
        ticket: 29.52,
      },
    ],
  },
]

export const costesOperativosMensuales = [
  {
    id: 1,
    categoria: "Personal",
    importe: 35000,
    desglose: [
      { concepto: "Salarios", importe: 27000 },
      { concepto: "Seguridad Social", importe: 8000 },
    ],
  },
  {
    id: 2,
    categoria: "Materias Primas",
    importe: 28000,
    desglose: [
      { concepto: "Alimentos", importe: 20000 },
      { concepto: "Bebidas", importe: 8000 },
    ],
  },
  {
    id: 3,
    categoria: "Suministros",
    importe: 12000,
    desglose: [
      { concepto: "Electricidad", importe: 6000 },
      { concepto: "Agua", importe: 2000 },
      { concepto: "Gas", importe: 4000 },
    ],
  },
  {
    id: 4,
    categoria: "Alquiler",
    importe: 15000,
    desglose: [{ concepto: "Alquiler local", importe: 15000 }],
  },
  {
    id: 5,
    categoria: "Marketing",
    importe: 5000,
    desglose: [
      { concepto: "Publicidad online", importe: 3000 },
      { concepto: "Publicidad impresa", importe: 1000 },
      { concepto: "Eventos", importe: 1000 },
    ],
  },
  {
    id: 6,
    categoria: "Otros",
    importe: 8000,
    desglose: [
      { concepto: "Mantenimiento", importe: 3000 },
      { concepto: "Servicios profesionales", importe: 2000 },
      { concepto: "Seguros", importe: 1500 },
      { concepto: "Varios", importe: 1500 },
    ],
  },
]

// Configuración básica del restaurante
export const configuracionRestaurante = {
  nombre: "Mi Restaurante NÜA",
  direccion: "Calle Gran Vía 123, 28001 Madrid",
  cif: "B12345678",
  telefono: "910 123 456",
  email: "info@mirestaurante.com",
  mesas: 32,
  plazas: 160,
  turnosDiarios: [
    { nombre: "Comida", horaInicio: "13:00", horaFin: "16:00" },
    { nombre: "Cena", horaInicio: "20:00", horaFin: "23:30" },
  ],
  diasOperativos: [
    { dia: "Lunes", abierto: true, turnos: ["Comida", "Cena"] },
    { dia: "Martes", abierto: true, turnos: ["Comida", "Cena"] },
    { dia: "Miércoles", abierto: true, turnos: ["Comida", "Cena"] },
    { dia: "Jueves", abierto: true, turnos: ["Comida", "Cena"] },
    { dia: "Viernes", abierto: true, turnos: ["Comida", "Cena"] },
    { dia: "Sábado", abierto: true, turnos: ["Comida", "Cena"] },
    { dia: "Domingo", abierto: true, turnos: ["Comida"] },
  ],
}

export const objetivosFinancieros = {
  ocupacionMinima: 65,
  ocupacionObjetivo: 80,
  ticketMedioObjetivo: 30,
  margenBrutoObjetivo: 65,
  ebitdaObjetivo: 20,
  incrementoVentasAnual: 10,
}

// Datos para la sección de créditos
export const creditosActivos = [
  {
    id: 1,
    tipo: "Préstamo",
    entidad: "Banco Santander",
    descripcion: "Préstamo para reforma del local",
    importeInicial: 120000,
    saldoPendiente: 85000,
    tipoInteres: 4.5,
    fechaInicio: "2022-03-15",
    fechaFin: "2027-03-15",
    plazoMeses: 60,
    cuotaMensual: 2250,
    interesesPagados: 12500,
    proximoPago: "2023-11-15",
    estado: "Al día",
    garantias: "Hipotecaria",
    impactoMensual: -2250,
    impactoCashflow: [
      { mes: "Ene", valor: -2250 },
      { mes: "Feb", valor: -2250 },
      { mes: "Mar", valor: -2250 },
      { mes: "Abr", valor: -2250 },
      { mes: "May", valor: -2250 },
      { mes: "Jun", valor: -2250 },
      { mes: "Jul", valor: -2250 },
      { mes: "Ago", valor: -2250 },
      { mes: "Sep", valor: -2250 },
      { mes: "Oct", valor: -2250 },
      { mes: "Nov", valor: -2250 },
      { mes: "Dic", valor: -2250 },
    ],
  },
  {
    id: 2,
    tipo: "Línea de Crédito",
    entidad: "BBVA",
    descripcion: "Línea de crédito para operaciones",
    importeInicial: 50000,
    saldoPendiente: 18500,
    tipoInteres: 5.2,
    fechaInicio: "2023-01-10",
    fechaFin: "2024-01-10",
    plazoMeses: 12,
    cuotaMensual: 0, // No tiene cuota fija al ser línea de crédito
    interesesPagados: 1850,
    proximoPago: "2023-11-30",
    estado: "Al día",
    garantias: "Personal",
    impactoMensual: -80, // Solo intereses mensuales aproximados
    impactoCashflow: [
      { mes: "Ene", valor: 15000 }, // Disposición inicial
      { mes: "Feb", valor: -65 },
      { mes: "Mar", valor: 5000 }, // Nueva disposición
      { mes: "Abr", valor: -80 },
      { mes: "May", valor: -80 },
      { mes: "Jun", valor: -80 },
      { mes: "Jul", valor: -80 },
      { mes: "Ago", valor: -80 },
      { mes: "Sep", valor: -80 },
      { mes: "Oct", valor: -80 },
      { mes: "Nov", valor: -80 },
      { mes: "Dic", valor: -80 },
    ],
  },
  {
    id: 3,
    tipo: "Préstamo ICO",
    entidad: "CaixaBank",
    descripcion: "Préstamo ICO COVID-19",
    importeInicial: 80000,
    saldoPendiente: 45000,
    tipoInteres: 2.8,
    fechaInicio: "2020-06-01",
    fechaFin: "2025-06-01",
    plazoMeses: 60,
    cuotaMensual: 1430,
    interesesPagados: 8600,
    proximoPago: "2023-11-01",
    estado: "Al día",
    garantias: "Aval ICO",
    impactoMensual: -1430,
    impactoCashflow: [
      { mes: "Ene", valor: -1430 },
      { mes: "Feb", valor: -1430 },
      { mes: "Mar", valor: -1430 },
      { mes: "Abr", valor: -1430 },
      { mes: "May", valor: -1430 },
      { mes: "Jun", valor: -1430 },
      { mes: "Jul", valor: -1430 },
      { mes: "Ago", valor: -1430 },
      { mes: "Sep", valor: -1430 },
      { mes: "Oct", valor: -1430 },
      { mes: "Nov", valor: -1430 },
      { mes: "Dic", valor: -1430 },
    ],
  },
  {
    id: 4,
    tipo: "Leasing",
    entidad: "Sabadell",
    descripcion: "Leasing equipamiento cocina",
    importeInicial: 35000,
    saldoPendiente: 22000,
    tipoInteres: 3.9,
    fechaInicio: "2022-09-01",
    fechaFin: "2025-09-01",
    plazoMeses: 36,
    cuotaMensual: 1050,
    interesesPagados: 3200,
    proximoPago: "2023-11-01",
    estado: "Al día",
    garantias: "Equipamiento",
    impactoMensual: -1050,
    impactoCashflow: [
      { mes: "Ene", valor: -1050 },
      { mes: "Feb", valor: -1050 },
      { mes: "Mar", valor: -1050 },
      { mes: "Abr", valor: -1050 },
      { mes: "May", valor: -1050 },
      { mes: "Jun", valor: -1050 },
      { mes: "Jul", valor: -1050 },
      { mes: "Ago", valor: -1050 },
      { mes: "Sep", valor: -1050 },
      { mes: "Oct", valor: -1050 },
      { mes: "Nov", valor: -1050 },
      { mes: "Dic", valor: -1050 },
    ],
  },
]

// Datos para el impacto en el cash flow
export const impactoCreditosCashflow = [
  { mes: "Ene", impacto: 10270 }, // Positivo por la disposición de línea de crédito
  { mes: "Feb", valor: -4795 },
  { mes: "Mar", valor: 270 }, // Positivo por nueva disposición
  { mes: "Abr", valor: -4810 },
  { mes: "May", valor: -4810 },
  { mes: "Jun", valor: -4810 },
  { mes: "Jul", valor: -4810 },
  { mes: "Ago", valor: -4810 },
  { mes: "Sep", valor: -4810 },
  { mes: "Oct", valor: -4810 },
  { mes: "Nov", valor: -4810 },
  { mes: "Dic", valor: -4810 },
]

// Datos para el resumen de créditos
export const resumenCreditos = {
  totalImporteInicial: 285000,
  totalSaldoPendiente: 170500,
  totalCuotasMensuales: 4810,
  totalInteresesPagados: 26150,
  ratioDeuda: 32.5, // Porcentaje de deuda sobre facturación anual
  costeMedioPonderado: 4.1, // Porcentaje
  proximosVencimientos: [
    { fecha: "2023-11-01", importe: 2480, entidad: "CaixaBank y Sabadell" },
    { fecha: "2023-11-15", importe: 2250, entidad: "Banco Santander" },
    { fecha: "2023-11-30", importe: 80, entidad: "BBVA" },
  ],
  alertas: [
    {
      id: 1,
      titulo: "Próxima renovación línea de crédito",
      descripcion: "La línea de crédito con BBVA vence en 2 meses",
      tipo: "warning",
      fecha: "2023-11-10",
    },
    {
      id: 2,
      titulo: "Oportunidad de refinanciación",
      descripcion: "Los tipos de interés han bajado, posible ahorro de 1.2% en préstamo principal",
      tipo: "success",
      fecha: "2023-10-25",
    },
  ],
}
