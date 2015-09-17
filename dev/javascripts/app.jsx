var CommentBox = React.createClass({
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
            <div className="comment-box">
                <h2>Comments Go Here:</h2>
                <CommentList comments={this.state.comments}/>
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        )
    }
});

var CommentList = React.createClass({
    render: function() {
        var comments = this.props.comments.map(function(comment) {
            return (
                <Comment author={comment.name}>
                    {comment.comment}
                </Comment>
            );
        });
        return (
            <div className="comment-list">
                {comments}
            </div>
        );
    }
});

var Comment = React.createClass({
    render: function() {
        var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
        return (
            <div className="comment">
                <h2 className="comment-author">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
            </div>
        );
    }
});

var CommentForm = React.createClass({
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
            <div className="comment-form">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="name..." ref="name" />
                    <input type="text" placeholder="Say something..." ref="comment"/>
                    <input type="submit" value="Post" />
                </form>
            </div>
        );
    }
});

React.render(
    <CommentBox url="/comments"/>,
    document.getElementById('content')
);
