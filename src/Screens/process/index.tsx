import Button from "components/button";
import { ButtonDesignTypes } from "components/button/ButtonDesignTypes";
import { useAppSelector, useAppDispatch } from "app/hooks";
import "./index.scss";
import {
  progressInPercent,
  currentQuestion,
  fetchQuestions,
  setCurrentQuestionNumber,
} from "app/slices/Questions";
import { LocalStorageTypes } from "app/LocalStorageTypes";
import { setAnswer } from "app/slices/Answers";
import { setToLocaleStorage } from "util/functions/setToLocaleStorage";
import { useHistory } from "react-router-dom";

import { ReactComponent as PC_top_left } from "static/decor/processScreen/PC_top_left.svg";
import { ReactComponent as PC_bottom_left } from "static/decor/processScreen/PC_bottom_left.svg";
import { ReactComponent as PC_top_right } from "static/decor/processScreen/PC_top_right.svg";
import { ReactComponent as PC_bottom_right } from "static/decor/processScreen/PC_bottom_right.svg";
import { ReactComponent as Mobile_middle_right } from "static/decor/processScreen/Mobile_middle_right.svg";
import { RouteTypes } from "app/RouteTypes";
function Process(): JSX.Element {
  const history = useHistory();
  const difficulty = useAppSelector((state) => state.params.difficulty);
  const questionsAmount = useAppSelector(
    (state) => state.params.questionsAmount
  );
  const currentQuestionNumber = useAppSelector(
    (state) => state.questions.currentQuestionNumber
  );
  if (
    !difficulty ||
    !questionsAmount ||
    currentQuestionNumber >= questionsAmount
  ) {
    localStorage.clear();
    history.goBack();
  }

  const questionsArr = useAppSelector((state) => state.questions.questionsArr);
  const usersAnswers = useAppSelector((state) => state.answers.answersArr);

  const dispatch = useAppDispatch();
  if (questionsArr.length <= 0) {
    dispatch(fetchQuestions({ difficulty, questionsAmount }));
  }

  const question = useAppSelector((state) => currentQuestion(state));

  const progress = useAppSelector((state) => progressInPercent(state));

  const level = useAppSelector((state) => state.level.level);

  return (
    <div className="process">
      <header className="process__header">
        <h1 className="process__category">{question?.category ?? ""}</h1>

        <h2 className="process__level">level {level}</h2>
      </header>
      <div className="process__progress progress">
        <div className="progress__score-wrapper">
          <span className="progress__score-done">
            {currentQuestionNumber + 1}
          </span>
          <span className="progress__score-all">/{questionsAmount}</span>
        </div>
        <div className="progress__bar-wrapper">
          <div className="progress__whole-bar"></div>
          <div
            className="progress__done-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <div className="process__question-container">
        <p className="process__question-content">{question?.question ?? ""}</p>
      </div>
      <div className="process__buttons-container">
        <Button
          colorType={ButtonDesignTypes.blue}
          text={"True"}
          onClick={() => onAnswerClick(true)}
        />
        <div className="process__buttons-spacer"></div>
        <Button
          colorType={ButtonDesignTypes.white}
          text={"False"}
          onClick={() => onAnswerClick(false)}
        />
      </div>
      <div className="decor">
        {/* _pc-middle-right */}
        <PC_top_left className="decor-process decor-process_pc-top-left" />
        <PC_bottom_left className="decor-process decor-process_pc-bottom-left" />
        <PC_top_right className="decor-process decor-process_pc-top-right" />
        <Mobile_middle_right className="decor-process decor-process_mobile-middle-right" />
        <PC_bottom_right className="decor-process decor-process_pc-bottom-right" />
      </div>
    </div>
  );
  function onAnswerClick(answer: boolean) {
    dispatch(setAnswer(answer));
    // Have to create a copy to make everything works _really_ sync
    let deepCopy = JSON.parse(JSON.stringify(usersAnswers)) as boolean[];
    deepCopy.push(answer);
    setToLocaleStorage({
      key: LocalStorageTypes.answers,
      value: deepCopy,
    });
    const newNumber = currentQuestionNumber + 1;
    if (newNumber == questionsAmount) {
      history.push(RouteTypes.score);
    }
    dispatch(setCurrentQuestionNumber(newNumber));
    setToLocaleStorage({
      key: LocalStorageTypes.currentQuestionNumber,
      value: newNumber,
    });
  }
}
export default Process;
