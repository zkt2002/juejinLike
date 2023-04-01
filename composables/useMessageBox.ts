import { useRequest } from '@/utils/useRequest';

export interface MessageInfo {
  id: number;
  authorName: string;
  categoryName: string;
  createdAt: string;
  title: string;
  content: string;
  view: number;
  like: number;
  coverImgURL: string;
  type?: string;
  isArticle: boolean;
  subcategoryName: string;
}

export const likeMessage = (data: Record<string, any>) =>
  useRequest<Record<string, any>>({
    url: '/article/Like',
    method: 'POST',
    body: data,
  });
