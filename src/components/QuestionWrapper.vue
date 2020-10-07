<template>
  <div>
    <h1>VUE3 QUIZ</h1>
    <button v-if="gameOver" @click="startTrivia">start</button>
    <div v-if="!gameOver">score: {{ score }}</div>
    <question-card v-if="!loading && !gameOver" />
    <button v-if="!loading && !gameOver && userAnswer" @click="nextQuestion">
      next question
    </button>
    <p v-if="loading">...loading</p>
  </div>
</template>

<script lang="ts">
  import { useStore } from "./../store";
  import { ActionTypes } from "./../store/action-types";
  import { Difficulty } from "./../store/actions";
  import { computed } from "vue";
  import QuestionCard from "./QuestionCard.vue";
  export default {
    name: "QuestionWrapper",
    components: {
      QuestionCard,
    },
    setup() {
      const store = useStore();
      const gameOver = computed(() => store.state.gameOver);
      const loading = computed(() => store.state.loading);
      const score = computed(() => store.state.score);
      const userAnswer = computed(() => store.state.userAnswer);

      function startTrivia() {
        store.dispatch(ActionTypes.GET_QUESTIONS, {
          amount: 10,
          difficulty: Difficulty.EASY,
        });
      }
      function nextQuestion() {
        store.dispatch(ActionTypes.HANDLE_NEXT_QUESTION, undefined);
      }
      return {
        gameOver,
        startTrivia,
        loading,
        score,
        userAnswer,
        nextQuestion,
      };
    },
  };
</script>

<style scoped lang="scss"></style>
