/**
 * Domain model for a single Todo entity.
 * Structured to mirror a future OpenAPI schema (e.g. TodoDto),
 * so the mapping layer in the composable stays a 1:1 pass-through
 * once a real backend is introduced.
 */
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string; // ISO 8601 - kept as string to match typical API serialization
}

/**
 * Payload shape for creating a Todo. Separated from the Todo interface
 * itself because the client never controls id/createdAt/completed at creation time -
 * this is the contract a future POST /todos endpoint would expect.
 */
export interface CreateTodoPayload {
  title: string;
}
