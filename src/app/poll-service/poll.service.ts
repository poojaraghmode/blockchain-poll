import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Poll, PollForm, PollVote } from '../types';
import { Web3Service } from '../blockchain/web3.service';
import { fromAscii } from 'web3-utils';

@Injectable({
  providedIn: 'root',
})
export class PollService {
  constructor(private web3: Web3Service) {}

  async getPolls(): Promise<Poll[]>{
    const polls: Poll[] = [];

    const totalPolls = await this.web3.call('getTotalPolls');

    const acc = await this.web3.getAccount();
    const voter = await this.web3.call('getVoter', acc);

    for(let i = 0; i < totalPolls; i++){
      const poll = await this.web3.call("getPoll", i);
      polls.push(poll);
    }

    return polls;

  }

  vote(pollID: number, voteNumber: number) {
    this.web3.executeTransaction('vote', pollID, voteNumber);
  }

  createPoll(poll: PollForm) {
    this.web3.executeTransaction(
      'createPoll',
      poll.question,
      poll.image || '',
      poll.options.map((option) => fromAscii(option))
    );
  }
}
