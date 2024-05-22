import { MouseEventHandler, type ReactNode } from "react";
import styles from "./Btn.module.css";

type BtnProps = {
  children: ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
  action?: MouseEventHandler<HTMLButtonElement>;
  style?: string;
  primary?: boolean;
  secondary?: boolean;
};

export default function Btn({
  children,
  type,
  action,
  style,
  primary,
  secondary,
}: BtnProps) {
  return (
    <button
      className={`btn ${primary && "btn-primary"} ${
        secondary && "btn-secondary"
      } ${styles.style} ${style}`}
      type={type}
      onClick={action}
    >
      {children}
    </button>
  );
}
