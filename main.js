"use strict";
const rxjs_1 = require("rxjs");
const loader_1 = require("./loader");
let output = document.getElementById('output');
let button = document.getElementById('button');
function renderMovies(movies) {
    movies.forEach((movie) => {
        let div = document.createElement('div');
        div.innerText = movie.title;
        output.appendChild(div);
    });
}
let subscription = loader_1.load('movies.json').subscribe(renderMovies);
subscription.unsubscribe();
let click = rxjs_1.Observable.fromEvent(button, 'click');
click
    .flatMap((e) => loader_1.loadWithFetch('moviess.json'))
    .subscribe(renderMovies, (error) => console.log(`error: ${error}`), () => console.log('complete'));
//# sourceMappingURL=main.js.map