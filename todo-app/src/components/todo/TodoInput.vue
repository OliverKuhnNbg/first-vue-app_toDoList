<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

// Presentational component: owns only local form state, delegates
// the actual creation logic to the parent via emit.
const emit = defineEmits<{
  (e: "add", title: string): void;
}>();

const { t } = useI18n();
const inputValue = ref("");

function handleSubmit(): void {
  emit("add", inputValue.value);
  inputValue.value = "";
}
</script>

<template>
  <form class="d-flex gap-2 mb-3" @submit.prevent="handleSubmit">
    <input
      v-model="inputValue"
      type="text"
      class="form-control"
      :placeholder="t('todo.placeholder')"
    />
    <button type="submit" class="btn btn-primary">
      {{ t("todo.add") }}
    </button>
  </form>
</template>
