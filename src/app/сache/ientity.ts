export interface IEntity<T> {
    id?: number;
    expiryDate: Date;
    data: T;
}
