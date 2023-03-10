import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <StockInfoBox></StockInfoBox>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

interface IStockProps {}

interface IStockState {
  inputSymbol: string;
  output: string;
}

interface PriceResponse {
  data: { price: number};
}


class StockInfoBox extends React.Component<IStockProps, IStockState> {
  constructor(props: IStockProps) {
    super(props);
    this.state = {
      inputSymbol: "",
      output: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({inputSymbol: event.target.value});
  }

  async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const res: PriceResponse = await axios.get('/api/quote', {
        params: { symbol: this.state.inputSymbol },
      });
      console.log(res);
      this.setState({
        output: `${this.state.inputSymbol}: $${String(res.data.price)}`,
      });
    } catch (error) {
      this.setState({ output: `Error: ${error}`});
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Stock Symbol:
            <input type="text" value={this.state.inputSymbol} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div>
          <p>{this.state.output}</p>
        </div>
      </div>
    );
  }
}

export default App;
