import React from "react";
import logo from "./logo.svg";
import "./frontend/css/main.css";

const COLORS = [
  "#f94144",
  "#f3722c",
  "#f8961e",
  "#f9c74f",
  "#90be6d",
  "#43aa8b",
  "#577590",
  "#2b2d42",
  "#007f5f",
  "#f25c54",
];
const JSON_DATA = "https://quotes-api.phuang.repl.co/api/quotes/quotes";
// "https://gist.githubusercontent.com/peter-huang/b7a704a48e712f9770a9f973a6c30421/raw/1560c8077b561c0ab977ae3b054241c85edfa87d/quotes.json";

class App extends React.Component {
  constructor(props) {
    super(props);
    const index = Math.floor(Math.random() * COLORS.length);
    this.state = {
      color: COLORS[index],
      data: [],
      dataItem: { quote: "", author: "" },
    };

    this.update = this.update.bind(this);
    document.body.style.backgroundColor = COLORS[index];
  }

  /* Listener to pass child data to be set into parent's state */
  update() {
    this.setState((state) => {
      const index = Math.floor(Math.random() * COLORS.length);
      document.body.style.backgroundColor = COLORS[index];

      return {
        color: COLORS[index],
        dataItem: this.state.data[
          Math.floor(Math.random() * this.state.data.length)
        ],
      };
    });
  }

  /* Fetch API once component is mounted into the virtual DOM */
  componentDidMount() {
    // fetch json data
    if (this.state.data.length == 0) {
      fetch(JSON_DATA)
        .then((response) => response.json())
        .then((data) => {
          const index = Math.floor(Math.random() * data["quotes"].length);

          this.setState({
            data: data["quotes"],
            dataItem: {
              quote: data["quotes"][index].quote,
              author: data["quotes"][index].author,
            },
          });
        });
    }
  }

  render() {
    let style = {
      backgroundColor: this.state.color,
    };

    return (
      <div class="container" style={style}>
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
            <QuoteComponent
              color={this.state.color}
              dataItem={this.state.dataItem}
              update={this.update}
            />
          </div>
        </div>
      </div>
    );
  }
}

/* Quote Child Component */
class QuoteComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: props.color,
      dataItem: props.dataItem,
      update: props.update,
    };
  }

  // Updates the state before rendering the component
  static getDerivedStateFromProps(props, state) {
    return {
      color: props.color,
      dataItem: props.dataItem,
    };
  }

  componentDidMount() {}

  render() {
    let style = {
      backgroundColor: this.state.color,
      outline: "none",
    };

    let quoteStyle = {
      color: this.state.color,
    };

    let url =
      'https://twitter.com/intent/tweet?text="' +
      encodeURIComponent(
        this.state.dataItem.quote + '" - ' + this.state.dataItem.author
      );

    return (
      <div id="quote-container">
        <div id="title" class="text-center">
          Random Quote Machine
        </div>
        <div id="quote-box">
          <div id="text">
            <i
              class="fa fa-quote-left"
              aria-hidden="true"
              style={quoteStyle}
            ></i>
            <span id="text-content" style={quoteStyle}>
              {" "}
              {this.state.dataItem.quote}{" "}
            </span>
            <i
              class="fa fa-quote-right"
              aria-hidden="true"
              style={quoteStyle}
            ></i>
          </div>

          <div id="author">
            <p class="text-right">
              <span>- </span>
              <span id="author-content">{this.state.dataItem.author}</span>
            </p>
          </div>

          <div
            id="controls"
            class="d-flex flex-row justify-content-between align-items-center"
          >
            <div class="control-item">
              <a
                href={url}
                target="_blank"
                id="tweet-quote"
                class="button"
                style={style}
              >
                <i class="fa fa-twitter" aria-hidden="true"></i>
              </a>
            </div>
            <div class="control-item">
              <button
                id="new-quote"
                class="button"
                style={style}
                onClick={this.state.update}
              >
                New Quote
              </button>
            </div>
          </div>
        </div>

        <div id="creator" class="text-center">
          by Peter Huang
        </div>
      </div>
    );
  }
}

export default App;
