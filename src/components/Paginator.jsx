import React from 'react';
import { NavLink } from 'react-router-dom';

function Paginator({ curPage, totalUsers, pageSize }) {
  const pagesCount = Math.ceil(totalUsers / pageSize);
  const pages = [];
  if (curPage < 4) {
    for (let i = 1; i <= 5; i++) {
      pages.push(i);
    }
  } else {
    for (
      let i = Math.min(curPage - 2, pagesCount - 4);
      i <= Math.min(curPage + 2, pagesCount);
      i++
    ) {
      pages.push(i);
    }
  }

  return (
    <div id="users__select-pages">
      {pages.map((page) => (
        <NavLink
          key={page}
          to={`/users/${page}`}
          className="users__set-page"
          activeClassName="users__set-page_active"
          exact
        >
          {page}
        </NavLink>
      ))}
    </div>
  );
}

export default Paginator;
