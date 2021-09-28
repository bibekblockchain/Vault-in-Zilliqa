const { BN, Long, bytes, units } = require('@zilliqa-js/util');
const { Zilliqa } = require('@zilliqa-js/zilliqa');
const {
    toBech32Address,
    getAddressFromPrivateKey,
} = require('@zilliqa-js/crypto');

const zilliqa = new Zilliqa('https://dev-api.zilliqa.com');

const chainId = 333; // chainId of the developer testnet
const msgVersion = 1; // current msgVersion

var options = {
    apiVersion: 'v1',
    endpoint: 'http://127.0.0.1:8200',
    token: 's.qlIhIpaAcgnxQf0fytWyIt4H'
};

// get new instance of the client
var vault = require("node-vault")(options);

//store private key inside a secret engine in vault - This can be done via cli so that the private key isnot exposed
vault.write('secret/private', { key: '2ffeab20e8e3cb7a909581016152c2348b7d5aecac20c80397fc3fa39582c9a1' })
    .then(() => vault.read('secret/private'))
    .then((result) => {
        zilliqa.wallet.addByPrivateKey(result.data.key);

        const address = getAddressFromPrivateKey(privateKey);
        console.log(`My account address is: ${address}`);
        console.log(`My account bech32 address is: ${toBech32Address(address)}`);
    })
    .then(() => vault.delete('secret/private'))
    .catch(console.error);