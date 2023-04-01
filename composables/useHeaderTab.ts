import { useRequest } from '@/utils/useRequest';

export interface HeaderTab {
  tabName: string;
  superscript: string;
  jumpURL: string;
}

export interface GetHeaderTabRes {
  rows: Array<HeaderTab>;
  total: number;
}

export const useHeaderTab = () =>
  useRequest<GetHeaderTabRes>({
    url: '/headertab/List',
  });
