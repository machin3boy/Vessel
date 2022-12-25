from web3 import Web3
import json
import sys
import time

RPC = "https://data-seed-prebsc-1-s1.binance.org:8545"
web3 = Web3(Web3.HTTPProvider(RPC))

PBK = "0x50e736fb238E89A4924413577C80586b6EF23C24"
PVK = "41824ab3bad9b46ef6d93ec83c121132694ea188a945b0589dc2364b92d65377"

contract_address = "0x00f2967e9bC4Def83cD87407678D0C6035c19813"
router_address = "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3"

ABI = open("./ABI9.2.json", "r")
ABI = json.load(ABI)
router_ABI = open("./router_ABI.json", "r")
router_ABI = json.load(router_ABI)

contract = web3.eth.contract(address=contract_address, abi=ABI)
router   = web3.eth.contract(address=router_address, abi=router_ABI)
account  = web3.eth.account.privateKeyToAccount(PVK)

native_address = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd"
stable_address = "0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7"

burn_address   = "0x000000000000000000000000000000000000dEaD"
vault_address  = "0x0000000000000000000000000000000000000001"
bounty_address = "0x0000000000000000000000000000000000000002"

elmore_address = "0xc6165A271f5cB5960c4554a8b44fCf3C75fa7F6C"
grady_address  = "0x6E4f1A17378d9d456063d346C81dF234c0364865"
phil_address   = "0xE7E34262dF71F975fA41295a179De9A218B22c93"
amir_address   = "0xCdA6C8029AAAdF224699db053f90e4769Ca567Cf"

chainlink_address = "0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06"
ethereum_address  = "0x8BaBbB98678facC7342735486C851ABD7A0d17Ca"
USDT_address      = "0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684"
WBNB_address      = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd"
BUSD_address      = "0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7"

coin_addresses    = [chainlink_address, ethereum_address, USDT_address, WBNB_address, BUSD_address]*4

def send_BNB_to_contract():

    nonce = web3.eth.getTransactionCount(PBK)
    tx = { 
            'nonce':  nonce,
            'to':     contract_address,
            'value':  web3.toWei(0.05, 'ether'),
            'gas':    500000,
            'gasPrice': web3.toWei('20', 'gwei')
    }
    signed_tx = account.sign_transaction(tx)
    tx_hash   = web3.eth.sendRawTransaction(signed_tx.rawTransaction)
    print("BNB sent to contract...")

def return_contract_transaction(*args):

    #remove/set try catch to verify transaction syntax is okay

    tx = {
        "from":         PBK,
        "to":           contract_address,
        "data":         contract.encodeABI(fn_name=args[1], args=[x for x in args[2:]]),
        "gas":          0,
        "gasPrice":     web3.toWei('20', 'gwei'),
        "nonce":        web3.eth.getTransactionCount(PBK)+args[0]
    }

    tx["gas"] = web3.eth.estimateGas(tx)*3

    return tx

    
def process_transaction(tx):
    
    try:
        signed_tx = account.sign_transaction(tx)
        tx_hash   = web3.eth.sendRawTransaction(signed_tx.rawTransaction) 
        print("transaction completed... waiting for next if present")
    except:
        print("transaction failed... moving on to next in sequence")


if __name__=="__main__":

    print("connection to RPC provider status:", end="")
    print(" ", web3.isConnected())

    print("PBK in use:", PBK)
    print("contract address in use:", contract_address)
    print("NOTE: make sure the ABI matches...")
    print("start balance:", web3.eth.get_balance(PBK)/10**18)


    #configure the router
    #upload the liquidity
    #send 3 billion to the burn wallet
    #send 3 billion to the vault wallet
    #send 100 million to the bounty wallet 
    #set balanced ratios
    #set last epoch prices
    #update the epoch
    #cast a vote in the current epoch
    #send contract native token
    #epoch number and time
    #ABI.json (don't forget to send)

    #import random
    #from decimal import Decimal
    #randoms = [random.random() for i in range(20)]
    #sum_randoms = sum(randoms)
    #randoms = [x/sum_randoms * (1*10**18) for x in randoms]
    #randoms = [int(Decimal(x)) for x in randoms]
    #randoms[19] = randoms[19] - max(0, randoms[19]-1*10**18)   

    votes = [
        35339986609340388,
        74304249641934992,
        51841567104916504,
        148780597282818,
        74646818157749408,
        42465392649793192,
        47561513716683856,
        21479163211901884,
        45511089818730624,
        20108936632667128,
        42796191696077880,
        1909693961000054,
        89241676154710928,
        31036017214177552,
        76403100725407920,
        75313180822644528,
        82724158624433872,
        36892343547470992,
        64363564548022600,
        85912574565052880
    ]

    balanced_ratios = [
        109380739885791680,
        56304592940992112,
        66599923074156544,
        39777917412321864,
        124960363188175408,
        74140030678458448,
        87299364674681984,
        0,
        32062144286739876,
        38853432808529872,
        22453309907932320,
        25602097528700712,
        22044054974015148,
        0,
        0,
        43920422121490016,
        77903708514995984,
        56048893179103016,
        43262476222723288,
        79386528601191728]

    print("configuring router...")
    tx_configure_router = return_contract_transaction(0, "configureRouter", router_address)
    process_transaction(tx_configure_router)
    time.sleep(6)
    

    print("approving limit...")
    tx_approve_limit    = return_contract_transaction(0, "approve", router_address, 2**256-1)
    process_transaction(tx_approve_limit)
    print("provide liquidity now... waiting for 2 minutes")
    time.sleep(120)   


    print("updating epoch...")
    tx_update_epoch = return_contract_transaction(0, "updateEpoch")
    process_transaction(tx_update_epoch)
    time.sleep(6)

    print("configuring assets (stablecoin/nativecoin)...")
    tx_configure_assets = return_contract_transaction(0, "configureAssets", native_address, stable_address)
    process_transaction(tx_configure_assets)
    time.sleep(6) 

    print("configuring addresses (coins)...")
    tx_configure_coins = return_contract_transaction(0, "updateAddresses", coin_addresses)
    process_transaction(tx_configure_coins)
    time.sleep(6)

    print("configuring oracle precisions...")
    all_tokens = coin_addresses + [contract_address, native_address, stable_address]
    all_precisions = [10**18 for i in range(len(all_tokens))]
    tx_configure_precisions = return_contract_transaction(0, "configureOraclePrecisionMultiple", all_tokens, all_precisions)
    process_transaction(tx_configure_precisions)
    time.sleep(6)

    print("configuring uniswap pairs...")
    tx_configure_uniswap_pairs = return_contract_transaction(0, "_updateUniswapPairs")
    process_transaction(tx_configure_uniswap_pairs)
    time.sleep(6)

    tx_list = [
        ["transfer", burn_address, 33*10**8*10**18],
        ["transfer", bounty_address, 250*10**6*10**18],
        ["transfer", vault_address, 33*10**8*10**18],
        ["vote", votes],
        ["setBalancedRatio", balanced_ratios],
        ["_setAllLastPricesOnReset"],
        ["transfer", grady_address, 110*10**6*10**18],
        ["transfer", elmore_address, 110*10**6*10**18],
        ["transfer", phil_address, 110*10**6*10**18],
        ["transfer", amir_address, 330*10**6*10**18]
    ]

    print("moving on to contract transactions...")
    print()    
 
    #to increment to nonce as transactions go through...
    tx_list = [[x]+tx_list[x] for x in range(len(tx_list))]
    tx_list = [return_contract_transaction(*tx) for tx in tx_list]

    for i in range(len(tx_list)):
        print(str(i+1) + ".", end=" ")
        process_transaction(tx_list[i])    

    time.sleep(5)

    send_BNB_to_contract()

    print("end balance:", end=" ")
    
    time.sleep(5)

    print(web3.eth.get_balance(PBK)/10**18)


