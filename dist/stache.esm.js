/*! @ryanmorr/stache v0.1.0 | https://github.com/ryanmorr/stache */"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;var NEW_LINES_RE=/(\r\n|\r|\n)/g,TEMPLATE_RE=/{{\s*(.+?)\s*}}/g,EACH_RE=/^each (.*) as (.*)$/,IF_RE=/^if (.*)$/,ELSE_IF_RE=/^else if (.*)$/;function stache(a){var b;return function(c){return b||(b=new Function("\n                let _strings = [], _sequence = [], _values = [];\n                let ".concat(Object.keys(c).map(function(a){return"".concat(a," = this['").concat(a,"']")}).join(","),";\n                _sequence.push('").concat(a.trim().replace(NEW_LINES_RE,"\\n").replace(TEMPLATE_RE,function(a,b){if(b.startsWith("each")){var c=EACH_RE.exec(b);if(c)return"'); (".concat(c[1],").forEach((").concat(c[2],") => { _sequence.push('")}else if(b.startsWith("if")){var d=IF_RE.exec(b);if(d)return"'); if (".concat(d[1],") { _sequence.push('")}else if(b.startsWith("else if")){var e=ELSE_IF_RE.exec(b);if(e)return"'); } else if (".concat(e[1],") { _sequence.push('")}else{if("else"===b)return"'); } else { _sequence.push('";if("/each"===b)return"'); }); _sequence.push('";if("/if"===b)return"'); } _sequence.push('"}return"'); _strings.push(_sequence.join('')); _sequence = []; _values.push(".concat(b,"); _sequence.push('")}),"');\n                _strings.push(_sequence.join(''));\n                return [_strings, _values];\n            "))),b.call(c)}}var _default=stache;exports["default"]=_default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhY2hlLmVzbS5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL3N0YWNoZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBORVdfTElORVNfUkUgPSAvKFxcclxcbnxcXHJ8XFxuKS9nO1xyXG5jb25zdCBURU1QTEFURV9SRSA9IC97e1xccyooLis/KVxccyp9fS9nO1xyXG5jb25zdCBFQUNIX1JFID0gL15lYWNoICguKikgYXMgKC4qKSQvO1xyXG5jb25zdCBJRl9SRSA9IC9eaWYgKC4qKSQvO1xyXG5jb25zdCBFTFNFX0lGX1JFID0gL15lbHNlIGlmICguKikkLztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN0YWNoZShzb3VyY2UpIHtcclxuICAgIGxldCB0cGw7XHJcbiAgICByZXR1cm4gKGRhdGEpID0+IHtcclxuXHRcdGlmICghdHBsKSB7XHJcbiAgICAgICAgICAgIHRwbCA9IG5ldyBGdW5jdGlvbihgXHJcbiAgICAgICAgICAgICAgICBsZXQgX3N0cmluZ3MgPSBbXSwgX3NlcXVlbmNlID0gW10sIF92YWx1ZXMgPSBbXTtcclxuICAgICAgICAgICAgICAgIGxldCAke09iamVjdC5rZXlzKGRhdGEpLm1hcCgoa2V5KSA9PiBgJHtrZXl9ID0gdGhpc1snJHtrZXl9J11gKS5qb2luKCcsJyl9O1xyXG4gICAgICAgICAgICAgICAgX3NlcXVlbmNlLnB1c2goJyR7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlLnRyaW0oKS5yZXBsYWNlKE5FV19MSU5FU19SRSwgJ1xcXFxuJykucmVwbGFjZShURU1QTEFURV9SRSwgKGFsbCwgY29kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29kZS5zdGFydHNXaXRoKCdlYWNoJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsb29wID0gRUFDSF9SRS5leGVjKGNvZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvb3ApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCcpOyAoJHtsb29wWzFdfSkuZm9yRWFjaCgoJHtsb29wWzJdfSkgPT4geyBfc2VxdWVuY2UucHVzaCgnYDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb2RlLnN0YXJ0c1dpdGgoJ2lmJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb25kaXRpb25hbCA9IChJRl9SRSkuZXhlYyhjb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb25kaXRpb25hbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgJyk7IGlmICgke2NvbmRpdGlvbmFsWzFdfSkgeyBfc2VxdWVuY2UucHVzaCgnYDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb2RlLnN0YXJ0c1dpdGgoJ2Vsc2UgaWYnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbmRpdGlvbmFsRWxzZSA9IChFTFNFX0lGX1JFKS5leGVjKGNvZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmRpdGlvbmFsRWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgJyk7IH0gZWxzZSBpZiAoJHtjb25kaXRpb25hbEVsc2VbMV19KSB7IF9zZXF1ZW5jZS5wdXNoKCdgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvZGUgPT09ICdlbHNlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAnKTsgfSBlbHNlIHsgX3NlcXVlbmNlLnB1c2goJ2A7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY29kZSA9PT0gJy9lYWNoJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAnKTsgfSk7IF9zZXF1ZW5jZS5wdXNoKCdgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvZGUgPT09ICcvaWYnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCcpOyB9IF9zZXF1ZW5jZS5wdXNoKCdgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgJyk7IF9zdHJpbmdzLnB1c2goX3NlcXVlbmNlLmpvaW4oJycpKTsgX3NlcXVlbmNlID0gW107IF92YWx1ZXMucHVzaCgke2NvZGV9KTsgX3NlcXVlbmNlLnB1c2goJ2A7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0nKTtcclxuICAgICAgICAgICAgICAgIF9zdHJpbmdzLnB1c2goX3NlcXVlbmNlLmpvaW4oJycpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbX3N0cmluZ3MsIF92YWx1ZXNdO1xyXG4gICAgICAgICAgICBgKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0cGwuY2FsbChkYXRhKTtcclxuXHR9O1xyXG59XHJcbiJdLCJuYW1lcyI6WyJORVdfTElORVNfUkUiLCJURU1QTEFURV9SRSIsIkVBQ0hfUkUiLCJJRl9SRSIsIkVMU0VfSUZfUkUiLCJzdGFjaGUiLCJzb3VyY2UiLCJ0cGwiLCJkYXRhIiwiRnVuY3Rpb24iLCJPYmplY3QiLCJrZXlzIiwibWFwIiwia2V5Iiwiam9pbiIsInRyaW0iLCJyZXBsYWNlIiwiYWxsIiwiY29kZSIsInN0YXJ0c1dpdGgiLCJsb29wIiwiZXhlYyIsImNvbmRpdGlvbmFsIiwiY29uZGl0aW9uYWxFbHNlIiwiY2FsbCJdLCJtYXBwaW5ncyI6Im9LQUFNQSxDQUFBQSxZQUFZLENBQUcsZ0JBQ2ZDLFdBQVcsQ0FBRyxtQkFDZEMsT0FBTyxDQUFHLHNCQUNWQyxLQUFLLENBQUcsWUFDUkMsVUFBVSxDQUFHLGlCQUVKLFFBQVNDLENBQUFBLE1BQVQsQ0FBZ0JDLENBQWhCLENBQXdCLElBQy9CQyxDQUFBQSxRQUNHLFVBQUNDLENBQUQsQ0FBVSxPQUNkRCxDQUFBQSxJQUNLQSxDQUFHLENBQUcsR0FBSUUsQ0FBQUEsUUFBSixtR0FFSUMsTUFBTSxDQUFDQyxJQUFQRCxDQUFZRixDQUFaRSxFQUFrQkUsR0FBbEJGLENBQXNCLFNBQUNHLENBQUQsa0JBQVlBLHNCQUFlQSxPQUFqRCxDQUFBSCxFQUEwREksSUFBMURKLENBQStELEdBQS9EQSxnREFFRkosQ0FBTSxDQUFDUyxJQUFQVCxHQUFjVSxPQUFkVixDQUFzQk4sWUFBdEJNLENBQW9DLEtBQXBDQSxFQUEyQ1UsT0FBM0NWLENBQW1ETCxXQUFuREssQ0FBZ0UsU0FBQ1csQ0FBRCxDQUFNQyxDQUFOLENBQWUsSUFDdkVBLENBQUksQ0FBQ0MsVUFBTEQsQ0FBZ0IsTUFBaEJBLEVBQXlCLElBQ3JCRSxDQUFBQSxDQUFJLENBQUdsQixPQUFPLENBQUNtQixJQUFSbkIsQ0FBYWdCLENBQWJoQixLQUNQa0IsdUJBQ2VBLENBQUksQ0FBQyxDQUFELHdCQUFpQkEsQ0FBSSxDQUFDLENBQUQsNEJBSGhELEtBS08sSUFBSUYsQ0FBSSxDQUFDQyxVQUFMRCxDQUFnQixJQUFoQkEsQ0FBSixDQUEyQixJQUMxQkksQ0FBQUEsQ0FBVyxDQUFJbkIsS0FBRCxDQUFRa0IsSUFBUGxCLENBQVllLENBQVpmLEtBQ2ZtQiwwQkFDa0JBLENBQVcsQ0FBQyxDQUFELHlCQUg5QixDQUFBLElBS0EsSUFBSUosQ0FBSSxDQUFDQyxVQUFMRCxDQUFnQixTQUFoQkEsQ0FBSixDQUFnQyxJQUMvQkssQ0FBQUEsQ0FBZSxDQUFJbkIsVUFBRCxDQUFhaUIsSUFBWmpCLENBQWlCYyxDQUFqQmQsS0FDbkJtQixpQ0FDeUJBLENBQWUsQ0FBQyxDQUFELHlCQUh6QyxDQUFBLEtBS0EsR0FBYSxNQUFUTCxHQUFBQSxDQUFKLHVDQUVBLEdBQWEsT0FBVEEsR0FBQUEsQ0FBSixrQ0FFQSxHQUFhLEtBQVRBLEdBQUFBLENBQUosK0JBVEEscUZBWXVFQSx3QkF2QmxGLENBQUFaLHVIQUpGLEdBa0NUQyxDQUFHLENBQUNpQixJQUFKakIsQ0FBU0MsQ0FBVEQsQ0FwQ0wifQ==
