import React from 'react';
import { NavLink } from 'react-router-dom';

function Paginator(props) {
  const { curPage, totalUsers, pageSize } = props;
  const pagesCount = Math.ceil(totalUsers / pageSize);
  let pages = [];
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

  pages = pages.map((page) => (
    <NavLink
      key={page}
      to={`/users/${page}`}
      className="users__set-page"
      activeClassName="users__set-page_active"
      exact
    >
      {page}
    </NavLink>
  ));

  return <div id="users__select-pages">{pages}</div>;
}

export default Paginator;
