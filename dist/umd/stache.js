/*! @ryanmorr/stache v0.1.1 | https://github.com/ryanmorr/stache */
!function(e,s){"object"==typeof exports&&"undefined"!=typeof module?module.exports=s():"function"==typeof define&&define.amd?define(s):(e="undefined"!=typeof globalThis?globalThis:e||self).stache=s()}(this,(function(){"use strict";const e=/(\r\n|\r|\n)/g,s=/{{\s*(.+?)\s*}}/g,n=/^each\s+(.*)\s+as\s+(.*)$/,t=/^if\s+(.*)$/,u=/^else if\s+(.*)$/;return function(i){let r;return c=>(r||(r=new Function("_data",`\n                let _strings = [], _sequence = [], _values = [];\n                let ${Object.keys(c).map((e=>`${e} = _data['${e}']`)).join(",")};\n                _sequence.push('${i.trim().replace(e,"\\n").replace(s,((e,s)=>{if(s.startsWith("each")){let e=n.exec(s);if(e)return`'); (${e[1]}).forEach((${e[2]}) => { _sequence.push('`}else if(s.startsWith("if")){let e=t.exec(s);if(e)return`'); if (${e[1]}) { _sequence.push('`}else if(s.startsWith("else if")){let e=u.exec(s);if(e)return`'); } else if (${e[1]}) { _sequence.push('`}else{if("else"===s)return"'); } else { _sequence.push('";if("/each"===s)return"'); }); _sequence.push('";if("/if"===s)return"'); } _sequence.push('"}return`'); _strings.push(_sequence.join('')); _sequence = []; _values.push(${s}); _sequence.push('`}))}');\n                _strings.push(_sequence.join(''));\n                return [_strings, _values];\n            `)),r(c))}}));