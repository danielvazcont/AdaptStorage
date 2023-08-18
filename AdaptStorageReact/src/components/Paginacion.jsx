import React from 'react';
function Paginacion({
  postsPerPage,
  totalPosts,
  paginate,
  setCurrentPage,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <style>
        {
          "\
          a.flecha{\
            color:#2196f3;\
            background:white;\
            transition:0.4s;\
          }\
          a.flecha:active{\
            color:white;\
            background:#2196f3;\
            transition:0s;\
          }\
          a{\
            -webkit-user-select: none;\
            -moz-user-select: none;\
            -ms-user-select: none;\
          }\
          "
        }
      </style>
      <ul className="pagination">
        <li key='anterior' className="page-item" style={{ cursor: "pointer" }}>
          <a
            onClick={() => {
              if (currentPage !== 1) {
                setCurrentPage(currentPage - 1);
              }
            }}
            className="page-link flecha"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </a>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={currentPage === number ? "page-item active" : "page-item"}
            style={{ cursor: "pointer" }}
          >
            <a onClick={() => paginate(number)} className="page-link">
              {number}
            </a>
          </li>
        ))}
        <li key='siguiente' className="page-item" style={{ cursor: "pointer" }}>
          <a
            onClick={() => {
              if (currentPage !== Math.ceil(totalPosts / postsPerPage)) {
                setCurrentPage(currentPage + 1);
              }
            }}
            className="page-link flecha"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Paginacion;
