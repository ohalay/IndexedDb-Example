export interface IEntity<T> {
    id?: string;
    expiryDate: Date;
    data: T;
}
