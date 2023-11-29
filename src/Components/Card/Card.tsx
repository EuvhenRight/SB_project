import {
  Heading,
  Text,
  Stack,
  Card,
  CardBody,
  CardFooter,
  useMultiStyleConfig,
  Flex,
} from '@chakra-ui/react';
import { Post } from '../../Redux/types';
import { format, parseISO, differenceInHours } from 'date-fns';
import { memo } from 'react';

interface Props {
  post: Post;
}

const PostCard: React.FC<Props> = memo((props) => {
  const { post } = props;
  const styles = useMultiStyleConfig('Card', { size: 'md', variant: 'custom' });

  const timestamp = parseISO(post.created_at);
  const formattedDate = format(timestamp, 'dd-MM-yyyy');
  const isNew = differenceInHours(new Date(), timestamp) < 12;

  return (
    <Card sx={styles.container}>
      <CardFooter
        sx={styles.footer}
        bgImage={`${process.env.PUBLIC_URL}/backgroundPost.png`}
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
          <Text color={'red'} fontStyle="italic" fontSize={'xs'}>
            {isNew ? 'New' : null}
          </Text>
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
});

export default PostCard;
