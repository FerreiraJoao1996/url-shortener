export type User = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};


export interface UpdateUser extends User {
  id: number;
}