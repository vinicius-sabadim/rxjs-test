// This is useful to decrease the amount of imported code to js.
// import { Observable } from 'rxjs/Observable'
// import 'rxjs/add/operator/map'
// import 'rxjs/add/operator/filter'

import { Observable } from 'rxjs'

// This is the easy way to create a observable.
// let numbers = [1, 5, 10]
// let source = Observable.from(numbers)
// let source = Observable.create((observer) => {
//   for (let n of numbers) observer.next(n)
//   observer.complete()
// })

// A new way to create a observable.
// let source = Observable
//   .create((observer) => {
//     let index = 0
//     let produceValue = () => {
//       observer.next(numbers[index++])
//       if (index < numbers.length) setTimeout(produceValue, 500)
//       else observer.complete()
//     }
//     produceValue()
//   })
//   .map((n) => n * 3)
//   .filter((n) => n > 3)

// Creating a observable to stream mouse events.
// let source = Observable
//   .fromEvent(document, 'mousemove')
//   .map((e: MouseEvent) => {
//     return {
//       x: e.clientX,
//       y: e.clientY
//     }
//   })
//   .filter((value) => value.x < 500)
//   .delay(300)
//
// let circle = document.getElementById('circle')
// function onNext(value) {
//   circle.style.left = value.x
//   circle.style.top = value.y
// }
//
// source.subscribe(
//   onNext,
//   (error) => console.log(`error: ${ error }`),
//   () => console.log('complete')
// )

// class MyObserver {
//   next(value) {
//     console.log(`value: ${ value }`)
//   }
//
//   error(e) {
//     console.log(`error: ${ e }`)
//   }
//
//   complete() {
//     console.log('complete')
//   }
// }
//
// source.subscribe(new MyObserver())

// Load movies when page starts and when button clicked.
import { load, loadWithFetch } from './loader'

let output = document.getElementById('output')
let button = document.getElementById('button')

function renderMovies(movies) {
  movies.forEach((movie) => {
    let div = document.createElement('div')
    div.innerText = movie.title
    output.appendChild(div)
  })
}

let subscription = load('movies.json').subscribe(renderMovies)
subscription.unsubscribe()

let click = Observable.fromEvent(button, 'click')
click
  .flatMap((e) => loadWithFetch('moviess.json'))
  .subscribe(
    renderMovies,
    (error) => console.log(`error: ${ error }`),
    () => console.log('complete')
  )

// An example of error handler.
// let source = Observable
//   .merge(
//     Observable.of(1),
//     Observable.from([2, 3, 4]),
//     Observable.throw(new Error('Stop!')),
//     Observable.of(5)
//   )
//   .catch((e) => {
//     console.log(`Error: ${ e }`)
//     return Observable.of(10)
//   })
//
// source.subscribe(
//   (value) => console.log(`value: ${ value }`),
//   (error) => console.log(`error: ${ error }`)
// )
