<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useTodoList } from "@/domain/todo/composables/useTodoList";
import TodoInput from "./TodoInput.vue";
import TodoItem from "./TodoItem.vue";

// Orchestration only: wires the composable's state/actions into the
// presentational children. No business logic lives here.
const { todos, remainingCount, hasTodos, addTodo, toggleTodo, removeTodo } =
  useTodoList();

const { t } = useI18n();
</script>

<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <h2 class="card-title h4 mb-3">{{ t("todo.title") }}</h2>

      <TodoInput @add="(title) => addTodo({ title })" />

      <ul v-if="hasTodos" class="list-group mb-3">
        <TodoItem
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          @toggle="toggleTodo"
          @remove="removeTodo"
        />
      </ul>
      <p v-else class="text-muted">{{ t("todo.empty") }}</p>

      <small class="text-muted">
        {{ t("todo.remaining", { count: remainingCount }) }}
      </small>
    </div>
  </div>
</template>
