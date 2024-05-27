import React from 'react';
import { Link } from 'react-router-dom';

function Button({ children, disabled, to, type, onClick }) {
  const base =
    ' inline-block rounded-full bg-red-600  font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 text-sm hover:bg-red-500 focus:bg-red-500focus:outline-none focus:ringfocus:ring-red-200 focus:ring-offset-2 disabled:cursor-not-allowed';
  const styles = {
    primary: base + ' px-4 py-3 md:px-6 md:py-4',
    small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
    round: base + 'px-2.5  py-1 md:px-3 md:py-2 text-sm',
    secondary:
      ' inline-block text-sm rounded-full border-2 border-stone-300 px-4 py-2.5 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-400 hover:text-stone-800  focus:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-400 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-6 sm:py-4 md:py-3.5 md:px-6 ',
  };
  if (to) {
    return (
      <Link to={to} className={styles[type]}>
        {' '}
        {children}
      </Link>
    );
  }
  if (onClick) {
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );
  }
  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
