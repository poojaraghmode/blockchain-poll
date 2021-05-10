export interface Poll extends PollForm{
  id: number; //5
  results: number[]; //[0, 0, 0, 0, 5, 7, 2]
  voted: boolean; //true
}

export interface PollForm{
  question: string; //Which days of the week you like the most?
  options: string[]; // ["Monday", "Tuesday", "wednesday" ... ]
  image: string; //https://image.png
}

export interface PollVote{
  id: number;
  vote: number;
}

export interface Voter{
  id: string; // 0x.....
  voted: number[]; // [5]
}
