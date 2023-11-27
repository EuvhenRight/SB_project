import { Select } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryData } from '../../Redux/Posts/PostSlice';
import { RootState, useAppDispatch } from '../../Redux/store';
import { Category } from '../../Redux/types';

type CategoriesProps = {
  onChangeCategory: (idx: number) => void;
};

const CategoryPopUp: React.FC<CategoriesProps> = ({ onChangeCategory }) => {
  const data = useSelector((state: RootState) => state.posts.categories);
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
    <Select
      placeholder="Category"
      onChange={(e) => onChangeCategory(Number(e.target.value))}
    >
      {data?.map((category: Category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </Select>
  );
};

export default CategoryPopUp;
