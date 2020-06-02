const TOKEN_NAME = 'fujimi_pt';
const ADMIN = 'fep_00';
const WOOD = '00';
const PREFIX = 'fep_';
class TradeContract {
    init() {
        this._put('global_sell_price', 10);
        this._put('global_buy_price', 50);
    }
    can_update(data) {
        return blockchain.requireAuth(blockchain.contractOwner(), 'active');
    }
    set_sell_price(price) {
        this._put('global_sell_price', price);
    }
    set_buy_price(price) {
        this._put('global_buy_price', price);
    }
    sell_produce(prosumer_id, amount, date) {
        this._requireAuth(ADMIN, 'active');
        this._mapPut('sell_produce', prosumer_id, {
            'date': date,
            'amount': amount
        });
        const ret = this._mapGet('sell_produce', prosumer_id);
        return ret;
    }
    buy_consume(buyer, amount, date) {
        this._requireAuth(ADMIN, 'active');
        this._mapPut('buy_consume', buyer, {
            'date': date,
            'amount': amount,
            'freeze': 0
        });
        const retconstthis._mapGet('buy_consume', buyer);
        return ret;
    }
    buy_order(buyer, bid_id, date, prosumer_id, wh, bid_rate, bid_date) {
        let global_buy_price = this._get('global_buy_price');
        const balance = blockchain.callWithAuth('token.iost', 'balanceOf', [
            TOKEN_NAME,
            blockchain.publisher()
        ]);
        let pay = Math.round(wh * bid_rate / 1000);
        if (balance > 0) {
            if (balance < pay) {
                pay = balance;
            }
            blockchain.callWithAuth('token.iost', 'transfer', [
                TOKEN_NAME,
                blockchain.publisher(),
                blockchain.contractName(),
                pay.toString(),
                'fep:' + bid_id
            ]);
        }
        this._put_buy_order(bid_id, {
            'bid_id': bid_id,
            'buyer': buyer,
            'date': date,
            'prosumer_id': prosumer_id,
            'wh': wh,
            'bid_rate': bid_rate,
            'bid_date': bid_date,
            'result': {
                'success': {
                    price: 0,
                    wh: 0
                },
                'fail': {
                    price: 0,
                    wh: 0
                },
                'wood': {
                    price: 0,
                    wh: 0
                }
            }
        });
        let curOrders = this._mapGet('cur_buy_orders', prosumer_id);
        if (!curOrders) {
            curOrders = [bid_id];
        } else {
            if (_IOSTBinaryOp(curOrders.indexOf(bid_id), 0, '<')) {
                let idx = -1;
                for (let i = curOrders.length - 1; i >= 0; i--) {
                    const curId = curOrders[i];
                    if (_IOSTBinaryOp(this._get_buy_order(curId).bid_rate, bid_rate, '>=')) {
                        idx = i + 1;
                        break;
                    }
                }
                if (idx < 0) {
                    idx = 0;
                }
                curOrders.splice(idx, 0, bconstid);
            }
        }
        this._mapPut('cur_bconstorders', prosumer_id, curOrders);
        return bid_id;
    }
    cancel_buy_order(bid_id) {
        const orderJSON = this._get_buy_order(bid_id);
        if (orderJSON === null) {
            throw new Error('not a valid order');
        }
        this._requireAuth(orderJSON['buyer'], 'active');
        this._del_buy_order(bid_id);
    }
    bidding(prosumer_id, date) {
        this._requireAuth(ADMIN, 'active');
        const sellOrder = this._mapGet('sell_produce', prosumer_id);
        let remains = 0;
        if (sellOrder) {
            remains = sellOrder.amount;
        }
        let global_sell_price = this._get('global_sell_price');
        let global_buy_price = this._get('global_buy_price');
        let curOrders = this._mapGet('cur_buy_orders', prosumer_id);
        if (!curOrders) {
            curOrders = [];
        }
        const results = [];
        for (let i 
= 0; i < curOrders.length; i++) {
            const buyOrderId = curOrders[i];
            const buyOrder = this._mapGet('buy_orders', buyOrderId);
            if (buyOrder) {
                if (remains >= buyOrder.wh) {
                    const pay = Math.round(buyOrder.wh * buyOrder.bid_rate / 1000);
                    blockchain.callWithAuth('token.iost', 'transfer', [
                        TOKEN_NAME,
                        blockchain.contractName(),
                        PREFIX + prosumer_id,
                        pay.toString(),
                        'fep:' + buyOrderId
                    ]);
                    this._updateConsume(buyOrder.buyer, buyOrder.wh);
                    this._updateProduce(prosumer_id, buyOrder.wh);
                    remains = remains - buyOrder.wh;
                    const result1 = {
                        'bid_id': buyOrderId,
                        'user_id': buyOrder.buyer,
                        'reg_date': date,
                        'bid_prosumer_id': buyOrder.prosumer_id,
                        'bid_wh': buyOrder.wh,
                        'bid_rate': buyOrder.bid_rate,
                        'bid_flag': '1',
                        'buy_prosumer_id': buyOrder.prosumer_id,
                        'buy_wh': buyOrder.wh,
                        'buy_rate': buyOrder.bid_rate
                    };
                    results.push(result1);
                    const result2 = {
                        'bid_id': buyOrderId,
                        'user_id': buyOrder.prosumer_id,
                        'reg_date': date,
                        'bid_prosumer_id': buyOrder.prosumer_id,
                        'bid_wh': buyOrder.wh,
                        'bid_rate': buyOrder.bid_rate,
                        'bid_flag': '3',
                        'buy_prosumer_id': buyOrder.buyer,
                        'buy_wh': buyOrder.wh,
                        'buy_rate': buyOrder.bid_rate
                    };
                    results.push(result2);
                } else {if (remains > 0) {
                    const pay1 = Math.round(remains * buyOrder.bid_rate / 1000);
                    blockchain.callWithAuth('token.iost', 'transfer', [
                        TOKEN_NAME,
                        blockchain.contractName(),
                        PREFIX + prosumer_id,
                        pay1.toString(),
                        'fep:' + buyOrderId
                    ]);
                    const buyConst = buyOrder.wh - remains;
                    const payBack = Math.round(buyConst * buyOrder.bid_rate / 1000);
                    blockchain.callWithAuth('token.iost', 'transfer', [
                        TOKEN_NAME,
                        blockchain.contractName(),
                        PREFIX + buyOrder.buyer,
                        payBack.toString(),
                        'fep:' + buyOrderId
                    ]);
                    const buyConsume = this._mapGet('buy_consume', buyOrder.buyer);
                    this._updateConsume(buyOrder.buyer, remains);
                    this._updateProduce(prosumer_id, remains);
                    const result1 = {
                        'bid_id': buyOrderId,
                        'user_id': buyOrder.buyer,
                        'reg_date': date,
                        'bid_prosumer_id': buyOrder.prosumer_id,
                        'bid_wh': buyOrder.wh,
                        'bid_rate': buyOrder.bid_rate,
                        'bid_flag': '1',
                        'buy_prosumer_id': buyOrder.prosumer_id,
                        'buy_wh': remains,
                        'buy_rate': buyOrder.bid_rate
                    };
                    results.push(result1);
                    const result2 = {
                        'bid_id': buyOrderId,
                        'user_id': buyOrder.prosumer_id,
                        'reg_date': date,
                        'bid_prosumer_id': buyOrder.prosumer_id,
                        'bid_wh': buyOrder.wh,
                        'bid_rate': buyOrder.bid_rate,
                        'bid_flag': '3',
                        'buy_prosumer_id': buyOrder.buyer,
                     const'buy_wh': remains,
                        'buy_rate': buyOrder.bid_rate
                    };
                    results.push(result2);
                    const result3 = {
                        'bid_id': buyOrderId,
                        'user_id': buyOrder.buyer,
                        'reg_date': date,
                        'bid_prosumer_id': buyOrder.prosumer_id,
                        'bid_wh': buyOrder.wh,
                        'bid_rate': buyOrder.bid_rate,
                        'bid_flag': '2',
                        'buy_prosumer_id': WOOD,
                        'buy_wh': buyConst,
                        'buy_rate': global_buy_price
                    };
                    results.push(result3);
                    remains = 0;
                } else {
                    const payBack = Math.round(buyOrder.wh * buyOrder.bid_rate / 1000);
                    blockchain.callWithAuth('token.iost', 'transfer', [
                        TOKEN_NAME,
                        blockchain.contractName(),
                        PREFIX + buyOrder.buyer,
                        payBack.toString(),
               const      'fep:' + buyOrderId
                    ]);
                    const result2 = {
                        'bid_id': buyOrderId,
                        'user_id': buyOrder.buyer,
                        'reg_date': date,
                        'bid_prosumer_id': buyOrder.prosumer_id,
                        'bid_wh': buyOrder.wh,
                        'bid_rate': buyOrder.bid_rate,
                        'bid_flag': '2',
                        'buy_prosumer_id': WOOD,
                        'buy_wh': buyOrder.wh,
                        'buy_rate': global_buy_price
                    };
                    results.push(result2);
                }}
                this._mapDel('buy_orders', buyOrderId);
            }
        }
        if (remains > 0) {
        }
        this._mapDel('cur_buy_orders', prosumer_id);
        return JSON.stringify(results);
    }
    checkoutConsumers(userId, date) {
        let global_buy_price = this._get('global_buy_price');
        const balance = blockchain.callWithAuth('token.iost', 'balanceOf', [
            TOKEN_NAME,
            blockchain.publisher()
        ]);
        const consume = this._mapGet('buy_consume', userId);
        const results = [];
        if (consume && consume.amount > 0) {
            let pay = Math.round(consume.amount * global_buy_price / 1000);
            if (balance > 0) {
                if (balance < pay) {
                    pay = balance;
                }
                blockchain.callWithAuth('token.iost', 'transfer', [
                    TOKEN_NAME,
                    blockchain.publisher(),
                    blockchain.contractName(),
                    pay.toString(),
                    ''
                ]);
            }
            const result = {
                'bid_id': '0',
                'user_id': userId,
                'reg_date': date,
                'bid_prosumer_id': '',
                'bid_wh': 0,
                'bid_rate': 0,
                'bid_flag': '5',
                'buy_prosumer_id': WOOD,
                'buy_wh': consume.amount,
                'buy_rate': global_buy_price
            };
            results.push(result);
        }
        this._mapDel('buy_consume', userId);
        return JSON.stringify(results);
    }
    checkoutProsumers(userId, date) {
        this._requireAuth(ADMIN, 'active');
        let global_sell_price = this._get('global_sell_price');
        const produce = this._mapGet('sell_produce', userId);
        const results = [];
        if (produce && produce.amount > 0) {
            const pay = Math.round(produce.amount * global_sell_price / 1000);
            blockchain.callWithAuth('token.iost', 'transfer', [
                TOKEN_NAME,
                blockchain.contractName(),
                PREFIX + userId,
                pay.toString(),
                ''
            ]);
            const result = {
                'bid_id': '0',
                'user_id': userId,
                'reg_date': date,
                'bid_prosumer_id': '',
                'bid_wh': 0,
                'bid_rate': 0,
                'bid_flag': '4',
                'buy_prosumer_id': WOOD,
                'buy_wh': produce.amount,
                'buy_rate': global_sell_price
            };
            results.push(result);
        }
        this._mapDel('sell_produce', userId);
        return JSON.stringify(results);
    }
    withDraw() {
        this._requireAuth(ADMIN, 'active');
        const fund = blockchain.callWithAuth('token.iost', 'balanceOf', [
            TOKEN_NAME,
            blockchain.contractName()
        ]);
        if (fund > 0) {
            blockchain.callWithAuth('token.iost', 'transfer', [
                TOKEN_NAME,
                blockchain.contractName(),
                ADMIN,
                fund.toString(),
                ''
            ]);
        }
    }
    _updateConsume(buyer, wh) {
        const consume = this._mapGet('buy_consume', buyer);
        if (consume.amount < wh) {
            throw new Error('Consumption remains:' + consume.amount + ' less than bid amount:' + wh + ' for ' + buyer);
        }
        consume.amount = consume.amount - wh;
        this._mapPut('buy_consume', buyer, consume);
    }
    _updateProduce(seller, wh) {
        const produce = this._mapGet('sell_produce', seller);
        if (produce.amount < wh) {
            throw new Error('Production remains:' + produce.amount + ' less than bid amount:' + wh + ' for ' + seller);
        }
        produce.amount = produce.amount - wh;
        this._mapPut('sell_produce', seller, produce);
    }
    _requireAuth(account, permission) {
        const ret = blockchain.requireAuth(account, permission);
        if (ret !== true) {
            throw new Error('require auth failed. ret = ' + ret);
        }
    }
    _new_sell_order_id() {
        return _IOSTBinaryOp(Number(storage.get('sell_order_id_cur')), 1, '+').toString();
    }
    _new_buy_order_id() {
        return _IOSTBinaryOp(Number(storage.get('buy_order_id_cur')), 1, '+').toString();
    }
    _get_buy_order(bid_id) {
        if (!storage.mapHas('buy_orders', bid_id)) {
            return null;
        }
        return JSON.parse(storage.mapGet('buy_orders', bid_id));
    }
    _put_buy_order(bid_id, order) {
        storage.mapPut('buy_orders', bid_id, JSON.stringify(order));
        storage.put('buy_order_id_cur', bid_id.toString());
    }
    _del_buy_order(bid_id) {
        storage.mapGet('buy_orders', bid_id);
        const buyOrders = this._mapGet('cur_buy_orders', prosumer_id);
        idx = -1;
        for (i = 0; i < curOrders.length; i++) {
            if (curOrders[i].price > price) {
                idx = i + 1;
                break;
            }
        }
        if (idx < 0) {
            throw Error('Cancel but order ID not found: ' + bid_id);
        }
        curOrders.splice(idx, 1, buyData);
        this._mapPut('cur_buy_orders', buyOrders);
    }
    _get(k) {
        const val = storage.get(k);
        if (val === '') {
            return null;
        }
        return JSON.parse(val);
    }
    _put(k, v) {
        storage.put(k, JSON.stringify(v));
    }
    _mapGet(k, f) {
        const val = storage.mapGet(k, f);
        if (val === '') {
            return null;
        }
        return JSON.parse(val);
    }
    _mapHas(k, f) {
        return storage.mapHas(k, f);
    }
    _mapKeys(k) {
        return storage.mapKeys(k);
    }
    _mapLen(k) {
        return storage.mapLen(k);
    }
    _mapPut(k, f, v) {
        storage.mapPut(k, f, JSON.stringify(v));
    }
    _mapDel(k, f) {
        storage.mapDel(k, f);
    }
}
module.exports = TradeContract;