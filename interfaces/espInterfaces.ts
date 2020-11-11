import { Document } from 'mongoose';
import { ID, IMeasureDoc } from './measureInterfaces';
import { IUserDoc } from './userInterfaces';

export interface IESP {
  owner: ID | IUserDoc;
  lastMeasure: ID | IMeasureDoc;
  name: string;
  rx: Date;
}

export interface IESPDoc extends Document, IESP {}