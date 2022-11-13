type IndexType = string | number | symbol

export type PlainObject<K extends IndexType = string, V = unknown> = Record<K, V>
