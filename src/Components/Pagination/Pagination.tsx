import { Paginate } from 'react-paginate-chakra-ui';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { PaginationInfo } from '../../Redux/types';

interface PaginationProps {
  pageNumber: number;
  paginationInfo: PaginationInfo;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pageNumber,
  paginationInfo,
  onPageChange,
}) => {
  const { total } = paginationInfo;
  const [page, setPage] = useState(1);
  const adjustedCurrentPage = pageNumber - 1;

  const togglePage = (page: number) => {
    setPage(page);
    onPageChange(page + 1); // Pass the new page number to the callback
  };

  return (
    <Paginate
      page={adjustedCurrentPage}
      margin={1}
      shadow="sm"
      fontWeight="bold"
      variant="outline"
      selectedVariant="solid"
      count={total}
      pageSize={4}
      previousIcon={<ChevronLeftIcon />}
      nextIcon={<ChevronRightIcon />}
      onPageChange={togglePage}
    />
  );
};

export default Pagination;
