const lodash = require('lodash');

module.exports.selectPaths = (object, selector = /.*/) => {
    const list = [];

    visit(object);
    return list;

    function visit(object, keys = []) {
        lodash.forEach(object, (value, key) => {
            keys.push(key);
            if (lodash.isArray(value) || lodash.isPlainObject(value)) {
                visit(value, keys);
            } else if (selector.test(value)) {
                list.push(keys.join('.'));
            }
            keys.pop();
        });
    }
}
