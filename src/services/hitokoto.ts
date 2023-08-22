import { request } from '.';

interface Hitokoto {
  id: number;
  uuid: string;
  hitokoto: string;
  type: string;
  from: string;
  from_who: string;
  creator: string;
  creator_uid: number;
  reviewer: number;
  commit_from: string;
  created_at: string;
  length: number;
}
export const fetchHitokoto = () =>
  request<Hitokoto>('https://v1.hitokoto.cn', {
    method: 'GET',
  });
