[33mcommit 0bdde07de755c11e576e7720cc2b8d739d74baa8[m[33m ([m[1;36mHEAD -> [m[1;32mtesting[m[33m, [m[1;31morigin/master[m[33m, [m[1;32mmaster[m[33m)[m
Author: adam <adambarth611@gmail.com>
Date:   Sun Jun 30 15:41:55 2019 -0500

    Completed basic layout of dashboard and added web socket functionality to it

[1mdiff --git a/app.js b/app.js[m
[1mindex 8ef59a5..b15f392 100644[m
[1m--- a/app.js[m
[1m+++ b/app.js[m
[36m@@ -2,20 +2,31 @@[m [mconst express = require('express');[m
 const bodyParser = require('body-parser');[m
 const path = require('path');[m
 const userRoutes = require('./server/routes/user');[m
[32m+[m[32m// const dashboardRoutes = require('./server/routes/dashboard');[m
 [m
 var app = express();[m
[32m+[m[32mvar server = require('http').createServer(app);[m
[32m+[m[32mvar io = require('socket.io')(server);[m
[32m+[m
[32m+[m[32mio.on('connection', function(socket) {[m
[32m+[m[32m  console.log('hello, you are connected');[m
[32m+[m[32m  socket.on('input', (inputUser) => {[m
[32m+[m[32m    console.log(inputUser);[m
[32m+[m[32m    socket.broadcast.emit("message", inputUser)})[m
[32m+[m[32m})[m
 [m
 app.use(bodyParser.json());[m
 app.use(bodyParser.urlencoded({extended:false}));[m
 app.use(express.static(__dirname + '/client/dist'));[m
 [m
 app.use('/user', userRoutes);[m
[32m+[m[32m// app.use('/dashboard', dashboardRoutes);[m
 [m
 [m
 app.get('*', function(req,res) {[m
   res.sendFile(path.join(__dirname, '/client/dist/index.html'))[m
 });[m
 [m
[31m-app.listen(3000, () => {[m
[32m+[m[32mserver.listen(3000, () => {[m
   console.log("You are listening on port 3000")[m
 })[m
\ No newline at end of file[m
[1mdiff --git a/client/dist/bundle.js b/client/dist/bundle.js[m
[1mindex a7cfe56..f1d8e11 100644[m
[1m--- a/client/dist/bundle.js[m
[1m+++ b/client/dist/bundle.js[m
[36m@@ -1,4 +1,4 @@[m
[31m-!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=73)}([function(e,t,n){var r=n(4);e.exports=n(43)(r.isElement,!0)},function(e,t,n){"use strict";e.exports=n(34)},function(e,t,n){var r;[m
[32m+[m[32m!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=221)}([function(e,t,n){var r=n(4);e.exports=n(43)(r.isElement,!0)},function(e,t,n){"use strict";e.exports=n(34)},function(e,t,n){var r;[m
 /*![m
   Copyright (c) 2017 Jed Watson.[m
   Lic