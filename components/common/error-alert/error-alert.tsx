import classes from "./error-alert.module.css";

type ErrorAlertProps = {
  children: React.ReactNode;
};

export default function ErrorAlert({ children }: ErrorAlertProps) {
  return <div className={classes.alert}>{children}</div>;
}
