export type FilteredKeys<T extends Object, E> = {
  [K in keyof T]: T[K] extends E ? K : never
}[keyof T]

export type RemoveLast<T extends any[]> = Required<T> extends [ ...infer Head, any ] ? Head : any[];