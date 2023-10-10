import { observer } from "mobx-react-lite";
import { ButtonMainStyles } from "../../../features/trainings/details";

interface ButtonProps {
  isCancelled?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick: () => Promise<void>;
  titleStart: string | null;
  titleEnd: string | null;
}

const ButtonWithLoader = ({
  isCancelled,
  disabled,
  onClick,
  children,
  titleStart,
  titleEnd,
}: ButtonProps) => {
  const buttonStyle = {
    ...ButtonMainStyles,
    backgroundColor: isCancelled ? "green" : "red",
  };

  const textFilterStyle = disabled ? "blur(20px)" : "none";

  const handleClick = async () => {
    try {
      await onClick();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <button style={buttonStyle} disabled={disabled} onClick={handleClick}>
      <span style={{ filter: textFilterStyle }}>
        {isCancelled && !disabled ? titleStart : titleEnd}
      </span>
      {children}
    </button>
  );
};

export default observer(ButtonWithLoader);
