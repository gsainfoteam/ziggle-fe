interface ImportMetaEnv {
  readonly VITE_DOMAIN: string;
  readonly VITE_IDP_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
