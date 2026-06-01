export interface User {
  id: string;
  name: string;
  department: string;
  role: string;
  approval_authority: number;
  avatar?: string;
}

export type UserRole = 
  | 'ADMIN' 
  | 'MANAGER' 
  | 'REVIEWER' 
  | 'APPROVER' 
  | 'EXECUTIVE';
