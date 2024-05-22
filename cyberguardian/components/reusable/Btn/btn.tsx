import { MouseEventHandler, type ReactNode } from "react";
import styles from "./Btn.module.css";

type BtnProps = {
  children: ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
  action?: MouseEventHandler<HTMLButtonElement>;
  style?: string;
};

export default function Btn({ children, type, action, style }: BtnProps) {
  return (
    <button className={`btn styles.${style}`} type={type} onClick={action}>
      {children}
    </button>
  );
}
