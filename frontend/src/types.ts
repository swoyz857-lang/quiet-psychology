export * from '@quiet-psychology/types';

export interface AuthContextType {
  user: { id: number; email: string; isAdmin: boolean } | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}
