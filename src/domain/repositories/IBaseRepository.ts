export interface IBaseRepository<T> {
    insert(entity: T): Promise<T>
    update(entity: T): Promise<T>
    delete(id: number): Promise<void>
    getById(id: number): Promise<T>
    getAll(): Promise<T[]>
}