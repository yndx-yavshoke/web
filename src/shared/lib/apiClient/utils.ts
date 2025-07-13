export type InferTreatyResponse<T extends (...args: any) => any> = NonNullable<
  Awaited<ReturnType<T>>["data"]
>;
