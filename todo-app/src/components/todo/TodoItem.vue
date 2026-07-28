<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { Todo } from "@/domain/todo/types/todo.types";

const props = defineProps<{
  todo: Todo;
}>();

const emit = defineEmits<{
  (e: "toggle", id: string): void;
  (e: "remove", id: string): void;
}>();

const { t } = useI18n();
</script>

<template>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <div class="form-check">
      <input
        :id="props.todo.id"
        class="form-check-input"
        type="checkbox"
        :checked="props.todo.completed"
        @change="emit('toggle', props.todo.id)"
      />
      <label
        class="form-check-label"
        :class="{
          'text-decoration-line-through text-muted': props.todo.completed,
        }"
        :for="props.todo.id"
      >
        {{ props.todo.title }}
      </label>
    </div>
    <button
      class="btn btn-sm btn-outline-danger"
      type="button"
      @click="emit('remove', props.todo.id)"
    >
      {{ t("todo.remove") }}
    </button>
  </li>
</template>
