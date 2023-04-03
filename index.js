const fs = require('fs');
const path = require('path');
const { FireblocksSDK } = require('fireblocks-sdk');
const { exit } = require('process');
const { inspect } = require('util');

const apiSecret = fs.readFileSync(path.resolve("fireblocks_secret.key"), "utf8");
const apiKey = "3d3988e9-8e87-c04f-6f75-41551673514d"


// Choose the right api url for your workspace type 
const baseUrl = "https://api.fireblocks.io";
const fireblocks = new FireblocksSDK(apiSecret, apiKey, baseUrl);

(async () => {

    const Vaults =
        [
            {
                id: "36",
                name: "VaultA",
                assets: [
                    {
                        assetId: "ETH_TEST3",
                        asset_Addresses: ["0xF3d21f2501E588a48672f9c9c1292D5A55EeEB44"],
                        balance: "1.004477202603241"
                    },
                    {
                        assetId: "BTC_TEST",
                        asset_Addresses: ["tb1qje2lw6f05elq9377glwvzv32gr75dalc63cf29"],
                        balance: "0.0001901"
                    }
                ],
            },
            {
                id: "74",
                name: "VaultB",
                assets: [
                    {
                        assetId: "ETH_TEST3",
                        asset_Addresses: ["0x3c9047B4dFbc4F6D6867B4f9E39EE3D649b7D31d"],
                        balance: "0.199497720628828"
                    },
                    {
                        assetId: "BTC_TEST",
                        asset_Addresses: ["tb1qg6kc0u5myz9q305jrce26t02ak90pcphclhfkd"],
                        balance: "0.01984956"
                    }
                ],
            },
            {
                id: "83",
                name: "Main_Vault",
                assets: [
                    {
                        assetId: "ETH_TEST3",
                        asset_Addresses: ["0x394561B295b304e24E6c500CE8e2191F367F2018"],
                        balance: "0"
                    },
                    {
                        assetId: "BTC_TEST",
                        asset_Addresses: ["tb1quhtcq4hd737e9ajdxfqty5ndr80cp7qepw8kxy"],
                        balance: "0.00001"
                    }
                ],
            }
        ]

    const vault_IDs = ["36", "74", "83"];

    for (i = 0; i < 2; i++) {
        console.log("i loop");
        for (j = 0; j < 2; j++) {
            console.log("j loop");
            const TransactionArguments = {
                assetId: Vaults[i].assets[j].assetId,
                source: { type: "VAULT_ACCOUNT", id: Vaults[i].id },
                destination: { type: "VAULT_ACCOUNT", id: "83" },
                amount: Vaults[i].assets[j].balance,
                feeLevel: "LOW",
                note: "Created by fireblocks SDK"
            };
            console.log("transactionArguments", TransactionArguments);
            const result = await fireblocks.createTransaction(TransactionArguments);
            console.log("Transaction Result ------>", result);

        }
    }

    for (i = 0; i < vault_IDs.length; i++) {

        const getVaultInformation = await fireblocks.getVaultAccountById(Vaults[i].id);
        console.log("Vault Details ------->", getVaultInformation);
    }

    // const Supported_Assets = await fireblocks.getSupportedAssets();
    // console.log("Supported Assets are ------->", Supported_Assets);

    // const vaultAccounts = await fireblocks.getVaultAccounts();
    // console.log("My Vault Accounts ------> ", vaultAccounts);

    // // Print vaults before creation
    // const vaultAccounts = await fireblocks.getVaultAccountsWithPageInfo();
    // console.log(inspect(vaultAccounts, false, null, true));

    // const RenameVaultAccount = await fireblocks.updateVaultAccount("74", "VaultB");
    // console.log("New account name", RenameVaultAccount);

    // Create vault account
    // const vaultCreation = await fireblocks.createVaultAccount("Main_Vault");
    // console.log(inspect(vaultCreation, false, null, true));

    // const Supported_Assets = await fireblocks.getSupportedAssets();
    // console.log("Supported Assets are ------->", Supported_Assets);

    // const createWallet = await fireblocks.createVaultAsset('83','BTC_TEST');
    // console.log("Create Wallet response ------>", createWallet);

    /*
    Create Wallet response ------> {
    id: '74',
    address: 'tb1qg6kc0u5myz9q305jrce26t02ak90pcphclhfkd',
    legacyAddress: 'mmxfUdXWfeJPAGCv7XsjZL8UoX84CeMocM',
    tag: ''
    }
    id: '83'
    address: 'tb1quhtcq4hd737e9ajdxfqty5ndr80cp7qepw8kxy',
    legacyAddress: 'n2UFCH4w4YHtoBSVzLsoRrVQwG8zJTUmWq',
    */

    // const activateWallet = await fireblocks.activateVaultAsset('83','ETH_TEST3');
    // console.log("Response of Activation ------>",activateWallet );

    // const getVaultInformation0 = await fireblocks.getVaultAccountById('36');
    // console.log("Vault Details ------->",getVaultInformation0);
    // const getVaultInformation1 = await fireblocks.getVaultAccountById('74');
    // console.log("Vault Details ------->",getVaultInformation1);

    // const getAddress = await fireblocks.getDepositAddresses('83','BTC_TEST');
    // console.log("Deposit Address is for BTC_TEST -------->", getAddress);

    /*
    Vault 36 ETH_TEST3 address : 0xF3d21f2501E588a48672f9c9c1292D5A55EeEB44     BTB: 1.110583924047701   ATB: 
    Vault 74 ETH_TEST3 address : 0x3c9047B4dFbc4F6D6867B4f9E39EE3D649b7D31d     BTB: 0.002               ATB: 
    Vault 83 ETH_TEST3 address : 0x394561B295b304e24E6c500CE8e2191F367F2018     BTB: 0                   ATB:
    */

    // // Print vaults after creation
    // vaultAccounts = await fireblocks.getVaultAccountsWithPageInfo({});
    // console.log(inspect(vaultAccounts, false, null, true));



    // const TxArguments = { 
    //     assetId: "BTC_TEST", 
    //     source: { type: "VAULT_ACCOUNT", id: "74" }, 
    //     destination: { type: "VAULT_ACCOUNT", id: "36" }, 
    //     amount: "0.00001"
    // };
    // const estimatedFee = await fireblocks.estimateFeeForTransaction(TxArguments);
    // console.log("Estimated Transaction Fee ------>", estimatedFee);


    //const TransactionArguments = { 
    // assetId: "ETH_TEST3", 
    // source: { type: "VAULT_ACCOUNT", id: "36" }, 
    // destination: { type: "VAULT_ACCOUNT", id: "83" }, 
    // amount: "0.0000001",
    // //fee: "0.00000000000000018",
    // feeLevel: "LOW", 
    // // basefee: "180.643201679", 
    // // priorityFee: '1.501',
    // // networkFee: '0.004560028235259',
    // // gasPrice: '180.037',
    // // gasLimit: '21000', 
    // note: "Created by fireblocks SDK" 
    // }; 

    // const result = await fireblocks.createTransaction(TransactionArguments);
    // console.log("Transaction Result ------>", result);
    //Creating a ETH_TEST3 Transaction from vault 36 to vault 74
    // const TransactionArguments = { 
    // assetId: "ETH_TEST3", 
    // source: { type: "VAULT_ACCOUNT", id: "36" }, 
    // destination: { type: "VAULT_ACCOUNT", id: "83" }, 
    // amount: "0.0000001",
    // //fee: "0.00000000000000018",
    // feeLevel: "LOW", 
    // // basefee: "180.643201679", 
    // // priorityFee: '1.501',
    // // networkFee: '0.004560028235259',
    // // gasPrice: '180.037',
    // // gasLimit: '21000', 
    // note: "Created by fireblocks SDK" 
    // }; 

    // const result = await fireblocks.createTransaction(TransactionArguments);
    // console.log("Transaction Result ------>", result);

    /*
    Transaction Result ------> { id: '6377b45c-a299-4e3b-a14e-2edda5e900f9', status: 'SUBMITTED' }
    */

    // const tx = await fireblocks.getTransactionById('6a43ce41-555e-441e-8cf9-c44e6cbd1da2');
    // console.log("Transaction Detail ------>", tx);

})().catch((e) => {
    console.error(`Failed: ${e}`);
    exit(-1);
})