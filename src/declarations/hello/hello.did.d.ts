import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type Result = { 'Ok' : Uint8Array | number[] } |
  { 'Err' : string };
export interface _SERVICE {
  'balance' : ActorMethod<[], bigint>,
  'deposit_principal' : ActorMethod<[], string>,
  'eth_get_transaction_by_hash' : ActorMethod<[string], Result>,
  'expected_input' : ActorMethod<[], string>,
  'verify_transaction' : ActorMethod<[string], [bigint, string]>,
}
