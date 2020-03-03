export default function stache(source) {
    let tpl;
    source = source.replace(/\r?\n/g, '\\n').replace(/{{\s*(.+?)\s*}}/g, (all, code) => `',(${code}),'`);
    return (data) => {
		if (!tpl) {
            tpl = new Function(`
                const _ = [], ${Object.keys(data).map((key) => `${key} = this['${key}']`).join(',')};
                _.push('${source}');
                return _.join('')
            `);
		}
		return tpl.call(data);
	};
}
