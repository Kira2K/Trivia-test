import { useHistory } from "react-router-dom";
import "./index.scss";
import { ReactComponent as PC_top_left } from "static/decor/scoreScreen/PC_top_left.svg";
import { ReactComponent as PC_top_right } from "static/decor/scoreScreen/PC_top_right.svg";
import { ReactComponent as PC_bottom_right } from "static/decor/scoreScreen/PC_bottom_right.svg";
import { ReactComponent as Mobile_top_right } from "static/decor/scoreScreen/Mobile_top_right.svg";
import { ReactComponent as Mobile_bottom_right } from "static/decor/scoreScreen/Mobile_bottom_right.svg";
import { ReactComponent as Avatar } from "static/Avatar.svg";
import { ReactComponent as StarOrange } from "static/StarOrange.svg";
import { ReactComponent as StarGrey } from "static/StarGrey.svg";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { RouteTypes } from "app/RouteTypes";
import {
  compareQuestionsWithUsersAnswers,
  resetAnswers,
} from "app/slices/Answers";
import { ResolvedQuestion } from "components/resolvedQuestion";
import Button from "components/button";
import { ButtonDesignTypes } from "components/button/ButtonDesignTypes";
import { setLevel } from "app/slices/Level";
import { setToLocaleStorage } from "util/functions/setToLocaleStorage";
import { LocalStorageTypes } from "app/LocalStorageTypes";
import { resetQuestionsArr } from "app/slices/Questions";
import { resetParams } from "app/slices/Params";

function Score(): JSX.Element {
  const history = useHistory();
  const questionsAmount = useAppSelector(
    (state) => state.params.questionsAmount
  );
  const answersArr = useAppSelector((state) => state.answers.answersArr);
  if (!questionsAmount || !answersArr || questionsAmount != answersArr.length)
    history.push(RouteTypes.home);
  const dispatch = useAppDispatch();

  const questionsWithAnswerArr =
    useAppSelector((state) => state.answers.questionsWithAnswerArr) ?? [];
  const correctAnswersAmount = useAppSelector(
    (state) => state.answers.correctAnswersAmount
  );

  const wrongAnswersAmount = useAppSelector(
    (state) => state.answers.wrongAnswersAmount
  );
  const questionsArr = useAppSelector((state) => state.questions.questionsArr);
  if (
    questionsWithAnswerArr.length == 0 ||
    questionsWithAnswerArr.length != questionsAmount ||
    !correctAnswersAmount ||
    !wrongAnswersAmount
  ) {
    dispatch(compareQuestionsWithUsersAnswers(questionsArr));
  }
  const questionsLayoutArr: JSX.Element[] = [];
  const orangeStarsArr: JSX.Element[] = [];
  const greyStarsArr: JSX.Element[] = [];
  resolveQuestionsByCorrectity();
  const level = useAppSelector((state) => state.level.level);
  return (
    <div className="score">
      <header className="score__header header">
        <div className="header__img-wrapper">
          <Avatar className="header__img" />
        </div>
        <div className="header__result">
          <p className="header__text">
            You scored
            <span className="header__correctNumber">
              {" " + correctAnswersAmount}
            </span>
            /{questionsAmount}
          </p>
        </div>
      </header>
      <div className="score__stars-container">
        {orangeStarsArr}
        {greyStarsArr}
      </div>
      <div className="score__questions-container">{questionsLayoutArr}</div>
      <div className="score__button-container">
        <Button
          colorType={ButtonDesignTypes.orange}
          text={"Play again"}
          onClick={onPlayAgainClick}
        />
      </div>
      <div className="decor">
        <PC_top_left className="decor-score decor-score_pc-top-left" />
        <PC_top_right className="decor-score decor-score_pc-top-right" />
        <PC_bottom_right className="decor-score decor-score_pc-bottom-right" />
        <Mobile_top_right className="decor-score decor-score_mobile-top-right" />
        <Mobile_bottom_right className="decor-score decor-score_mobile-bottom-right" />
      </div>
    </div>
  );

  function resolveQuestionsByCorrectity() {
    if (!questionsAmount || questionsAmount == 0) {
      localStorage.clear();
      history.push(RouteTypes.home);
    } else {
      if (questionsLayoutArr.length != questionsAmount) {
        for (let i = 0; i < questionsAmount ?? 0; i++) {
          const question = questionsWithAnswerArr[i];
          questionsLayoutArr.push(
            ResolvedQuestion({
              isCorrect: question?.isCorrect ?? false,
              text: question?.question ?? "",
              key: i,
            })
          );
        }
      }
    }

    if (orangeStarsArr.length != correctAnswersAmount) {
      for (let i = 0; i < correctAnswersAmount; i++) {
        orangeStarsArr.push(<StarOrange className="score__star" />);
      }
    }

    if (greyStarsArr.length != wrongAnswersAmount) {
      for (let i = 0; i < wrongAnswersAmount; i++) {
        greyStarsArr.push(<StarGrey className="score__star" />);
      }
    }
  }
  function onPlayAgainClick() {
    localStorage.clear();
    dispatch(resetAnswers());
    dispatch(resetQuestionsArr());
    dispatch(resetParams());
    const nextLavel = level + 1;
    dispatch(setLevel(nextLavel));
    setToLocaleStorage({ key: LocalStorageTypes.level, value: nextLavel });
    history.push(RouteTypes.home);
  }
}
export default Score;
