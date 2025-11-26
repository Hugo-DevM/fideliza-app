export const girosSingupSchema = [
  { id: 1, label: "Estéticas y barberías" },
  { id: 2, label: "Restaurantes, cafeterías y food trucks" },
  { id: 3, label: "Tiendas de abarrotes / minisupers" },
  { id: 4, label: "Boutiques de ropa y calzado" },
  { id: 5, label: "Farmacias independientes" },
  { id: 6, label: "Tiendas de electrónica y accesorios para celular" },
  { id: 7, label: "Tiendas de nutrición y suplementos" },
  { id: 8, label: "Gimnasios y estudios fitness" },
  { id: 9, label: "Clínicas dentales y consultorios" },
  { id: 10, label: "Talleres mecánicos" },
  { id: 11, label: "Lavanderías y tintorerías" },
  { id: 12, label: "Spa, masajes y wellness" },
  { id: 13, label: "Tiendas de mascotas y veterinarias" },
  { id: 14, label: "Ferreterías" },
  { id: 15, label: "Panaderías y pastelerías" },
  { id: 16, label: "Carnicerías y pescaderías" },
  { id: 17, label: "Agencias de viajes" },
  { id: 18, label: "Servicios de limpieza y mantenimiento" },
] as const;

export const benefitTypesSchema = [
  { id: 1, label: "Producto gratis" },
  { id: 2, label: "Porcentaje" },
  { id: 3, label: "Monto" },
  { id: 4, label: "Puntos" },
  { id: 5, label: "Producto específico" },
];

export const requirementTypesSchema = [
  { id: 1, label: "Visitas" },
  { id: 2, label: "Compras" },
  { id: 3, label: "Monto acumulado" },
  { id: 4, label: "Producto específico" },
  { id: 5, label: "Puntos" },
];

export const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/clients", label: "Clientes" },
  { href: "/rewards", label: "Recompensas" },
  { href: "/reports", label: "Informes" },
  { href: "/settings", label: "Ajustes" },
];

//Datos ficticios a borrar
export const clientsMock = [
  {
    id: 1,
    nombre: "Sofía Rodríguez",
    visitas: 2,
    recompensa: "Café Gratis",
  },
  {
    id: 2,
    nombre: "Carlos Pérez",
    visitas: 10,
    recompensa: "Café Gratis",
  },
  {
    id: 3,
    nombre: "Ana García",
    visitas: 5,
    recompensa: "Rebanada de pastel",
  },
  {
    id: 4,
    nombre: "Javier López",
    visitas: 1,
    recompensa: "Café Gratis",
  },
  {
    id: 5,
    nombre: "María Fernández",
    visitas: 6,
    recompensa: "Rebanada de pastel",
  },
  {
    id: 6,
    nombre: "Carlos Tapia",
    visitas: 3,
    recompensa: "Café Gratis",
  },
  {
    id: 7,
    nombre: "Armando Cuevas",
    visitas: 8,
    recompensa: "Café Gratis",
  },
  {
    id: 8,
    nombre: "Ricardo Parza",
    visitas: 1,
    recompensa: "Café Gratis",
  },
  {
    id: 9,
    nombre: "Fernanda Chávez",
    visitas: 3,
    recompensa: "Café Gratis",
  },
];

//Datos a borra

export const rewardsMock = [
  {
    id: 1,
    beneficio: {
      nombre: "Café Gratis",
      descripcion: "En la compra de 10 cafés el 11 es gratis",
      tipo_beneficio: "producto",
      valor_beneficio: "Café",
    },
    requisito: {
      tipo_requisito: "visitas",
      valor_requisito: 10,
    },
  },
  {
    id: 2,
    beneficio: {
      nombre: "10% de Descuento",
      descripcion: "Descuento en la compra total",
      tipo_beneficio: "descuento",
      valor_beneficio: 10,
    },
    requisito: {
      tipo_requisito: "monto",
      valor_requisito: 300,
    },
  },
  {
    id: 3,
    beneficio: {
      nombre: "Rebanada de Pastel",
      descripcion: "Al llegar a 5 visitas obtén una rebanada",
      tipo_beneficio: "producto",
      valor_beneficio: "Rebanada de pastel",
    },
    requisito: {
      tipo_requisito: "visitas",
      valor_requisito: 5,
    },
  },
  {
    id: 4,
    beneficio: {
      nombre: "Bebida Mediana por $15",
      descripcion: "Obtén una bebida por precio especial",
      tipo_beneficio: "descuento_fijo",
      valor_beneficio: 15,
    },
    requisito: {
      tipo_requisito: "visitas",
      valor_requisito: 8,
    },
  },
  {
    id: 5,
    beneficio: {
      nombre: "100 Puntos Extra",
      descripcion: "Puntos adicionales para canjear",
      tipo_beneficio: "puntos",
      valor_beneficio: 100,
    },
    requisito: {
      tipo_requisito: "puntos",
      valor_requisito: 500,
    },
  },
  {
    id: 6,
    beneficio: {
      nombre: "2x1 en Smoothies",
      descripcion: "Promo especial en smoothies seleccionados",
      tipo_beneficio: "promocion",
      valor_beneficio: "2x1 Smoothies",
    },
    requisito: {
      tipo_requisito: "monto",
      valor_requisito: 250,
    },
  },
  {
    id: 7,
    beneficio: {
      nombre: "Taza personalizada",
      descripcion: "Taza de regalo por fidelidad",
      tipo_beneficio: "producto",
      valor_beneficio: "Taza personalizada",
    },
    requisito: {
      tipo_requisito: "visitas",
      valor_requisito: 12,
    },
  },
  {
    id: 8,
    beneficio: {
      nombre: "20% de Descuento",
      descripcion: "Descuento premium",
      tipo_beneficio: "descuento",
      valor_beneficio: 20,
    },
    requisito: {
      tipo_requisito: "monto",
      valor_requisito: 500,
    },
  },
  {
    id: 9,
    beneficio: {
      nombre: "Refill Gratis",
      descripcion: "Refill de café ilimitado por día",
      tipo_beneficio: "promocion",
      valor_beneficio: "Refill",
    },
    requisito: {
      tipo_requisito: "visitas",
      valor_requisito: 7,
    },
  },
  {
    id: 10,
    beneficio: {
      nombre: "250 Puntos",
      descripcion: "Puntos para futuras compras",
      tipo_beneficio: "puntos",
      valor_beneficio: 250,
    },
    requisito: {
      tipo_requisito: "puntos",
      valor_requisito: 1200,
    },
  },
];
