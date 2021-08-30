import "./index.scss";
import { ReactComponent as StartLogo } from "static/StartLogo.svg";
import { ReactComponent as Difficulty } from "static/Difficulty.svg";
import { ReactComponent as Amount } from "static/Amount.svg";
import { ReactComponent as PC_top_left } from "static/decor/startScreen/PC_top_left.svg";
import { ReactComponent as PC_bottom_left } from "static/decor/startScreen/PC_bottom_left.svg";

import { ReactComponent as PC_top_right } from "static/decor/startScreen/PC_top_right.svg";
import { ReactComponent as PC_bottom_right } from "static/decor/startScreen/PC_bottom_right.svg";

import Button from "components/button";
import { ButtonDesignTypes } from "components/button/ButtonDesignTypes";
import { DifficultyTypes } from "./DifficultyTypes";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { setDifficulty, setQuestionsAmount } from "app/slices/Params";
import { LocalStorageTypes } from "app/LocalStorageTypes";
import { setToLocaleStorage } from "util/functions/setToLocaleStorage";
import {
  resetQuestionsArr,
  setCurrentQuestionNumber,
} from "app/slices/Questions";
import { useState } from "react";
import { useHistory } from "react-router";
import { RouteTypes } from "app/RouteTypes";
import { resetAnswers } from "app/slices/Answers";
function Start(): JSX.Element {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const difficulty = useAppSelector((state) => state.params.difficulty);
  if (!difficulty) dispatch(setDifficulty(DifficultyTypes.easy));

  const questionsAmount = useAppSelector(
    (state) => state.params.questionsAmount
  );
  const [isSelectOpen, setIsSelectOpen] = useState(true);

  return (
    <div className="start">
      <header className="logo">
        <h1 className="logo__text">Welcome to the</h1>
        <StartLogo className="logo__img" />
      </header>
      <div className="start__menu">
        <div className="param">
          <label className="label">
            <Difficulty className="label__img" />
            <p className="label__text">Difficulty </p>
          </label>

          <div className="custom-input" onClick={toggleSelect}>
            <p className="custom-input__option">
              <span className="custom-input__option-text">{difficulty}</span>
            </p>

            <div
              className="custom-input__options-wrapper"
              style={{
                display: isSelectOpen ? "none" : "flex",
              }}
            >
              <p
                onClick={() => onSelectChoose(DifficultyTypes.easy)}
                className="custom-input__option custom-input__option_first"
              >
                <span className="custom-input__option-text">
                  {DifficultyTypes.easy}
                </span>
              </p>
              <p
                onClick={() => onSelectChoose(DifficultyTypes.hard)}
                className="custom-input__option"
              >
                <span className="custom-input__option-text">
                  {DifficultyTypes.hard}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="param">
          <label htmlFor="amount" className="label label_bottom">
            <Amount className="label__img" />
            <p className="label__text">Amount</p>
          </label>
          <input
            type="number"
            id="amount"
            className="start__input param__number"
            onChange={(e) => {
              let number = Number(e.target.value);
              dispatch(setQuestionsAmount(number < 51 ? number : 50));
            }}
          />
        </div>

        <div className="param start__button-wrapper">
          <Button
            text="Start"
            colorType={ButtonDesignTypes.orange}
            onClick={onStartClick}
          />
        </div>
      </div>
      <div className="decor">
        <PC_top_left className="decor-start decor-start_pc-top-left" />
        <PC_bottom_left className="decor-start decor-start_pc-bottom-left" />
        <PC_top_right className="decor-start decor-start_pc-top-right" />
        <PC_bottom_right className="decor-start decor-start_pc-bottom-right" />
      </div>
    </div>
  );

  function toggleSelect(): void {
    setIsSelectOpen(!isSelectOpen);
  }

  function onSelectChoose(value: DifficultyTypes): void {
    dispatch(setDifficulty(value));
    setIsSelectOpen(!isSelectOpen);
  }

  function onStartClick(): void {
    localStorage.clear();
    dispatch(resetQuestionsArr());
    setToLocaleStorage({
      key: LocalStorageTypes.difficulty,
      value: difficulty,
    });
    setToLocaleStorage({
      key: LocalStorageTypes.questionsAmount,
      value: questionsAmount,
    });
    dispatch(setCurrentQuestionNumber(0));
    dispatch(resetAnswers());
    history.push(RouteTypes.process);
  }
}

export default Start;
