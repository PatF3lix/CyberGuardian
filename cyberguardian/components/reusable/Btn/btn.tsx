import { MouseEventHandler, type ReactNode } from "react";
import styles from "./Btn.module.css";

type BtnProps = {
  children: ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
  action?: MouseEventHandler<HTMLButtonElement>;
  style?: string;
  primary?: boolean;
  secondary?: boolean;
  disabled?: boolean;
};

export default function Btn({
  children,
  type,
  action,
  style,
  primary,
  secondary,
  disabled,
}: BtnProps) {
  return (
    <button
      className={`${primary && styles.btnPrimary} ${
        secondary && styles.btnSecondary
      }  ${style && styles[style]}`}
      type={type}
      onClick={action}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
