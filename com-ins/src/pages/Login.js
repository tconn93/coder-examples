"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
nimport;
{
    useNavigate;
}
from;
'react-router-dom';
n;
nconst;
Login = function () { n; var _a = (0, react_1.useState)(''), email = _a[0], setEmail = _a[1]; n; var _b = (0, react_1.useState)(''), password = _b[0], setPassword = _b[1]; n; var _c = (0, react_1.useState)(''), error = _c[0], setError = _c[1]; n; var navigate = useNavigate(); n; n; var handleSubmit = function (e) { n; e.preventDefault(); n; if (password === 'demo123') {
    n;
    navigate('/');
    n;
}
else {
    n;
    setError('Password must be "demo123"');
    n;
} n; }; n; n; return (); n < div; className = "min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600" > ; n < div; className = "max-w-md w-full bg-white rounded-2xl shadow-2xl p-10" > ; n < h1; className = "text-4xl font-bold text-gray-800 mb-8 text-center" > MGA; Quote; Demo; h1 > ; n < h2; className = "text-xl text-gray-600 mb-8 text-center" > Login; to; continue ; h2 > ; n < form; onSubmit = { handleSubmit: handleSubmit }; className = "space-y-6" > ; n; n < label; className = "block text-sm font-semibold text-gray-700 mb-2" > Email; label > ; n < input; n; type = "email"; n; value = { email: email }; n; onChange = {}(e); setEmail(e.target.value); };
n;
className = "w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition";
n;
required;
n /  > ;
n;
div > ;
n;
n < label;
className = "block text-sm font-semibold text-gray-700 mb-2" > Password;
label > ;
n < input;
n;
type = "password";
n;
value = { password: password };
n;
onChange = {}(e);
setPassword(e.target.value);
n;
className = "w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition";
n;
required;
n /  > ;
n;
div > ;
n;
{
    error && <p className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-xl">{error}</p>;
}
n < button;
n;
type = "submit";
n;
className = "w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all shadow-lg";
n > ;
n;
Login;
n;
button > ;
n;
form > ;
n;
div > ;
n;
div > ;
n;
;
n;
;
n;
nexport;
Login;
n;
