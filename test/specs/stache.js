import { expect } from 'chai';
import stache from '../../src/stache';

describe('stache', () => {
    function normalizeWhitespace(str) {
        return str.replace(/(\r\n|\r|\n)+/g, '').replace(/\t/g, '').replace(/\s{2,}/g, ' ');
    }

    function normalize(data) {
        if (typeof data === 'string') {
            if ((/^[\s\n\t\r]+$/).test(data)) {
                return '';
            }
            return normalizeWhitespace(data);
        }
        if (Array.isArray(data)) {
            return data.map((val) => normalize(val));
        }
        return data;
    }

    function expectResult(data, expected) {
        expect(normalize(data)).to.deep.equal(expected);
    }

    it('should interpolate a value', () => {
        const tpl = stache('Hello {{ value }}!');

        const result = tpl({
            value: 'World'
        });

        expectResult(result, [
            ['Hello ', '!'],
            ['World']
        ]);
    });

    it('should support leading and trailing spaces within delimiters', () => {
        const tpl = stache('Hello {{ value  }}!');

        const result = tpl({
            value: 'World'
        });

        expectResult(result, [
            ['Hello ', '!'],
            ['World']
        ]);
    });

    it('should support multiline templates', () => {
        const tpl = stache(`
            {{foo}}
        `);

        const result = tpl({
            foo: 'bar'
        });

        expectResult(result, [
            ['', ''],
            ['bar']
        ]);
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
        expectResult(result1, [
            ['', ''],
            ['ABC']
        ]);

        const result2 = tpl({
            foo: false,
            bar: 'abc',
            baz: 5,
            qux: 2,
            add: (val) => val + 10
        });
        expectResult(result2, [
            ['', ''],
            [17]
        ]);
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
        expectResult(result1, [
            ['', ''],
            ['baz']
        ]);

        const result2 = tpl({
            foo: false,
            bar: 'baz'
        });
        expectResult(result2, [
            [''],
            []
        ]);
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
        expectResult(result1, [
            ['', ''],
            ['abc']
        ]);

        const result2 = tpl({
            foo: false,
            bar: 'abc',
            baz: 123
        });
        expectResult(result2, [
            ['', ''],
            [123]
        ]);
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
        expectResult(result1, [
            ['', ''],
            ['abc']
        ]);

        const result2 = tpl({
            foo: false,
            bar: 'abc',
            baz: 5,
            qux: true
        });
        expectResult(result2, [
            ['', ''],
            [15]
        ]);

        const result3 = tpl({
            foo: false,
            bar: 'abc',
            baz: 15,
            qux: true
        });
        expectResult(result3, [
            ['', ''],
            [true]
        ]);
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
        expectResult(result1, [
            [' empty '],
            []
        ]);

        const result2 = tpl({
            foo: true,
            bar: 10,
            baz: 20
        });
        expectResult(result2, [
            ['', ''],
            [10]
        ]);

        const result3 = tpl({
            foo: true,
            bar: 11,
            baz: 20
        });
        expectResult(result3, [
            ['', ''],
            [20]
        ]);
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
        expectResult(result1, [
            ['', ''],
            [100]
        ]);

        const result2 = tpl({
            foo: true,
            bar: 11,
            baz: 'fooo'
        });
        expectResult(result2, [
            ['', ''],
            [100]
        ]);

        const result3 = tpl({
            foo: true,
            bar: 20,
            baz: 'foo bar'
        });
        expectResult(result3, [
            ['', ''],
            [100]
        ]);

        const result4 = tpl({
            foo: false,
            bar: 10,
            baz: 'foo'
        });
        expectResult(result4, [
            ['', ''],
            [100]
        ]);

        const result5 = tpl({
            foo: true,
            bar: 5,
            baz: 'foo'
        });
        expectResult(result5, [
            ['', ''],
            [200]
        ]);

        const result6 = tpl({
            foo: true,
            bar: 10,
            baz: 'fo'
        });
        expectResult(result6, [
            ['', ''],
            [200]
        ]);
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
        expectResult(result1, [
            ['', '', '', ''],
            [1, 2, 3]
        ]);

        const result2 = tpl({
            items: ['a', 'b', 'c', 'd', 'e']
        });
        expectResult(result2, [
            ['', '', '', '', '', ''],
            ['a', 'b', 'c', 'd', 'e']
        ]);
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
        expectResult(result1, [
            ['', ': ', '', ': ', '', ': ', ''],
            [0, 10, 1, 20, 2, 30]
        ]);

        const result2 = tpl({
            items: ['a', 'b', 'c', 'd', 'e']
        });
        expectResult(result2, [
            ['', ': ', '', ': ', '', ': ', '', ': ', '', ': ', ''],
            [0, 'a', 1, 'b', 2, 'c', 3, 'd', 4, 'e']
        ]);
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
        expectResult(result1, [
            ['', '', '', '', '', ''],
            [1, 2, 3, 10, 20]
        ]);

        const result2 = tpl({
            items: [
                ['a', 'b', 'c', 'd', 'e'],
                ['f', 'g']
            ]
        });
        expectResult(result2, [
            ['', '', '', '', '', '', '', ''],
            ['a', 'b', 'c', 'd', 'e', 'f', 'g']
        ]);
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
        expectResult(result1, [
            ['', ': ', '', ': ', '', ': ', '', ': ', ''],
            ['foo', 1, 'bar', 2, 'baz', 10, 'qux', 50]
        ]);

        const result2 = tpl({
            data: {
                a: 'foo',
                b: 'bar',
                c: 'baz'
            }
        });
        expectResult(result2, [
            ['', ': ', '', ': ', '', ': ', ''],
            ['a', 'foo', 'b', 'bar', 'c', 'baz']
        ]);
    });

    it('should support a combination of each and if directives', () => {
        const tpl = stache(`
            {{each items as item}}
                {{if item}}
                    {{'foo'}}
                {{else}}
                    {{'bar'}}
                {{/if}}
            {{/each}}
        `);

        const result1 = tpl({
            items: [
                true,
                false,
                0,
                ''
            ]
        });
        expectResult(result1, [
            ['', '', '', '', ''],
            ['foo', 'bar', 'bar', 'bar']
        ]);

        const result2 = tpl({
            items: [
                NaN,
                ' ',
                null,
                undefined,
                1
            ]
        });
        expectResult(result2, [
            ['', '', '', '', '', ''],
            ['bar', 'foo', 'bar', 'bar', 'foo']
        ]);
    });
});
