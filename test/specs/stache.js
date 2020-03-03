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

    it('should support multiline templates', () => {
        const tpl = stache(`
            {{foo}}
        `);

        const result = tpl({
            foo: 'bar'
        });

        expect(result.includes('\n')).to.equal(true);
        expect(result.trim()).to.equal('bar');
    });

    it('should support expressions', () => {
        const tpl = stache('{{ foo ? bar.toUpperCase() : add(baz + qux) }}');

        const result1 = tpl({
            foo: true,
            bar: 'abc',
            baz: 5,
            qux: 2,
            add: (val) => val + 10
        });
        expect(result1).to.equal('ABC');

        const result2 = tpl({
            foo: false,
            bar: 'abc',
            baz: 5,
            qux: 2,
            add: (val) => val + 10
        });
        expect(result2).to.equal('17');
    });
});
