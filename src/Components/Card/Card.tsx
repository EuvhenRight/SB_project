import {
  Box,
  Heading,
  Text,
  Stack,
  Image,
  HStack,
  Card,
  CardBody,
  CardFooter,
  useMultiStyleConfig,
  Flex,
} from '@chakra-ui/react';
import { connected } from 'process';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPostData, fetchUploadImage } from '../../Redux/Posts/PostSlice';
import { AppDispatch } from '../../Redux/store';
import { Post } from '../../Redux/types';
import { format, parseISO } from 'date-fns';

interface Props {
  post: Post;
}

const PostCard: React.FC<Props> = (props) => {
  const { post } = props;
  const styles = useMultiStyleConfig('Card', { size: 'md', variant: 'custom' });

  const timestamp = parseISO(post.created_at);
  const formattedDate = format(timestamp, 'dd-MM-yyyy');

  // const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   const current_image = post.img_url;

  //   const fetchData = async () => {
  //     try {
  //       const imageUrl = await dispatch(fetchUploadImage(current_image));
  //       console.log(imageUrl);
  //     } catch (error) {
  //       console.error('Error fetching image:', error);
  //     }
  //   };

  //   fetchData();
  // }, [dispatch, post.img_url]);

  return (
    <Card sx={styles.container}>
      <CardFooter
        sx={styles.footer}
        bgImage={`${process.env.PUBLIC_URL}/avatarLogo.png`}
        bgPosition="center"
        bgRepeat="no-repeat"
      >
        <Flex w="100%" justifyContent={'space-between'} alignItems={'flex-end'}>
          <Text color={'white'} fontStyle="italic" fontSize={'xs'}>
            {formattedDate}
          </Text>
          <Text color={'white'} fontStyle="italic" fontSize={'xs'}>
            {post.category.name}
          </Text>
        </Flex>
      </CardFooter>
      <CardBody sx={styles.body} textOverflow="ellipsis">
        <Stack spacing="1">
          <Heading
            fontSize={'24px'}
            fontWeight="bold"
            letterSpacing="0"
            lineHeight={'29px'}
          >
            {post.title}
          </Heading>
          <Text fontSize={'12px'} letterSpacing="0" lineHeight={'19px'}>
            {post.content}
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default PostCard;
