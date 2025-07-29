export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

export const Filter = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
} as const;

export type Filter = (typeof Filter)[keyof typeof Filter];
