export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'Ok' : IDL.Vec(IDL.Nat8), 'Err' : IDL.Text });
  return IDL.Service({
    'balance' : IDL.Func([], [IDL.Nat], []),
    'deposit_principal' : IDL.Func([], [IDL.Text], ['query']),
    'eth_get_transaction_by_hash' : IDL.Func([IDL.Text], [Result], []),
    'expected_input' : IDL.Func([], [IDL.Text], ['query']),
    'verify_transaction' : IDL.Func([IDL.Text], [IDL.Nat, IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
