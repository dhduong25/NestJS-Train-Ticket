export interface RepositoryInterface<T> {
    findAll(): Promise<T[]>;
}
