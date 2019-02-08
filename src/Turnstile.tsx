import React, { Component } from "react";
import { Spinning } from "./components/Spinning";
import { State, MESSAGES } from "./models";

export default class Turnstile extends Component<any, State> {
  private readonly correctAmount: number;

  constructor(props: any) {
    super(props);

    this.state = {
      locked: true,
      message: MESSAGES.LOCKED,
      amount: 0,
      spinning: false,
      error: false
    };

    this.correctAmount = 3;
    this.insertCoin = this.insertCoin.bind(this);
    this.pass = this.pass.bind(this);
    this.break = this.break.bind(this);
    this.fix = this.fix.bind(this);
  }

  componentDidUpdate(): void {
    if (this.state.locked && this.state.amount >= this.correctAmount) {
      this.setState({ locked: false, message: MESSAGES.THANK_YOU });
    }
  }

  insertCoin(): void {
    this.setState(prevState => {
      return {
        amount: prevState.amount + 1
      };
    });
  }

  pass(): void {
    this.setState(
      {
        locked: true,
        amount: 0,
        spinning: true
      },
      () => {
        setTimeout(() => {
          this.setState({
            message: MESSAGES.LOCKED,
            spinning: false
          });
        }, 2000);
      }
    );
  }

  break(): void {
    this.setState({ error: true });
  }

  fix(): void {
    this.setState({
      error: false
    });
  }

  render() {
    const { message, amount, locked, spinning, error } = this.state;

    let errorMessage: object | null = null;
    if (error) {
      errorMessage = (
        <div className="error">
          <p>{MESSAGES.ERROR}</p>
          <button onClick={this.fix}>Fix</button>
        </div>
      );
    }

    return (
      <div className="app">
        <div>
          <h1>Turnstile state machine</h1>
          <h2>Subway fare: ${this.correctAmount}</h2>
          <p>{message}</p>
          <p>Amount of coins inserted: ${amount}</p>
          <div className="actions">
            <p>
              <button
                disabled={error}
                onClick={spinning ? this.break : this.insertCoin}
              >
                Insert a coin
              </button>
            </p>
            <p>
              <button disabled={locked || error} onClick={this.pass}>
                Walk - pass the turnstile
              </button>
            </p>
          </div>
          {spinning && <Spinning />}
          {errorMessage}
          <small>{JSON.stringify(this.state)}</small>
        </div>
      </div>
    );
  }
}
