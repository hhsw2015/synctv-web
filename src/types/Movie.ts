export interface MovieInfo {
  id: string;
  base: BaseMovieInfo;
  createdAt: number;
  creator: string;
}

export interface BaseMovieInfo {
  url: string;
  name: string;
  live: boolean;
  proxy: boolean;
  rtmpSource: boolean;
  type: string;
  headers: {
    [key: string]: string;
  };
  vendorInfo?: VendorInfo;
  subtitles?: Record<
    string,
    {
      [prop: string]: string;
    }
  >;
}

export interface VendorInfo {
  vendor: string;
  shared: boolean;
  bilibili?: BilibiliVendorInfo;
  backend?: string;
}

export interface BilibiliVendorInfo {
  bvid?: string;
  cid?: number;
  epid?: number;
  quality?: number;
}

export interface EditMovieInfo extends BaseMovieInfo {
  id: string;
}

export interface BilibiliVideoInfos {
  bvid?: string;
  cid?: number;
  epid?: number;
  name: string;
  coverImage: string;
}
