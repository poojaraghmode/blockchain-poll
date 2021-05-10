import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { delay } from 'rxjs/operators'
import { Poll, PollForm, PollVote } from '../types';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor() { }

  getPolls(): Observable<Poll[]> {
    return of([
      {
        id: 1,
        question: "Do you like Dogs or Cats?",
        image: 'https://images.pexels.com/photos/46024/pexels-photo-46024.jpeg',
        options: ["Cats", "Dogs", "None"],
        results: [7,5,1],
        voted: true,
      },
      {
        id: 2,
        question: "Whats your fav day?",
        image: 'https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg',
        options: ["Monday", "Saturday", "Sunday"],
        results: [0,2,7],
        voted: false,
      },
    ]).pipe(delay(2000));
  }

  vote(pollID:number, voteNumber: number){
    console.log(pollID, voteNumber);
  }

  createPoll(poll: PollForm){
    console.log(poll);
  }
}
