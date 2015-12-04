(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Router = require('./router.jsx');

ReactDOM.render(React.createElement(Router, null), document.getElementById('mjj-faq'));

},{"./router.jsx":2}],2:[function(require,module,exports){

var page = MJJRS.page;
var request = MJJRS.request;
var marked = MJJRS.marked;

var VelocityComponent = MJJRS.VelocityComponent;

var Router = React.createClass({
	displayName: "Router",

	// I'm taking this from https://github.com/Automattic/Picard/blob/master/components/router/router.jsx even though I fully appreciate I've been warned
	componentDidMount: function () {

		var self = this;

		page('/frequently-asked-questions/:slug', function (ctx) {

			var data,
			    slug = ctx.params.slug,
			    url = "/wp-json/wp/v2/mjj-faq-api/";

			request.get(url + faq_object.ID).end(function (error, response) {
				var data = JSON.parse(response.text);
				self.setState({ component: React.createElement(EntryList, { data: data._mjj_faq_meta, bodyClass: "single-faq" }) });
			});
		});

		page.start();
	},

	getInitialState: function () {
		return { component: React.createElement("div", null) };
	},

	render: function () {
		return this.state.component;
	}

});

var EntryList = React.createClass({
	displayName: "EntryList",

	render: function () {

		var entries = [];
		var entriesObject = this.props.data;

		var entryClass;

		for (var ii = 0; ii < entriesObject.length; ii++) {

			oddness = ii % 2 === 0 ? 'even' : 'odd';

			entries.push(React.createElement(Entry, { entry: entriesObject[ii], oddness: oddness, key: ii }));
		}

		return React.createElement(
			"ul",
			{ className: "entry-list" },
			entries
		);
	}
});

var Entry = React.createClass({
	displayName: "Entry",

	getInitialState: function () {
		return {
			clicks: 0
		};
	},

	markItUp: function (text) {
		return {
			__html: marked(text, { sanitize: true })
		};
	},

	openAnswer: function (e) {
		e.preventDefault();

		this.setState({
			clicks: this.state.clicks + 1
		});
	},

	render: function () {

		var theQuestion = this.props.entry.the_question;
		var theAnswer = this.props.entry.the_answer;

		var entryClass = this.props.oddness + " faq-entry";

		var answerMarkedUp = this.markItUp(theAnswer);

		var hideOrShow = this.state.clicks % 2 === 0 ? "slideUp" : "slideDown";

		var rotate = this.state.clicks % 2 === 0 ? 270 : 360;

		return React.createElement(
			"li",
			{ className: entryClass },
			React.createElement(
				"a",
				{ onClick: this.openAnswer },
				React.createElement(
					VelocityComponent,
					{ animation: { rotateZ: rotate } },
					React.createElement(
						"div",
						{ key: this.state.clicks },
						"▽"
					)
				),
				React.createElement(
					"div",
					{ className: "faq-question" },
					theQuestion
				)
			),
			React.createElement(
				VelocityComponent,
				{ animation: hideOrShow },
				React.createElement("div", { dangerouslySetInnerHTML: answerMarkedUp })
			)
		);
	}
});

module.exports = Router;

},{}]},{},[1,2]);
