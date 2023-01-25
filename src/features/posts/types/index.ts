export type PostPayloads = {
  userId: number;
  mediaId: number;
  categoryIds: number[];
  postTitle: string;
  postSlug: string;
  postExcerpt: string;
  postContent: string;
  postPublished: boolean;
};

export type PostQueryParams<T> = {
  user?: boolean;
  media?: boolean;
  categories?: boolean;
  post_id?: T;
};
