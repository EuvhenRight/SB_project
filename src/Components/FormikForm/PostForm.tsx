import {
  Field,
  Form,
  Formik,
  FieldProps,
  FormikHelpers,
  FormikProps,
} from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Select,
  useColorMode,
  HStack,
  Textarea,
  Flex,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Redux/store';
import { ChangeEvent, memo, useEffect, useRef, useState } from 'react';
import { MdOutlinePhotoCamera } from 'react-icons/md';
import { Category, FormValues } from '../../Redux/types';
import {
  fetchCategoryData,
  fetchNewPostData,
} from '../../Redux/Posts/PostSlice';

type PropsForm = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
};

const validate = (value: string, fieldName: string) => {
  let error: string | undefined;
  switch (fieldName) {
    case 'title':
      error = value.trim() ? undefined : 'Title is required';
      break;
    case 'category_id':
      error = value.trim() ? undefined : 'Category is required';
      break;
    case 'content':
      error = value.trim() ? undefined : 'Content is required';
      break;
    default:
      break;
  }
  return error;
};

const formFields = [
  { name: 'title', type: 'text', placeholder: 'Title' },
  { name: 'category_id', placeholder: 'Category' },
  { name: 'image', type: 'file', placeholder: 'Header image' },
  { name: 'content', type: 'text', placeholder: 'Content' },
];

const PostForm: React.FC<PropsForm> = memo(({ setIsOpen, isOpen }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { colorMode } = useColorMode();
  const data = useSelector((state: RootState) => state.posts.categories);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);

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

  const initialValues: FormValues = {
    title: '',
    content: '',
    category_id: '',
    image: null,
  };

  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      const postPayload: FormValues = {
        title: values.title,
        content: values.content,
        category_id: values.category_id,
        image: values.image,
      };
      dispatch(fetchNewPostData(postPayload));
      setIsOpen(true);
      console.log('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  const handleSelectImage = async (
    e: ChangeEvent<HTMLInputElement>,
    form: FormikProps<FormValues>
  ) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      try {
        form.setFieldValue('image', file);
        setImage(file)
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(props) => (
        <Form>
          {formFields.map((fieldConfig) => (
            <Field
              background={colorMode === 'dark' ? 'gray.800' : 'white'}
              key={fieldConfig.name}
              name={fieldConfig.name}
              validate={(value: string) => validate(value, fieldConfig.name)}
            >
              {({ field, form }: FieldProps<string>) => (
                <FormControl
                  mb={6}
                  isInvalid={
                    !!(form.touched[field.name] && form.errors[field.name])
                  }
                >
                  <FormLabel fontSize="sm" mt={6}>
                    {fieldConfig.placeholder}
                  </FormLabel>
                  {fieldConfig.name === 'title' ? (
                    <Input
                      background={colorMode === 'dark' ? 'gray.800' : 'white'}
                      {...field}
                      placeholder={fieldConfig.placeholder}
                    />
                  ) : fieldConfig.name === 'category_id' ? (
                    <Select
                      background={colorMode === 'dark' ? 'gray.800' : 'white'}
                      placeholder="Category"
                      onChange={(e) => {
                        form.setFieldValue('category_id', e.target.value);
                      }}
                      value={field.value}
                    >
                      {data?.map((category: Category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </Select>
                  ) : fieldConfig.name === 'image' ? (
                    <HStack ml={6}>
                      <MdOutlinePhotoCamera
                        size="40px"
                        color={colorMode === 'dark' ? 'white' : 'black'}
                      />
                      <Button
                        onClick={() => inputFileRef.current?.click()}
                        variant="custom"
                        colorScheme="orange"
                        size="sm"
                        ml={6}
                      >
                        {image ? image.name : "Add Image" }
                      </Button>
                      <input
                        ref={inputFileRef}
                        type="file"
                        onChange={(e) => handleSelectImage(e, form)}
                        hidden
                      />
                    </HStack>
                  ) : fieldConfig.name === 'content' ? (
                    <Textarea
                      {...field}
                      background={colorMode === 'dark' ? 'gray.800' : 'white'}
                      placeholder={fieldConfig.placeholder}
                      resize="none"
                      height="215px"
                    />
                  ) : (
                    <Input {...field} placeholder={fieldConfig.placeholder} />
                  )}
                  <FormErrorMessage>
                    {String(form.errors[fieldConfig.name])}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
          ))}
          <Flex justifyContent="center">
            <Button
              mt={6}
              colorScheme="orange"
              variant="custom"
              borderRadius="3xl"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Create messages
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
});

export default PostForm;
