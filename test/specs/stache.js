import { expect } from 'chai';
import stache from '../../src/stache';

describe('stache', () => {
    it('should interpolate a value', () => {
        const tpl = stache('Hello {{ value }}!');

        const result = tpl({
            value: 'World'
        });

        expect(result).to.equal('Hello World!');
    });

    it('should support leading and trailing spaces within delimiters', () => {
        const tpl = stache('Hello {{ value  }}!');

        const result = tpl({
            value: 'World'
        });

        expect(result).to.equal('Hello World!');
    });
});
