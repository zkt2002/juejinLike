import { useRequest } from '@/utils/useRequest';

export interface HomeListParams {
  categoryId?: number;
  subcategoryId?: number;
  order: number;
  time_limit?: number;
  page_size: number;
  page_num: number;
}
export interface subcategoryItem {
  id: number;
  subcategoryName: string;
}
export interface configItem {
  id: number;
  categoryName: string;
  subcategoryList: Array<subcategoryItem>;
}
export interface HomeTabType {
  config: Array<configItem>;
}
export interface HomePostItem {
  id: number;
  title: string;
  content: string;
  coverImgURL: string;
  isArticle: boolean;
  createdAt: string;
  like: number;
  view: number;
  authorName: string;
  categoryName: string;
  subcategoryName: string;
  type?: string;
}
export interface HomeAuthorItem {
  authorName: string;
  description: string | null;
  level: number;
  avatarURL: string;
}

export interface HomeAuthorList {
  rows: Array<HomeAuthorItem>;
}
export const useAuthorList = () =>
  useRequest<HomeAuthorList>({
    url: '/author/List',
  });

export interface HomePostList {
  rows: Array<HomePostItem>;
}
export const useHomeTab = () =>
  useRequest<HomeTabType>({
    url: '/category/config',
  });

export const useHomeList = (params: HomeListParams) =>
  useRequest<HomePostList>({
    url: '/article/IndexList',
    params,
  });
