/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type Customer = Customer1 & Customer2;
export type Customer1 = CustomerBase;

export interface CustomerBase {
    email: string;
    password: string;
}
export interface Customer2 {
    _id: string;
}
