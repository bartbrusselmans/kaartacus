/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_CF_SPACE_ID: string;
  readonly PUBLIC_CF_ENVIRONMENT: string;
  readonly PUBLIC_CF_ACCESS_TOKEN: string;
  readonly PUBLIC_CF_PREVIEW_TOKEN: string;

  readonly PUBLIC_BGG_USERS: string;
  readonly PUBLIC_BGG_HOST: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
