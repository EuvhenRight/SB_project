import { Select } from '@chakra-ui/react';
import React, { memo } from 'react';

type FilterProps = {
  onChangeDirection: (idx: string) => void;
};

type FilterPage = {
  name: string;
};

const FilterPopUp: React.FC<FilterProps> = memo(({ onChangeDirection }) => {
  const data: FilterPage[] = [{ name: 'asc' }, { name: 'desc' }];

  return (
    <Select
      placeholder="Per Page"
      onChange={(e) => onChangeDirection(e.target.value)}
    >
      {data?.map((page) => (
        <option key={page.name} value={page.name}>
          {page.name}
        </option>
      ))}
    </Select>
  );
});

export default FilterPopUp;
