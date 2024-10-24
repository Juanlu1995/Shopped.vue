/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_PATH: string;
  readonly VITE_API_BASE: string;
  readonly VITE_MSW: string;
  readonly DEVTOOLS_LAUNCH_EDITOR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
