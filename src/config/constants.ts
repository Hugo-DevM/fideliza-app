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
