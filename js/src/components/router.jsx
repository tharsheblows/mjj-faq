
var page = MJJRS.page;
var request = MJJRS.request;
var marked = MJJRS.marked;

var VelocityComponent = MJJRS.VelocityComponent;

var React = MJJRS.React;
var ReactDOM = MJJRS.ReactDOM;

var Router = React.createClass({

	// I'm taking this from https://github.com/Automattic/Picard/blob/master/components/router/router.jsx even though I fully appreciate I've been warned
	componentDidMount: function(){

		var self = this;

		page( '/frequently-asked-questions/:slug', function ( ctx ){

			var data,
				slug = ctx.params.slug,
				url = "/wp-json/wp/v2/mjj-faq-api/";

			request
				.get( url + faq_object.ID )
				.end( function( error, response ){
					var data = JSON.parse( response.text );
					self.setState({ component: <EntryList data={ data._mjj_faq_meta } bodyClass="single-faq" /> });
			});


		});

		page.start();

	}, 

	getInitialState: function(){
		return ({ component: <div /> });
	},

	render: function() {
		return( this.state.component );
	}

});

var EntryList = React.createClass({

	render: function(){

		var entries = [];
		var entriesObject = this.props.data;

		var entryClass;

		for( var ii = 0; ii < entriesObject.length; ii++ ){

			oddness = ( ii % 2 === 0 ) ? 'even' : 'odd';

			entries.push( <Entry entry={entriesObject[ii]} oddness={oddness} key={ii} /> );
		}

		return(
			<ul className="entry-list">
				{entries}
			</ul>
		);
	}
});

var Entry = React.createClass({

	getInitialState: function(){
		return({
			clicks: 0,
		});
	},

	markItUp: function( text ){
		return({
			__html: marked( text, {sanitize: true} )
		});
	},

	openAnswer: function( e ){
		e.preventDefault();

		this.setState({
			clicks: this.state.clicks + 1,
		})
	},

	render: function(){

		var theQuestion = this.props.entry.the_question;
		var theAnswer = this.props.entry.the_answer;

		var entryClass= this.props.oddness + " faq-entry";

		var answerMarkedUp = this.markItUp( theAnswer );

		var hideOrShow = ( this.state.clicks % 2 === 0 ) ? "slideUp" : "slideDown";

		var rotate = ( this.state.clicks % 2 === 0 ) ? -90 : 90;

		var linkClassName = ( this.state.clicks % 2 === 0 ) ? 'closed' : 'opened';

		var arrowComponent = ( this.state.clicks % 2 === 0 ) ? <div className="faq-arrow" key={this.state.clicks}>&#9662;</div> : <div className="faq-arrow" key={this.state.clicks}>&#9656;</div>;

		return(
			<li className={entryClass}>
				<a href="#" onClick={this.openAnswer} className={linkClassName}>
					<VelocityComponent animation={{rotateZ: rotate }}>
						{arrowComponent}
					</VelocityComponent>
					<div className="faq-question">
						{theQuestion}
					</div>
				</a>
				<VelocityComponent animation={hideOrShow}>
					<div className="faq-answer" dangerouslySetInnerHTML={answerMarkedUp}/>
				</VelocityComponent>
			</li>
		);
	}
});


module.exports = Router;
