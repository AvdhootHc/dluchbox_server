import { Request, Response } from 'express';

export interface TPropertyRequest extends Request {
  queryParams?: {
    top?: number;
    skip?: number;
    page?: number;
    filter?: string;
    orderby?: string;
    between?: object;
    city: string;
    address?: string;
    homeType?: string[];
    minSqFeet?: number;
    maxSqFeet?: number;
    days_on_propertybulls?: string;
    parkingSlot?: boolean;
    minYear?: number;
    maxYear?: number;
  };
}

export interface TPropertyResponse extends Response {}
