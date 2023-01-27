export type MediaPayloads = {
  originalName: string | undefined;
  mediaName: string | undefined;
  mediaPath: string | undefined;
  mediaMimeType: string | undefined;
  mediaUrl: string;
  mediaSize: string;
  uploadedAt?: Date;
};

export type MediaQueryParams = {
  media_id?: number | unknown;
};
