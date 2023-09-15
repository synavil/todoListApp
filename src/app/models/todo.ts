export interface Todo {
  id: number | null;
  title: string;
  isClosed: boolean;
  details: string;
  creationDate: Date;
  closingDate?: Date;
}
