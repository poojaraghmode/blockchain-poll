import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Poll, PollForm, PollVote } from '../types';
import { Web3Service } from '../blockchain/web3.service';
import { fromAscii, toAscii } from 'web3-utils';
import { normalize } from 'path';

@Injectable({
  providedIn: 'root',
})
export class PollService {
  constructor(private web3: Web3Service) {}

  async getPolls(): Promise<Poll[]> {
    const polls: Poll[] = [];

    const totalPolls = await this.web3.call('getTotalPolls');

    const acc = await this.web3.getAccount();
    const voter = await this.web3.call('getVoter', acc);
    const voterNormalized = this.normalizeVoter(voter);

    for (let i = 0; i < totalPolls; i++) {
      const pollRaw = await this.web3.call('getPoll', i);
      const pollNormalized = this.normalizePoll(pollRaw, voterNormalized);
      polls.push(pollNormalized);
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

  private normalizeVoter(_voter: any[][]) {
    return {
      id: _voter[0],
      votedIds: _voter[1].map((vote) => parseInt(vote)),
    };
  }

  private normalizePoll(
    pollRaw: any,
    voter: { id?: any[]; votedIds: any }
  ): Poll {
    return {
      id: parseInt(pollRaw[0]),
      question: pollRaw[1],
      image: pollRaw[2],
      results: pollRaw[3].map((vote: string) => parseInt(vote)),
      options: pollRaw[4].map((option: string) => toAscii(option).replace(/\u0000/g, '')),
      voted:
        voter.votedIds.length &&
        voter.votedIds.find(
          (votedId: number) => votedId === parseInt(pollRaw[0])
        ) != undefined,
    };
  }
}
