import Link from 'next/link';
import classes from './button.module.css';

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
};

export default function Button({ href, children, onClick }: ButtonProps) {
  if (href) {
    return (
      <Link href={href} className={classes.btn}>
        {children}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={classes.btn}>
      {children}
    </button>
  );
}
