export interface Reward {
  id: string;
  name: string;
  description?: string;
  benefit_type?: number;
  benefit_value: string;
  requirement_type: number;
  requirement_value?: string;
}

export type Requirement = {
  id: number;
  name: string;
};

export type Benefit = {
  id: number;
  name: string;
};
