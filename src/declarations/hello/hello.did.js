export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'deposit_principal' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
