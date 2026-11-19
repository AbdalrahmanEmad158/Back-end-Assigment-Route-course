export interface ICacheProvider {
  get(key: string): Promise<string | null>;
  
  set(key: string, value: string, ttl: number): Promise<string>;
  
  del(key: string): Promise<number>;
  
  ttl(key: string): Promise<number>;
}