import "./index.scss";
import { QuestionProps } from "./ResolvedQuestionProps";
import { ReactComponent as QuestionCorrect } from "static/QuestionCorrect.svg";
import { ReactComponent as QuestionIncorrect } from "static/QuestionIncorrect.svg";
export const ResolvedQuestion = ({
  isCorrect,
  text,
  key,
}: QuestionProps): JSX.Element => {
  const questionCorrect = (): JSX.Element => (
    <QuestionCorrect className="question__sign" />
  );
  const questionInCorrect = (): JSX.Element => (
    <QuestionIncorrect className="question__sign" />
  );
  // TODO: write about problems with API
  const Sign = isCorrect ? questionCorrect() : questionInCorrect();
  return (
    <div
      key={key}
      className={`question ${
        isCorrect ? "question_correct" : "question_incorrect"
      }`}
    >
      <p className="question__text">{text}</p>
      {Sign}
    </div>
  );
};
