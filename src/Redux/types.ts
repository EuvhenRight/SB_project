export interface FormValues {
  title: string;
  content: string;
  category_id: string;
  image: File | null;
}

export interface Category {
  id: number;
  name: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface filterValues {
  perPage: number;
  sortBy: string;
  categoryId: number;
  sortDirection: string;
  page: number;
  searchPhrase: string;
}

export interface filterPostValues {
  perPage: number;
  page: number;
}

export interface Post {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  content: string;
  category_id: number;
  img_url: string;
  category: Category;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginationInfo {
  current_page: number;
  data: Post[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: string;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface PostsState {
  data: PaginationInfo | null;
  categories: Category[] | null;
  newPost: Post | null;
  image: Post | null;
  status: 'isLoading' | 'isSuccess' | 'isError';
}
