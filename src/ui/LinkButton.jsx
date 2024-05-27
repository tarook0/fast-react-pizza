import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

function LinkButton({ children, to }) {
  const navigate = useNavigate();
  const classname="text-blue-500 hover:text-blue-800 hover:underline";
  if (to === '-1') {
    return <button className={classname} onClick={() => navigate(-1)}>{children}</button>;
  }
  return (
    <Link to={to} className={classname}>
      {children}
    </Link>
  );
}

export default LinkButton;
