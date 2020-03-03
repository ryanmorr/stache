import { expect } from 'chai';
import stache from '../../src/stache';

describe('stache', () => {
    function collapseWhitespace(str) {
        return str.trim().replace(/[\s\xa0]+/g, ' ').replace(/^\s+|\s+$/g, '');
    }

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

    it('should support a complex if directive', () => {
        const tpl = stache(`
            {{if !foo || (bar >= 10 && baz.startsWith('foo'))}}
                {{100}}
            {{else}}
                {{200}}
            {{/if}}
        `);

        const result1 = tpl({
            foo: true,
            bar: 10,
            baz: 'foo'
        });
        expect(result1.trim()).to.equal('100');

        const result2 = tpl({
            foo: true,
            bar: 11,
            baz: 'fooo'
        });
        expect(result2.trim()).to.equal('100');

        const result3 = tpl({
            foo: true,
            bar: 20,
            baz: 'foo bar'
        });
        expect(result3.trim()).to.equal('100');

        const result4 = tpl({
            foo: false,
            bar: 10,
            baz: 'foo'
        });
        expect(result4.trim()).to.equal('100');

        const result5 = tpl({
            foo: true,
            bar: 5,
            baz: 'foo'
        });
        expect(result5.trim()).to.equal('200');

        const result6 = tpl({
            foo: true,
            bar: 10,
            baz: 'fo'
        });
        expect(result6.trim()).to.equal('200');
    });

    it('should support an each directive', () => {
        const tpl = stache(`
            {{each items as item}}
                {{item}}
            {{/each}}
        `);

        const result1 = tpl({
            items: [1, 2, 3]
        });
        expect(collapseWhitespace(result1)).to.equal('1 2 3');

        const result2 = tpl({
            items: ['a', 'b', 'c', 'd', 'e']
        });
        expect(collapseWhitespace(result2)).to.equal('a b c d e');
    });

    it('should support an each directive with the index', () => {
        const tpl = stache(`
            {{each items as item, i}}
                {{i}}: {{item}}
            {{/each}}
        `);

        const result1 = tpl({
            items: [10, 20, 30]
        });
        expect(collapseWhitespace(result1)).to.equal('0: 10 1: 20 2: 30');

        const result2 = tpl({
            items: ['a', 'b', 'c', 'd', 'e']
        });
        expect(collapseWhitespace(result2)).to.equal('0: a 1: b 2: c 3: d 4: e');
    });

    it('should support nested each directives', () => {
        const tpl = stache(`
            {{each items as numbers}}
                {{each numbers as num}}
                    {{num}}
                {{/each}}
            {{/each}}
        `);

        const result1 = tpl({
            items: [
                [1, 2, 3],
                [10, 20]
            ]
        });
        expect(collapseWhitespace(result1)).to.equal('1 2 3 10 20');

        const result2 = tpl({
            items: [
                ['a', 'b', 'c', 'd', 'e'],
                ['f', 'g']
            ]
        });
        expect(collapseWhitespace(result2)).to.equal('a b c d e f g');
    });

    it('should support a complex each directive', () => {
        const tpl = stache(`
            {{each Object.entries(data) as [key, value]}}
                {{key}}: {{value}}
            {{/each}}
        `);

        const result1 = tpl({
            data: {
                foo: 1,
                bar: 2,
                baz: 10,
                qux: 50
            }
        });
        expect(collapseWhitespace(result1)).to.equal('foo: 1 bar: 2 baz: 10 qux: 50');

        const result2 = tpl({
            data: {
                a: 'foo',
                b: 'bar',
                c: 'baz'
            }
        });
        expect(collapseWhitespace(result2)).to.equal('a: foo b: bar c: baz');
    });
});
