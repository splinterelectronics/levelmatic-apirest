import { Document, Types } from 'mongoose';
import { FastifyRequest } from 'fastify';
import { IESP } from './espInterfaces';

export type ID = Types.ObjectId | string;

export interface IMeasure {
  idESP: ID | IESP;
  liquidLevel: number;
  batteryLevel: number;
  dateMeasure: Date;
}

export type MeasureReadRequest = FastifyRequest<{
  Querystring: { idESP: string };
}>;

export interface IMeasureDoc extends Document, IMeasure {}
