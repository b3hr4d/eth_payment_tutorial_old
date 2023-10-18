use b3_utils::{
    call::InterCall,
    hex_string_with_0x_to_u64,
    ledger::{raw_keccak256, ICRCAccount},
    outcall::HttpOutcall,
    outcall::HttpOutcallResponse,
    vec_to_hex_string_with_0x, Subaccount,
};
use candid::Nat;
use serde_json::json;
mod transaction;

const RPC_URL: &str = "https://eth-sepolia.g.alchemy.com/v2/ZpSPh3E7KZQg4mb3tN8WFXxG4Auntbxp";
const LEDGER: &str = "apia6-jaaaa-aaaar-qabma-cai";

#[ic_cdk::update]
async fn balance() -> Nat {
    let account = ICRCAccount::new(ic_cdk::id(), None);

    InterCall::from(LEDGER)
        .call("icrc1_balance_of", account)
        .await
        .unwrap()
}

#[ic_cdk::update]
async fn eth_get_transaction_by_hash(hash: String) -> Result<Vec<u8>, String> {
    if hash.len() != 66 && !hash.starts_with("0x") {
        return Err(format!("Invalid hash: {}", hash));
    }

    let rpc = json!({
        "jsonrpc": "2.0",
        "id": 0,
        "method": "eth_getTransactionByHash",
        "params": [hash]
    });

    let request = HttpOutcall::new(RPC_URL)
        .post(&rpc.to_string(), Some(1024))
        .send_with_closure(|response: HttpOutcallResponse| HttpOutcallResponse {
            status: response.status,
            body: response.body,
            ..Default::default()
        });

    match request.await {
        Ok(response) => {
            if response.status != 200 {
                return Err(format!("Error: {}", response.status));
            }

            Ok(response.body)
        }
        Err(m) => Err(format!("Error: {}", m)),
    }
}

#[ic_cdk::update]
async fn verify_transaction(hash: String) -> (Nat, String) {
    let tx = eth_get_transaction_by_hash(hash).await.unwrap();

    let transaction = serde_json::from_slice::<transaction::Root>(&tx).unwrap();

    // If necessary, decode and verify the argument passed to the function
    let expected_argument_hex = expected_input();

    if transaction.result.input != expected_argument_hex {
        panic!(
            "Invalid argument: expected {}, got {}",
            expected_argument_hex, transaction.result.input
        )
    }

    let amount: Nat = match hex_string_with_0x_to_u64(transaction.result.value) {
        Ok(amount) => amount.into(),
        Err(m) => panic!("{}", m.to_string()),
    };

    let recipient = transaction.result.to;

    (amount, recipient)
}

#[ic_cdk::query]
fn deposit_principal() -> String {
    let subaccount = Subaccount::from_principal(ic_cdk::id());

    let bytes32 = subaccount.to_bytes32().unwrap();

    vec_to_hex_string_with_0x(bytes32)
}

#[ic_cdk::query]
fn expected_input() -> String {
    let keccak = raw_keccak256(b"deposit(bytes32)").to_vec();

    let mut input = vec![];
    input.extend(keccak[0..4].to_vec());

    let principal = Subaccount::from(ic_cdk::id()).to_vec();

    input.extend(principal);

    vec_to_hex_string_with_0x(input)
}

ic_cdk::export_candid!();
