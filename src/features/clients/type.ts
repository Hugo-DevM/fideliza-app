export interface Client {
  id: string | number;
  fullname: string;
  phone: string;
  total_visits?: number;
  email?: string | null;
}
