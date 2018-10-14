import React from 'react';
import './App.css';
import {
  Container, Jumbotron, Row, Col, Button,
} from 'reactstrap';

/* ================================
libs: reactjs, reactjs-dom, react-bootstrap
================================= */

// ==== functional components ====
export const Footer = () => (
  <Row>
    <Row className="col-sm created-by">
      Created by &nbsp;
      <a href="https://github.com/mkeeneth">Matt Keeneth</a>
    </Row>
  </Row>
);

export const QuoteText = props => (
  <Row>
    <p id="text">{props.quoteText}</p>
  </Row>
);

export const QuoteAuthor = props => (
  <Row>
    <Col />
    <Col>
      <p id="author">
-
        {props.quoteAuthor}
      </p>
    </Col>
  </Row>
);

export const Controls = props => (
  <Row>
    <Col>
      {/*  https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=%22You%20can%20never%20cross%20the%20ocean%20until%20you%20have%20the%20courage%20to%20lose%20sight%20of%20the%20shore.%22%20Christopher%20Columbus */}
      <a
        id="tweet-quote"
        className="btn btn-primary"
        href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${
          props.quoteText
        }%20-${props.quoteAuthor}`}
        role="button"
      >
        Tweet It!
      </a>
    </Col>
    <Col>
      <Button variant="primary" id="new-quote" onClick={props.nextQuote}>
        New Quote
      </Button>
    </Col>
  </Row>
);

// ==== 'smart' components ====
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quoteText: '',
      quoteAuthor: '',
      currentQuoteNum: -1,
      isLoaded: false,
      error: false,
      quotes: [],
    };

    this.nextQuote = this.nextQuote.bind(this);
  }

  componentDidMount() {
    fetch('./quotes.json')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            quotes: result,
          });
          // load a random quote!
          this.nextQuote();
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        },
      );
  }

  nextQuoteClick(e) {
    e.preventDefault();
    this.nextQuote();
  }

  nextQuote() {
    const quoteCount = this.state.quotes.length;
    let randomQuoteNum = Math.floor(Math.random() * quoteCount);
    if (randomQuoteNum === this.state.currentQuoteNum) {
      // get another..
      do {
        randomQuoteNum = Math.floor(Math.random() * quoteCount);
      } while (randomQuoteNum === this.state.currentQuoteNum);
    }

    this.setState({
      quoteText: this.state.quotes[randomQuoteNum].text,
      quoteAuthor: this.state.quotes[randomQuoteNum].author,
      currentQuoteNum: randomQuoteNum,
    });
  }

  render() {
    return (
      <Container id="quote-box">
        <Jumbotron>
          <QuoteText quoteText={this.state.quoteText} />
          <QuoteAuthor quoteAuthor={this.state.quoteAuthor} />
          <Controls
            nextQuote={this.nextQuote}
            quoteText={this.state.quoteText}
            quoteAuthor={this.state.quoteAuthor}
          />
        </Jumbotron>
        <Footer />
      </Container>
    );
  }
}

// use in codepen
// ReactDOM.render(<App />, document.getElementById('root'));

// dont use in codepen
export default App;
