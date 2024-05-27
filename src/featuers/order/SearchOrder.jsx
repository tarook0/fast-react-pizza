import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function SearchOrder() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  function handelSubmit(event) {
    event.preventDefault();
    if (!query) return;
    navigate(`order/${query}`);
    setQuery('');
  }
  return (
    <form onSubmit={handelSubmit}>
      <input
        placeholder="Search for an order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-28 rounded-full bg-red-100 px-4 py-2
           transition-all duration-300 placeholder:text-stone-400 
           focus:outline-none focus:ring focus:ring-red-500
           focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
      />
    </form>
  );
}

export default SearchOrder;
