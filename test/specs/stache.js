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

    it('should support an if directive', () => {
        const tpl = stache(`
            {{if foo}}
                {{bar}}
            {{/if}}
        `);

        const result1 = tpl({
            foo: true,
            bar: 'baz'
        });
        expect(result1.trim()).to.equal('baz');

        const result2 = tpl({
            foo: false,
            bar: 'baz'
        });
        expect(result2.trim()).to.equal('');
    });

    it('should support an if-else directive', () => {
        const tpl = stache(`
            {{if foo}}
                {{bar}}
            {{else}}
                {{baz}}
            {{/if}}
        `);

        const result1 = tpl({
            foo: true,
            bar: 'abc',
            baz: 123
        });
        expect(result1.trim()).to.equal('abc');

        const result2 = tpl({
            foo: false,
            bar: 'abc',
            baz: 123
        });
        expect(result2.trim()).to.equal('123');
    });

    it('should support an if-else-if directive', () => {
        const tpl = stache(`
            {{if foo}}
                {{bar}}
            {{else if baz < 10}}
                {{baz + 10}}
            {{else}}
                {{qux}}
            {{/if}}
        `);

        const result1 = tpl({
            foo: true,
            bar: 'abc',
            baz: 5,
            qux: true
        });
        expect(result1.trim()).to.equal('abc');

        const result2 = tpl({
            foo: false,
            bar: 'abc',
            baz: 5,
            qux: true
        });
        expect(result2.trim()).to.equal('15');

        const result3 = tpl({
            foo: false,
            bar: 'abc',
            baz: 15,
            qux: true
        });
        expect(result3.trim()).to.equal('true');
    });

    it('should support nested if directives', () => {
        const tpl = stache(`
            {{if foo}}
                {{if bar === 10}}
                    {{bar}}
                {{else}}
                    {{baz}}
                {{/if}}
            {{else}}
                empty
            {{/if}}
        `);

        const result1 = tpl({
            foo: false,
            bar: 10,
            baz: 20
        });
        expect(result1.trim()).to.equal('empty');

        const result2 = tpl({
            foo: true,
            bar: 10,
            baz: 20
        });
        expect(result2.trim()).to.equal('10');

        const result3 = tpl({
            foo: true,
            bar: 11,
            baz: 20
        });
        expect(result3.trim()).to.equal('20');
    });
});
