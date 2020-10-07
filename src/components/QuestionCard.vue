<template>
  <div>
    <p>Question: {{ current + 1 }} / {{ total }}</p>
    <div v-if="questions[current]">
      <p v-html="questions[current].question" />
      <button
        v-for="(item, index) in questions[current].answers"
        :key="index"
        v-html="item"
        :value="item"
        :class="{
          correct: userAnswer && item === userAnswer.correctAnswer,
          correct1:
            userAnswer &&
            item !== userAnswer.correctAnswer &&
            userAnswer.answer === item,
        }"
        :disabled="!!userAnswer"
        @click="checkAnswer"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { computed } from "vue";
  import { useStore } from "./../store";
  import { ActionTypes } from "./../store/action-types";

  export default {
    name: "QuestionCard",

    setup() {
      const store = useStore();
      const current = computed(() => store.state.number);
      const total = computed(() => store.state.numberOfQuestions);
      const questions = computed(() => store.state.questions);
      const userAnswer = computed(() => store.state.userAnswer);

      function checkAnswer(event: any) {
        store.dispatch(ActionTypes.CHECK_ANSWER, event);
      }
      return { current, total, questions, checkAnswer, userAnswer };
    },
  };
</script>

<style scoped lang="scss">
  button {
    color: blue;
    &.correct {
      color: green;
    }
    &.correct1 {
      color: red;
    }
  }
</style>
