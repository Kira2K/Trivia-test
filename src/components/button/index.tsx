import { ButtonProps } from "./ButtonProps";
import "./index.scss";
function Button({ text, colorType, onClick }: ButtonProps): JSX.Element {
  return (
    <button onClick={() => onClick()} className={`button button_${colorType}`}>
      <p className="button__text">{text}</p>
    </button>
  );
}
export default Button;
