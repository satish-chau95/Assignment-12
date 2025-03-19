import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'developer' | 'manager';
};

export type Bug = {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in-progress' | 'pending-approval' | 'closed' | 'reopened';
  assignee: string;
  createdBy: string;
  createdAt: string;
  dueDate: string;
  timeSpent: number;
  lastUpdated: string;
};

type State = {
  user: User | null;
  bugs: Bug[];
  timeTracking: Record<string, number>;
};

type Actions = {
  login: (credentials: { email: string; password: string }) => boolean;
  logout: () => void;
  addBug: (bug: Omit<Bug, 'id' | 'createdAt' | 'lastUpdated'>) => void;
  updateBug: (id: string, bug: Partial<Bug>) => void;
  deleteBug: (id: string) => void;
  updateTimeSpent: (bugId: string, time: number) => void;
};

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Developer',
    email: 'dev@example.com',
    role: 'developer',
  },
  {
    id: '2',
    name: 'Sarah Manager',
    email: 'manager@example.com',
    role: 'manager',
  },
];

// Mock credentials
const mockCredentials: Record<string, string> = {
  'dev@example.com': 'password123',
  'manager@example.com': 'password123',
};

export const useStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      user: null,
      bugs: [],
      timeTracking: {},

      login: (credentials) => {
        const { email, password } = credentials;
        if (mockCredentials[email] === password) {
          const user = mockUsers.find((u) => u.email === email);
          if (user) {
            set({ user });
            return true;
          }
        }
        return false;
      },

      logout: () => {
        set({ user: null });
      },

      addBug: (bug) => {
        const newBug: Bug = {
          ...bug,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
          lastUpdated: new Date().toISOString(),
        };
        set((state) => ({ bugs: [...state.bugs, newBug] }));
      },

      updateBug: (id, updatedFields) => {
        set((state) => ({
          bugs: state.bugs.map((bug) =>
            bug.id === id
              ? {
                  ...bug,
                  ...updatedFields,
                  lastUpdated: new Date().toISOString(),
                }
              : bug
          ),
        }));
      },

      deleteBug: (id) => {
        set((state) => ({
          bugs: state.bugs.filter((bug) => bug.id !== id),
        }));
      },

      updateTimeSpent: (bugId, time) => {
        set((state) => ({
          timeTracking: {
            ...state.timeTracking,
            [bugId]: (state.timeTracking[bugId] || 0) + time,
          },
          bugs: state.bugs.map((bug) =>
            bug.id === bugId
              ? { ...bug, timeSpent: (bug.timeSpent || 0) + time }
              : bug
          ),
        }));
      },
    }),
    {
      name: 'bug-tracker-storage',
    }
  )
);