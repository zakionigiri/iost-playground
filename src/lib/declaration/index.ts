const decl = `// base definitions for all IOST contract modules that are not specific to any version of TypeScript
/// <reference path="block.d.ts" />
/// <reference path="blockchain.d.ts" />
/// <reference path="iostcrypto.d.ts" />
/// <reference path="storage.d.ts" />
/// <reference path="tx.d.ts" />
// Type definitions for non-npm package IOST contract API 3.4
// Project: https://github.com/iost-official/
// Definitions by: Masaki Muranaka <https://github.com/monaka>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

// TypeScript Version: 2.2

/// <reference path="base.d.ts" />
declare namespace IOSTContract {
    interface Block {
        number: number;
        parent_hash: string;
        witness: string;
        time: number;
    }
}

declare const block: IOSTContract.Block;
declare namespace IOSTContract {
    interface Blockchain {
        transfer(from: string, to: string, amount: string, memo: string): void;
        withdraw(to: string, amount: string, memo: string): void;
        deposit(from: string, amount: string, memo: string): void;
        contractName(): string;
        publisher(): string;
        contractOwner(): string;
        call(contract: string, abi: string, args: string[] | string): string[];
        callWithAuth(contract: string, abi: string, args: string[] | string): string[];
        requireAuth(account: string, permission: string): boolean;
        receipt(data: string): void;
        event(data: string): void;
    }
}

declare const blockchain: IOSTContract.Blockchain;
//

declare namespace IOSTContract {
    interface Tx {
        time: number;
        hash: string;
        expiration: number;
        gas_limit: number;
        gas_ratio: number;
        auth_list: object;
        publisher: string;
    }
}

declare const tx: IOSTContract.Tx;
declare namespace IOSTContract {
    interface Block {
        number: number;
        parent_hash: string;
        witness: string;
        time: number;
    }

    interface _IOSTCrypto {
        sha3(data: string): string;
        verify(algo: string, message: string, signature: string, pubkey: string): number;
    }
}

declare const IOSTCrypto: IOSTContract._IOSTCrypto;
declare namespace IOSTContract {
    interface LocalStorage {
        put(key: string, value: string, payer?: string): any;
        get(key: string): string | null;
        has(key: string): boolean;
        del(key: string): void;
        mapPut(key: string, field: string, value: string, payer?: string): void;
        mapGet(key: string, field: string): string | null;
        mapHas(key: string, field: string): boolean;
        mapKeys(key: string): string[];
        mapLen(key: string): number;
        mapDel(key: string, field: string): void;
    }
    interface GlobalStorage {
        globalHas(contract: string, key: string): boolean;
        globalGet(contract: string, key: string): string | null;
        globalMapHas(contract: string, key: string, field: string): boolean;
        globalMapGet(contract: string, key: string, field: string): string | null;
        globalMapLen(contract: string, key: string): number;
        globalMapKeys(contract: string, key: string): string[];
    }
    interface Storage extends LocalStorage, GlobalStorage {
    }
}

declare const storage: IOSTContract.Storage;

`
export default decl
