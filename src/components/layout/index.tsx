import { LayoutProps } from "./LayoutProps";
import { ReactComponent as CloseIcon } from "static/CloseIcon.svg";
import "./index.scss";
import { useHistory } from "react-router";
import { RouteTypes } from "app/RouteTypes";
import { LayoutThemes } from "./LayoutTheme";
function Layout({ bg_color, closeButton, Content }: LayoutProps): JSX.Element {
  setRootBc();
  const history = useHistory();
  const showCloseButton = closeButton.show ? "block" : "none";
  const closeButtonColor =
    closeButton.background == "light"
      ? "rgba(255, 255, 255, 1)"
      : "rgba(66, 74, 158, 1)";
  return (
    <div className={`screen screen_${bg_color}`}>
      <div onClick={goToStart} className="screen__close-button-container">
        <CloseIcon
          className="screen__close-button-icon"
          style={{
            display: showCloseButton,
            fill: closeButtonColor,
          }}
        />
      </div>
      <div className="screen__center-container">{Content}</div>
    </div>
  );
  function goToStart(): void {
    localStorage.clear();
    history.push(RouteTypes.home);
  }

  function setRootBc(): void {
    const root = document.getElementById("root");
    if (!root) return;

    const darkBg = "rgba(71, 81, 192, 1)";
    const lightBg = "#e5e5e5";
    const rootBg = root.style.backgroundColor;

    if (bg_color == LayoutThemes.dark && rootBg != darkBg)
      root.style.backgroundColor = darkBg;
    else if (bg_color == LayoutThemes.light && rootBg != lightBg)
      root.style.backgroundColor = lightBg;
  }
}
export default Layout;
