import React, { memo, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { PaginationInfo } from '../../Redux/types';

import styles from './Pagination.module.css';

interface PaginationProps {
  perPage: number;
  pageNumber: number;
  paginationInfo: PaginationInfo;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = memo(
  ({ onPageChange, paginationInfo }) => {
    const { total, current_page } = paginationInfo;

    return (
      <div id="container">
        <ReactPaginate
          className={styles.root}
          breakLabel="..."
          nextLabel=">"
          previousLabel="<"
          onPageChange={(event) => onPageChange(event.selected + 2)}
          pageCount={total}
          forcePage={current_page - 2}
          marginPagesDisplayed={1}
          pageRangeDisplayed={1}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </div>
    );
  }
);

export default Pagination;
