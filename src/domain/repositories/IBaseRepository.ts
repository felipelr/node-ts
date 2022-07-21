export interface IBaseRepository<T> {
    save(entity: T): Promise<T>
    delete(id: number): Promise<void>
    getById(id: number): Promise<T>
    getAll(): Promise<T[]>
}