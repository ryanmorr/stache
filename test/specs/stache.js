import { expect } from 'chai';
import sinon from 'sinon';
import stache from '../../src/stache';

describe('stache', () => {
    it('should interpolate a value', () => {
        const tpl = stache('Hello {{value}}!');

        expect(tpl({value: 'World'})).to.equal('Hello World!');
    });
});
