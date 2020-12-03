import { Document, Types } from 'mongoose';
import { IESPDoc } from './espInterfaces';

export type ID = Types.ObjectId | string;

export interface ILevelmatic {
  devicesESP?: ID[] | IESPDoc[];
  wifiSSID: string;
  wifiPassword: string;
  ipNet: string;
}

export interface ILevelmaticCred {
  wifiPassword: string;
  wifiSSID: string;
  ipNet: string;
}

export interface ILevelmaticDoc extends Document, ILevelmatic {}
