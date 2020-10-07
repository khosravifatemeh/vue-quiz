export type AnswerObject = {
  question: string;
  answer: string;
  correctAnswer: string;
};
export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};
export type QuestionState = Question & { answers: string[] };
interface QuizObject {
  questions: QuestionState[];
  userAnswer: AnswerObject | undefined;
  number: number;
  gameOver: boolean;
  loading: boolean;
  score: number;
  numberOfQuestions: number;
}
export const state: QuizObject = {
  questions: [],
  userAnswer: undefined,
  number: 0,
  gameOver: true,
  score: 0,
  loading: false,
  numberOfQuestions: 10
};
export type State = typeof state;
