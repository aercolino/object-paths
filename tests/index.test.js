const chai = require('chai');
const sinon = require('sinon');
const sinonTest = require('sinon-test')(sinon);
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { expect } = chai;

const { selectPaths } = require('../src/index');


describe('selectPaths', function () {

    it('should return an empty array when an empty object is given', sinonTest(function () {
        expect(selectPaths({})).to.eql([]);
    }));

    it('should return an empty array when no argument is given', sinonTest(function () {
        expect(selectPaths()).to.eql([]);
    }));

    it('should find all paths when no selector is given', sinonTest(function () {
        expect(selectPaths({ a: 1, b: { c: 3 } })).to.eql(['a', 'b.c']);
    }));

    it('should find only paths matching the selector regex', sinonTest(function () {
        expect(selectPaths({ a: 1, b: { c: 'ccc' }, d: 'c', e: 'cc' }, /cc/)).to.eql(['b.c', 'e']);
    }));

    it('should find only paths matching the selector test method', sinonTest(function () {
        const actual = selectPaths({ a: 1, b: { c: '50' }, d: 'c', e: 'cc' }, { test: x => x % 7 === 1 });
        actual.sort();
        const expected = ['b.c', 'a'];
        expected.sort();
        expect(actual).to.eql(expected);
    }));

    it('should throw when a selector without a test function is given', sinonTest(function () {
        const actual = () => selectPaths({ a: 1, b: { c: '50' }, d: 'c', e: 'cc' }, { fn: x => x % 7 === 1 });
        expect(actual).to.throw('selector.test is not a function');
    }));

});
