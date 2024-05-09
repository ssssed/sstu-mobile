export interface Clearable {
  clear(): void;
}

export type FetchStatus = 'ok' | 'error' | 'none';