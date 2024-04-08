export type Tag = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  posts: Post[];
};

export type Project = {
  id: string;
  title: string;
  desc: string;
  content?: string;
  createdAt: Date;
  updatedAt: Date;
  icon: string;
  link: string;
};

export type Post = {
  id: string;
  cover?: string;
  title: string;
  desc: string;
  content?: string;
  textCount: number;
  createdAt: Date;
  updatedAt: Date;
  Tag: Tag[];
};

export type User = {
  id: string;
  name?: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
  weibo: string;
  twitter: string;
  bilibli: string;
  wechat: string;
  redbook: string;
  password: string;
};

export type DashBoardData = {
  postCount: number;
  projectCount: number;
  textCount: number;
};
