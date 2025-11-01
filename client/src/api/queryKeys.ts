export const queryKeys = {
  user: ['user'] as const,
  tasks: (userId: string) => ['tasks', userId] as const,
};