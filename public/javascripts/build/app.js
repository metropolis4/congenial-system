(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var CommentBox = React.createClass({displayName: "CommentBox",
    getInitialState: function() {
        return {comments: []};
    },
    handleCommentSubmit: function(comment) {
        var comments = this.state.comments;
        var newComments = comments.concat([comment]);
        this.setState({comments: newComments});
        $.ajax({
            url: '/saveComment',
            type: 'POST',
            data: comment,
            success: function(comments) {
                this.setState({comments: comments});
            }.bind(this),
            error: function(xhr, status, err) {
                console.log("ERROR: ", arguments);
            }.bind(this)
        });
    },
    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(comments) {
                this.setState({comments: comments});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        return (
            React.createElement("div", {className: "comment-box"}, 
                React.createElement("h2", null, "Comments Go Here:"), 
                React.createElement(CommentList, {comments: this.state.comments}), 
                React.createElement(CommentForm, {onCommentSubmit: this.handleCommentSubmit})
            )
        )
    }
});

var CommentList = React.createClass({displayName: "CommentList",
    render: function() {
        var comments = this.props.comments.map(function(comment) {
            return (
                React.createElement(Comment, {author: comment.name}, 
                    comment.comment
                )
            );
        });
        return (
            React.createElement("div", {className: "comment-list"}, 
                comments
            )
        );
    }
});

var Comment = React.createClass({displayName: "Comment",
    render: function() {
        var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
        return (
            React.createElement("div", {className: "comment"}, 
                React.createElement("h2", {className: "comment-author"}, 
                    this.props.author
                ), 
                React.createElement("span", {dangerouslySetInnerHTML: {__html: rawMarkup}})
            )
        );
    }
});

var CommentForm = React.createClass({displayName: "CommentForm",
    handleSubmit: function(e) {
        e.preventDefault();
        var name = React.findDOMNode(this.refs.name).value.trim();
        var comment = React.findDOMNode(this.refs.comment).value.trim();
        if(!name || !comment) { return; }
        this.props.onCommentSubmit({name: name, comment: comment});
        React.findDOMNode(this.refs.name).value = '';
        React.findDOMNode(this.refs.comment).value = '';
        return;
    },
    render: function() {
        return (
            React.createElement("div", {className: "comment-form"}, 
                React.createElement("form", {onSubmit: this.handleSubmit}, 
                    React.createElement("input", {type: "text", placeholder: "name...", ref: "name"}), 
                    React.createElement("input", {type: "text", placeholder: "Say something...", ref: "comment"}), 
                    React.createElement("input", {type: "submit", value: "Post"})
                )
            )
        );
    }
});

React.render(
    React.createElement(CommentBox, {url: "/comments"}),
    document.getElementById('content')
);


},{}]},{},[1]);
