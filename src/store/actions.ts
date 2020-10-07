import { ActionTree, ActionContext } from "vuex";
import { State, QuestionState, Question } from "./state";
import { MutationTypes } from "./mutation-types";
import { Mutations } from "./mutations";
import { ActionTypes } from "./action-types";

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}
type QuestionParams = {
  amount: number;
  difficulty: Difficulty;
};
type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, "commit">;

export interface Actions {
  [ActionTypes.GET_QUESTIONS](
    { commit }: AugmentedActionContext,
    payload: QuestionParams
  ): void;
  [ActionTypes.CHECK_ANSWER](
    { commit, state }: AugmentedActionContext,
    payload: any
  ): void;
  [ActionTypes.HANDLE_NEXT_QUESTION]({
    commit,
    state,
  }: AugmentedActionContext): void;
}
export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.GET_QUESTIONS]({ commit }, { amount, difficulty }) {
    commit(MutationTypes.SET_GAME_OVER, false);
    commit(MutationTypes.SET_LOADING, true);
    const endpoint = `https://opentdb.com/api.php?amount= ${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(endpoint)).json();
    const questions = data.results.map((question: Question) => ({
      ...question,
      answers: [...question.incorrect_answers, question.correct_answer],
    }));
    commit(MutationTypes.SET_QUESTIONS, questions);
    commit(MutationTypes.SET_LOADING, false);
  },
  [ActionTypes.CHECK_ANSWER]({ commit, state }, payload) {
    if (state.gameOver) return false;
    console.log("hi", payload.currentTarget.value);

    const answer = payload.currentTarget.value;
    const correct = state.questions[state.number].correct_answer === answer;
    if (correct) commit(MutationTypes.SET_SCORE, state.score + 1);
    commit(MutationTypes.SET_USER_ANSWER, {
      question: state.questions[state.number].question,
      answer,
      correctAnswer: state.questions[state.number].correct_answer,
    });
  },
  [ActionTypes.HANDLE_NEXT_QUESTION]({ commit, state }) {
    const nextQuestion = state.number + 1;
    if (nextQuestion === state.numberOfQuestions)
      commit(MutationTypes.SET_GAME_OVER, true);
    commit(MutationTypes.SET_NUMBER, state.number + 1);
    commit(MutationTypes.SET_USER_ANSWER, undefined);
  },
};
