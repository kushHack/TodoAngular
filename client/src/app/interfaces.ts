export interface ITasks {
  task?: string;
  status?: boolean;
  _id?: string;
  updatedAt?: Date;
}

export interface INotification {
  notifType: string;
  notifMsg: string;
  notifIcon: string;
}
