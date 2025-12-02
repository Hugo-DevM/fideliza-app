export interface Reward {
  id: number;
  beneficio: {
    nombre: string;
    descripcion?: string;
    tipo_beneficio:
      | "producto"
      | "descuento"
      | "puntos"
      | "promocion"
      | "descuento_fijo"
      | string;
    valor_beneficio: string | number;
  };
  requisito: {
    tipo_requisito: "visitas" | "monto" | "puntos" | string;
    valor_requisito: number;
    descripcion?: string;
  };
}

export type Requirement = {
  id: number;
  name: string;
};

export type Benefit = {
  id: number;
  name: string;
};
