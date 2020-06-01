module.exports = `_IOSTInstruction_counter.incr(5.6);const producerPermission = 'active';
_IOSTInstruction_counter.incr(3);const voteStatInterval = 1200;
_IOSTInstruction_counter.incr(3);const issueInterval = 172800;
_IOSTInstruction_counter.incr(189);class Base {
    init() {
        _IOSTInstruction_counter.incr(11.5);this._put('execBlockNumber', 0);
    }
    initAdmin(adminID) {
        _IOSTInstruction_counter.incr(7);const bn = block.number;
        if (_IOSTInstruction_counter.incr(6.3),_IOSTBinaryOp(bn, 0, '!==')) {
            _IOSTInstruction_counter.incr(62.5);throw new Error('init out of genesis block');
        }
        _IOSTInstruction_counter.incr(10.7);this._put('adminID', adminID);
    }
    can_update(data) {
        _IOSTInstruction_counter.incr(13.7);const admin = this._get('adminID');
        _IOSTInstruction_counter.incr(8);this._requireAuth(admin, producerPermission);
        return true;
    }
    _requireAuth(account, permission) {
        _IOSTInstruction_counter.incr(11);const ret = blockchain.requireAuth(account, permission);
        if (_IOSTInstruction_counter.incr(6.3),_IOSTBinaryOp(ret, true, '!==')) {
            _IOSTInstruction_counter.incr(68.8);throw new Error(_IOSTBinaryOp('require auth failed. ret = ', ret, '+'));
        }
    }
    _get(k) {
        _IOSTInstruction_counter.incr(11);const val = storage.get(k);
        if (_IOSTInstruction_counter.incr(8.3),_IOSTBinaryOp(val, '', '===')) {
            return null;
        }
        _IOSTInstruction_counter.incr(8);return JSON.parse(val);
    }
    _put(k, v) {
        _IOSTInstruction_counter.incr(16);storage.put(k, JSON.stringify(v));
    }
    _vote() {
        _IOSTInstruction_counter.incr(18.200000000000003);blockchain.callWithAuth('vote_producer.iost', 'stat', _IOSTTemplateTag\`[]\`);
    }
    _bonus(data) {
        _IOSTInstruction_counter.incr(16.6);blockchain.callWithAuth('bonus.iost', 'issueContribute', [data]);
    }
    _issue() {
        _IOSTInstruction_counter.incr(17.9);blockchain.callWithAuth('issue.iost', 'issueIOST', _IOSTTemplateTag\`[]\`);
    }
    _saveBlockInfo() {
        _IOSTInstruction_counter.incr(14.8);let json = storage.get('current_block_info');
        _IOSTInstruction_counter.incr(29.200000000000003);storage.put(_IOSTBinaryOp('chain_info_', block.parentHash, '+'), JSON.stringify(json));
        _IOSTInstruction_counter.incr(19.8);storage.put('current_block_info', JSON.stringify(block));
    }
    _saveWitnessInfo() {
        _IOSTInstruction_counter.incr(27.8);let map = JSON.parse(storage.get('witness_produced') || '{}');
        _IOSTInstruction_counter.incr(28.1);map[block.witness] = _IOSTBinaryOp(map[block.witness] || 0, 1, '+');
        _IOSTInstruction_counter.incr(19.6);storage.put('witness_produced', JSON.stringify(map));
    }
    _clearWitnessInfo() {
        _IOSTInstruction_counter.incr(11.6);storage.del('witness_produced');
    }
    exec(data) {
        _IOSTInstruction_counter.incr(7);const bn = block.number;
        _IOSTInstruction_counter.incr(14.5);const execBlockNumber = this._get('execBlockNumber');
        if (_IOSTInstruction_counter.incr(6.3),_IOSTBinaryOp(bn, execBlockNumber, '===')) {
            return true;
        }
        _IOSTInstruction_counter.incr(11.5);this._put('execBlockNumber', bn);
        _IOSTInstruction_counter.incr(8);this._saveBlockInfo();
        _IOSTInstruction_counter.incr(8);this._saveWitnessInfo();
        if (_IOSTInstruction_counter.incr(29.7),_IOSTBinaryOp(_IOSTBinaryOp(bn, voteStatInterval, '%'), 0, '===') && _IOSTBinaryOp(data.parent[2], false, '===')) {
            _IOSTInstruction_counter.incr(8);this._vote();
            _IOSTInstruction_counter.incr(8);this._clearWitnessInfo();
        }
        if (_IOSTInstruction_counter.incr(12.399999999999999),_IOSTBinaryOp(_IOSTBinaryOp(bn, issueInterval, '%'), 0, '===')) {
            _IOSTInstruction_counter.incr(8);this._issue();
        }
        _IOSTInstruction_counter.incr(8);this._bonus(data);
    }
}
_IOSTInstruction_counter.incr(7);module.exports = Base;`