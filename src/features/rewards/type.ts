export interface Reward {
  id: string;
  name: string;
  benefit_value: string;
  requirement_type: number;
}

export type Requirement = {
  id: number;
  name: string;
};

export type Benefit = {
  id: number;
  name: string;
};
