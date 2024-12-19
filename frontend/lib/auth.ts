import type { User } from './user';

export const mockUsers: User[] = [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin'
    },
    {
      id: '2',
      name: 'Regular User',
      email: 'user@example.com',
      role: 'user'
    }
  ];

export const getCurrentUser = (): User | null => {
    // Mock authentication - in real app, this would check session/JWT
    return mockUsers[0]; // Always returns admin for testing
    };

    export const isAdmin = (user: User | null): boolean => {
    return user?.role === 'admin';
    };  