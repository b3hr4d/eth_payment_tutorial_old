use b3_utils::{vec_to_hex_string_with_0x, Subaccount};
use candid::Principal;

#[ic_cdk::query]
fn deposit_principal(principal: String) -> String {
    let principal = Principal::from_text(principal).unwrap();

    let subaccount = Subaccount::from_principal(principal);

    let bytes32 = subaccount.to_bytes32().unwrap();

    vec_to_hex_string_with_0x(bytes32)
}

ic_cdk::export_candid!();
