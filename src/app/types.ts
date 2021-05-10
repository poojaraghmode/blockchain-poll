export interface Poll{
  id: number; //5
  results: number[]; //[0, 0, 0, 0, 5, 7, 2]
  question: string; //Which days of the week you like the most?
  options: string[]; // ["Monday", "Tuesday", "wednesday" ... ]
  image: string; //https://image.png
  voted: boolean; //true
}

export interface Voter{
  id: string; // 0x.....
  voted: number[]; // [5]
}
