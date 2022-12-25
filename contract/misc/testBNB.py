from eth_account import Account
import secrets
from web3 import Web3
import requests
from stem import Signal
from stem.control import Controller
from selenium import webdriver
import time
import os

#setting web3 to testnet for BSC
web3 = Web3(Web3.HTTPProvider("https://data-seed-prebsc-1-s1.binance.org:8545"))
central_accumulation_account = "0x50e736fb238E89A4924413577C80586b6EF23C24"

#Account generation
def createAccount():
    priv = secrets.token_hex(32)
    private_key = "0x" + priv
    print("generating account...")
    acct = Account.from_key(private_key)
    print("PBK:", acct.address, "\nPVK:", private_key)
    print()
    return(acct.address, private_key)

def sendBNBToCentral(pbk, pvk):
    try:
        nonce = web3.eth.getTransactionCount(pbk)
        tx = {
                'nonce':  nonce,
                'to':     central_accumulation_account,
                'value':  web3.toWei(0.995, 'ether'),
                'gas':    50000,
                'gasPrice': web3.toWei('10', 'gwei')
        }
        signed_tx = web3.eth.account.sign_transaction(tx, pvk)
        tx_hash   = web3.eth.sendRawTransaction(signed_tx.rawTransaction)
        print("successful transfer:", web3.toHex(tx_hash))
        print()
        return True
    except:
        print("tor relay circuit replicated... going again")
        return False

def accumulateBNB():
    
    faucetURL = "https://testnet.binance.org/faucet-smart"

    profile = webdriver.FirefoxProfile()
    #profile.set_preference("network.proxy.type", 1)
    profile.set_preference("network.proxy.socks", "127.0.0.1")
    profile.set_preference("network.proxy.socks_port", 9150)
    #profile.set_preference("network.proxy.socks_remote_dns", False) 
    profile.update_preferences()
    time.sleep(2)
    driver = webdriver.Firefox(firefox_profile=profile)
    driver.get(faucetURL)
    addressField = driver.find_element_by_id("url")
    giveMeBNBButton = driver.find_elements_by_class_name("input-group-btn")[0] 
    giveMeBNBButton.click()
    oneBNBOption    = driver.find_element_by_link_text("1 BNB")
    (pbk, pvk) = createAccount()
    addressField.send_keys(pbk)
    oneBNBOption.click()
    time.sleep(30)
    driver.quit()
    time.sleep()
    sendBNBToCentral(pbk, pvk)
        
if __name__=="__main__":
    accumulateBNB()
