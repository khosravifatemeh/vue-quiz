import { MutationTypes } from "./mutation-types";
import { State, QuestionState, AnswerObject } from "./state";
import { MutationTree } from "vuex";

export type Mutations<S = State> = {
  [MutationTypes.SET_GAME_OVER](state: S, payload: boolean): void;
  [MutationTypes.SET_LOADING](state: S, payload: boolean): void;
  [MutationTypes.SET_NUMBER](state: S, payload: number): void;
  [MutationTypes.SET_QUESTIONS](state: S, payload: QuestionState[]): void;
  [MutationTypes.SET_SCORE](state: S, payload: number): void;
  [MutationTypes.SET_USER_ANSWER](
    state: S,
    payload: AnswerObject | undefined
  ): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_GAME_OVER](state, payload: boolean) {
    state.gameOver = payload;
  },
  [MutationTypes.SET_LOADING](state, payload: boolean) {
    state.loading = payload;
  },
  [MutationTypes.SET_NUMBER](state, payload: number) {
    state.number = payload;
  },
  [MutationTypes.SET_QUESTIONS](state, payload: QuestionState[]) {
    state.questions = payload;
  },
  [MutationTypes.SET_SCORE](state, payload: number) {
    state.score = payload;
  },
  [MutationTypes.SET_USER_ANSWER](state, payload: AnswerObject | undefined) {
    state.userAnswer = payload;
  },
};
