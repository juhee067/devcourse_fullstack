export interface ITask {
  taskId: string;
  taskName: string;
  taskDescription: string;
  taskOwner: string;
}

export interface ILogItem {
  logId: string;
  logAuthor: string;
  logMessage: string;
  logTimestamp: string;
}
export interface IBoardItem {
  boardId: string;
  boardName: string;
  lists: Ilist[];
}

export interface Ilist {
  listId: string;
  listName: string;
  tasks: ITask[];
}
