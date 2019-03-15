export enum UserRoles {
  ADMIN = 'admin',
  USER = 'user'
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: UserRoles;
}

export function getUserMock(user?: Partial<User>): User {
  return {
    id: 1,
    email: 'test@gmail.com',
    name: 'test user',
    role: UserRoles.USER,
    ...user,
  };
}
