import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { from } from 'rxjs';

const contractABI = require('./contractABI.json');
declare var window: any;
@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  private web3: Web3;
  private contract: Contract;
  private contractAddress = '0x260a020e0aE9CF441CE87BDa796d7365F16928BD';

  constructor() {
    if (window.web3) {
      this.web3 = new Web3(window.ethereum);
      this.contract = new this.web3.eth.Contract(
        contractABI,
        this.contractAddress
      );

      window.ethereum.enable().catch((error: any) => {
        console.log(error);
      });
    } else {
      console.warn('Metamask not found. Please Install or Enable Metamask!');
    }
  }

  getAccount(): Promise<string> {
    return this.web3.eth.getAccounts().then((accounts) => accounts[0] || '');
  }

  async executeTransaction(fnName: string, ...args: any): Promise<void> {
    const acc = await this.getAccount();
    this.contract.methods[fnName](...args).send({ from: acc });
  }

  async call(fnName: string, ...args: any) {
    const acc = await this.getAccount();
    return this.contract.methods[fnName](...args).call({ from: acc });
  }
}
