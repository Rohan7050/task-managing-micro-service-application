export const queryKeys = {
  // user keys
  user: ['user'] as const,

  // board keys
  boards: ['boards'] as const,
  tasks: (userId: string) => ['tasks', userId] as const,
};