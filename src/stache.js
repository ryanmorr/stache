const NEW_LINES_RE = /(\r\n|\r|\n)/g;
const TEMPLATE_RE = /{{\s*(.+?)\s*}}/g;
const EACH_RE = /^each\s+(.*)\s+as\s+(.*)$/;
const IF_RE = /^if\s+(.*)$/;
const ELSE_IF_RE = /^else if\s+(.*)$/;

export default function stache(source) {
    let tpl;
    return (data) => {
		if (!tpl) {
            tpl = new Function('_data', `
                let _strings = [], _sequence = [], _values = [];
                let ${Object.keys(data).map((key) => `${key} = _data['${key}']`).join(',')};
                _sequence.push('${
                    source.trim().replace(NEW_LINES_RE, '\\n').replace(TEMPLATE_RE, (all, code) => {
                        if (code.startsWith('each')) {
                            let loop = EACH_RE.exec(code);
                            if (loop) {
                                return `'); (${loop[1]}).forEach((${loop[2]}) => { _sequence.push('`;
                            }
                        } else if (code.startsWith('if')) {
                            let conditional = (IF_RE).exec(code);
                            if (conditional) {
                                return `'); if (${conditional[1]}) { _sequence.push('`;
                            }
                        } else if (code.startsWith('else if')) {
                            let conditionalElse = (ELSE_IF_RE).exec(code);
                            if (conditionalElse) {
                                return `'); } else if (${conditionalElse[1]}) { _sequence.push('`;
                            }
                        } else if (code === 'else') {
                            return `'); } else { _sequence.push('`; // eslint-disable-line quotes
                        } else if (code === '/each') {
                            return `'); }); _sequence.push('`; // eslint-disable-line quotes
                        } else if (code === '/if') {
                            return `'); } _sequence.push('`; // eslint-disable-line quotes
                        }
                        return `'); _strings.push(_sequence.join('')); _sequence = []; _values.push(${code}); _sequence.push('`;
                    })
                }');
                _strings.push(_sequence.join(''));
                return [_strings, _values];
            `);
		}
		return tpl(data);
	};
}
