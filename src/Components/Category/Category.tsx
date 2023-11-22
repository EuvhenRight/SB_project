import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import React, { useEffect } from 'react';

const Category = () => {
  const [data, setData] = React.useState(null);
  console.log(data);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = 'token'; // Replace with your actual API key name
        const apiKeyValue = 'pj11daaQRz7zUIH56B9Z'; // Replace with your actual API key value
        const apiUrl = 'https://frontend-case-api.sbdev.nl/api/categories';
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
    <Tabs isFitted variant="enclosed">
      <TabList mb="1em">
        <Tab>One</Tab>
        <Tab>Two</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>one!</p>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Category;
