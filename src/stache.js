const NEW_LINES_RE = /(\r\n|\r|\n)/g;
const TEMPLATE_RE = /{{\s*(.+?)\s*}}/g;
const EACH_RE = /^each (.*) as (.*)$/;
const IF_RE = /^if (.*)$/;
const ELSE_IF_RE = /^else if (.*)$/;

function parse(source) {
    return source.replace(NEW_LINES_RE, '\\n').replace(TEMPLATE_RE, (all, code) => {
        if (code.startsWith('each')) {
			let loop = EACH_RE.exec(code);
			if (loop) {
				return `'); (${loop[1]}).forEach((${loop[2]}) => { _.push('`;
			}
		} else if (code.startsWith('if')) {
			let conditional = (IF_RE).exec(code);
			if (conditional) {
				return `'); if (${conditional[1]}) { _.push('`;
			}
		} else if (code.startsWith('else if')) {
			let conditionalElse = (ELSE_IF_RE).exec(code);
			if (conditionalElse) {
				return `'); } else if (${conditionalElse[1]}) { _.push('`;
			}
        } else if (code === 'else') {
            return `'); } else { _.push('`;
        } else if (code === '/each') {
			return `'); }); _.push('`;
		} else if (code === '/if') {
			return `'); } _.push('`;
        }
        return `',(${code}),'`;
    });
}

export default function stache(source) {
    let tpl;
    return (data) => {
		if (!tpl) {
            tpl = new Function(`
                const _ = [], ${Object.keys(data).map((key) => `${key} = this['${key}']`).join(',')};
                _.push('${parse(source)}');
                return _.join('')
            `);
		}
		return tpl.call(data);
	};
}
