import { ref, computed } from "vue";
import type { Todo, CreateTodoPayload } from "../types/todo.types";

/**
 * Encapsulates all state and business rules for the Todo domain.
 * Components consuming this composable stay purely presentational -
 * no component is allowed to mutate `todos` directly.
 */
export function useTodoList() {
  const todos = ref<Todo[]>([]);

  const remainingCount = computed(
    () => todos.value.filter((todo) => !todo.completed).length,
  );

  const hasTodos = computed(() => todos.value.length > 0);

  /**
   * Mapping boundary: this is where an API DTO would be transformed
   * into the internal domain model. Kept isolated here so swapping
   * local state for a generated OpenAPI client later only touches
   * this function, never the components.
   */
  function addTodo(payload: CreateTodoPayload): void {
    const trimmedTitle = payload.title.trim();
    if (!trimmedTitle) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: trimmedTitle,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    todos.value.push(newTodo);
  }

  function toggleTodo(id: string): void {
    const target = todos.value.find((todo) => todo.id === id);
    if (target) target.completed = !target.completed;
  }

  function removeTodo(id: string): void {
    todos.value = todos.value.filter((todo) => todo.id !== id);
  }

  return {
    todos,
    remainingCount,
    hasTodos,
    addTodo,
    toggleTodo,
    removeTodo,
  };
}
