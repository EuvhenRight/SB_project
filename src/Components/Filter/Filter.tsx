import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement, Select } from '@chakra-ui/react';
import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchCategoryData } from '../../Redux/Posts/PostSlice';
import { RootState, useAppDispatch } from '../../Redux/store';
import { Category } from '../../Redux/types';

type OptionType = {
  id: number | string;
  name: string;
};

type FilterProps = {
  onChangeDirection: (idx: string) => void;
  onChangePerPage: (perPage: number) => void;
  onChangeCategory: (idx: number) => void;
};

const FilterPopUp: React.FC<FilterProps> = memo(
  ({ onChangeDirection, onChangePerPage, onChangeCategory }) => {
    const perPageOptions: OptionType[] = [
      { id: 4, name: '4' },
      { id: 8, name: '8' },
      { id: 12, name: '12' },
    ];

    const directionOptions: OptionType[] = [
      { id: 'asc', name: 'Asc' },
      { id: 'desc', name: 'Desc' },
    ];

    const categories = useSelector(
      (state: RootState) => state.posts.categories
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
      const fetchData = async () => {
        try {
          await dispatch(fetchCategoryData());
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, [dispatch]);

    return (
      <>
        <Select
          size="xs"
          placeholder="Per Page"
          onChange={(e) => onChangePerPage(Number(e.target.value))}
          mr={2}
        >
          {perPageOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </Select>
        <Select
          mr={2}
          size="xs"
          placeholder="Direction"
          onChange={(e) => onChangeDirection(e.target.value)}
        >
          {directionOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </Select>
        <Select  
          mr={2}
          size="xs"
          placeholder="Category"
          onChange={(e) => onChangeCategory(Number(e.target.value))}
        >
          {categories?.map((category: Category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
        <InputGroup size="xs" onChange={(e: React.ChangeEvent<HTMLInputElement>) => console.log(e.target.value)}>
          <InputLeftElement pointerEvents='none'>
          <SearchIcon color='gray.300' />
          </InputLeftElement>
        <Input type='text' placeholder='Search' />
        </InputGroup>
      </>
    );
  }
);

export default FilterPopUp;
