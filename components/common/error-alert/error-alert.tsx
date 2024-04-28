import classes from './error-alert.module.css';

type ErrorAlertProps = {
  children: React.ReactNode;
};

function ErrorAlert({ children }: ErrorAlertProps) {
  return <div className={classes.alert}>{children}</div>;
}

export default ErrorAlert;
