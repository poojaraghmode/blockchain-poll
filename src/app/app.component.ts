import { Component } from '@angular/core';
import { Poll } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showForm = false;
  activePoll:Poll | null;

  polls: Poll[] = [
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
  ];

  setActivePoll(poll:Poll){
    this.activePoll=null;

    setTimeout(() => {
      this.activePoll=poll;
    }, 100);
  }
}
