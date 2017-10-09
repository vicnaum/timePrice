"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Ticker = function (_React$Component) {
  _inherits(Ticker, _React$Component);

  function Ticker() {
    _classCallCheck(this, Ticker);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Ticker.prototype.render = function render() {
    return React.createElement(
      "h1",
      null,
      parseFloat(Math.round(this.props.counter) / 100).toFixed(2),
      " ",
      this.props.currency
    );
  };

  return Ticker;
}(React.Component);

var MonthlyInput = function (_React$Component2) {
  _inherits(MonthlyInput, _React$Component2);

  function MonthlyInput(props) {
    _classCallCheck(this, MonthlyInput);

    var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

    _this2.handleChange = _this2.handleChange.bind(_this2);
    return _this2;
  }

  MonthlyInput.prototype.handleChange = function handleChange(e, values) {
    var formattedValue = values.formattedValue;
    var value = values.value;

    this.props.onMonthlyChange(value);
  };

  MonthlyInput.prototype.render = function render() {
    return React.createElement(NumberFormat, { thousandSeparator: true, thousandSeparator: ' ', value: this.props.monthly, onChange: this.handleChange });
  };

  return MonthlyInput;
}(React.Component);

var CurrencyInput = function (_React$Component3) {
  _inherits(CurrencyInput, _React$Component3);

  function CurrencyInput(props) {
    _classCallCheck(this, CurrencyInput);

    var _this3 = _possibleConstructorReturn(this, _React$Component3.call(this, props));

    _this3.handleChange = _this3.handleChange.bind(_this3);
    return _this3;
  }

  CurrencyInput.prototype.handleChange = function handleChange(e) {
    this.props.onCurrencyChange(e.target.value);
  };

  CurrencyInput.prototype.render = function render() {
    return React.createElement("input", { type: "text", size: "5", value: this.props.currency, onChange: this.handleChange });
  };

  return CurrencyInput;
}(React.Component);

var ResetButton = function (_React$Component4) {
  _inherits(ResetButton, _React$Component4);

  function ResetButton(props) {
    _classCallCheck(this, ResetButton);

    var _this4 = _possibleConstructorReturn(this, _React$Component4.call(this, props));

    _this4.handleClick = _this4.handleClick.bind(_this4);
    return _this4;
  }

  ResetButton.prototype.handleClick = function handleClick(e) {
    this.props.onClick();
    e.preventDefault();
  };

  ResetButton.prototype.render = function render() {
    return React.createElement(
      "a",
      { "class": "waves-effect waves-light btn", onClick: this.handleClick },
      "Reset"
    );
  };

  return ResetButton;
}(React.Component);

var App = function (_React$Component5) {
  _inherits(App, _React$Component5);

  function App(props) {
    _classCallCheck(this, App);

    var _this5 = _possibleConstructorReturn(this, _React$Component5.call(this, props));

    _this5.state = { counter: 0, currency: "$", monthly: 7500, pow: 1 };
    var pow = Math.pow(10, _this5.state.monthly.length - 6);
    _this5.setState({ pow: pow });
    _this5.incr = _this5.state.monthly * 100 / 30.4 / 24 / 60 / 60;
    _this5.handleReset = _this5.handleReset.bind(_this5);
    _this5.handleCurrencyChange = _this5.handleCurrencyChange.bind(_this5);
    _this5.handleMonthlyChange = _this5.handleMonthlyChange.bind(_this5);
    return _this5;
  }

  App.prototype.componentDidMount = function componentDidMount() {
    var _this6 = this;

    this.timerID = setInterval(function () {
      return _this6.tick();
    }, 1000 / this.incr);
  };

  App.prototype.componentWillUnmount = function componentWillUnmount() {
    clearInterval(this.timerID);
  };

  App.prototype.handleReset = function handleReset() {
    this.setState({ counter: 0 });
  };

  App.prototype.handleCurrencyChange = function handleCurrencyChange(currency) {
    this.setState({ currency: currency });
  };

  App.prototype.handleMonthlyChange = function handleMonthlyChange(monthly) {
    var _this7 = this;

    this.setState({ monthly: monthly });
    var pow = monthly.length < 7 ? 1 : Math.pow(10, monthly.length - 7);
    this.setState({ pow: pow });
    this.incr = monthly * 100 / 30.4 / 24 / 60 / 60 / pow;
    clearInterval(this.timerID);
    this.timerID = setInterval(function () {
      return _this7.tick();
    }, 1000 / this.incr);
  };

  App.prototype.tick = function tick() {
    var _this8 = this;

    this.setState(function (prevState) {
      return {
        counter: prevState.counter + 1 * _this8.state.pow
      };
    });
  };

  App.prototype.render = function render() {
    return React.createElement(
      "div",
      { "class": "center-div" },
      React.createElement(Ticker, { monthly: this.state.monthly, counter: this.state.counter, currency: this.state.currency }),
      React.createElement(
        "div",
        { "class": "row inputs" },
        React.createElement(
          "form",
          { "class": "col s12" },
          React.createElement(
            "div",
            { "class": "input-field col s4 labeldiv" },
            React.createElement(
              "label",
              null,
              "Monthly expences: "
            )
          ),
          React.createElement(
            "div",
            { "class": "input-field col s3" },
            React.createElement(MonthlyInput, { monthly: this.state.monthly, onMonthlyChange: this.handleMonthlyChange })
          ),
          React.createElement(
            "div",
            { "class": "input-field col s2" },
            React.createElement(CurrencyInput, { currency: this.state.currency, onCurrencyChange: this.handleCurrencyChange })
          ),
          React.createElement(
            "div",
            { "class": "input-field col s3 buttondiv" },
            React.createElement(ResetButton, { onClick: this.handleReset })
          )
        )
      )
    );
  };

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));