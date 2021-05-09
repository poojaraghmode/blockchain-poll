import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showForm = false;

  polls = [
    {
      question: "Do you like Dogs or Cats?",
      image: 'https://images.pexels.com/photos/46024/pexels-photo-46024.jpeg',
      votes: [7,5,1],
      voted: true,
    },
    {
      question: "Whats your fav day?",
      image: 'https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg',
      votes: [0,2,7],
      voted: true,
    },
  ];
}
