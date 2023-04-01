import { useRequest } from '@/utils/useRequest';

export interface ArticleViewData {
  authorInfo: AuthorInfo;
  categoryName: null | string;
  content: string;
  coverImgURL: string;
  createdAt: string;
  /**
   * true-文章 false-广告
   */
  isArticle: boolean;
  like: number;
  /**
   * isArticle为false时，返回null
   */
  relatedArticles: RelatedArticle[] | null;
  subcategoryName: null | string;
  title: string;
  view: number;
}

export interface AuthorInfo {
  authorName: string;
  avatarURL: string;
  description: string;
  level: number;
}

export interface RelatedArticle {
  id: number;
  like: number;
  title: string;
  view: number;
}

export const useArticleView = (articleId: number) =>
  useRequest<ArticleViewData>({ url: '/article/View', params: { id: articleId } });
