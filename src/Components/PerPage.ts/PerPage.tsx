import { Select } from '@chakra-ui/react';
import React, { memo } from 'react';

type PerPageProps = {
  onChangePerPage: (perPage: number) => void;
};

type PerPage = {
  id: number;
  name: string;
};

const PerPagePopUp: React.FC<PerPageProps> = memo(({ onChangePerPage }) => {
  const data: PerPage[] = [
    { id: 4, name: '4' },
    { id: 8, name: '8' },
    { id: 12, name: '12' },
  ];

  return (
    <Select
      placeholder="Per Page"
      onChange={(e) => onChangePerPage(Number(e.target.value))}
    >
      {data?.map((page) => (
        <option key={page.id} value={page.id}>
          {page.name}
        </option>
      ))}
    </Select>
  );
});

export default PerPagePopUp;
