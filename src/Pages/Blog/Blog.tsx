import { Container, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import PostCard from '../../Components/Card/Card';
import Category from '../../Components/Category/Category';

type Category = {
  id: number;
  name: string;
};

interface Post {
  id: number;
  title: string;
  content: string;
  img_url: string;
  category: Category;
  category_id: number;
  category_name: string;
  created_at: string;
  updated_at: string;
}

const Blog: React.FC<Post> = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = 'token'; // Replace with your actual API key name
        const apiKeyValue = 'pj11daaQRz7zUIH56B9Z'; // Replace with your actual API key value
        const apiUrl =
          'https://frontend-case-api.sbdev.nl/api/posts?page=1&perPage=10&sortBy=title&sortDirection=asc&searchPhrase=test ber&categoryId=1'; // Replace with your API endpoint

        const response = await fetch(apiUrl, {
          headers: {
            [apiKey]: apiKeyValue,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container as="main" maxW="container.xl" mt="4em">
      <Category />
      <SimpleGrid columns={[1, 2, 4]} row={2} spacing={10}>
        <PostCard />
      </SimpleGrid>
    </Container>
  );
};

export default Blog;
