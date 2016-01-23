var $ = require('jquery');

var Landing = React.createClass({
    render: function() {
        return <div className="ui inverted vertical masthead center aligned segment jumbo-tron">
            <div className="ui text container">
                <h1 className="ui inverted header main-header"> congenial system </h1>
            </div>
            <Login />
        </div>
    }
});

var Login = React.createClass({
    getInitialState: function() {
        return {userName: '', password: ''};
    },
    handleUserNameChange: function(e) {
        this.setState({userName: e.target.value})
    },
    handlePasswordChange: function(e) {
        this.setState({password: e.target.value})
    },
    loginSubmit: function(e) {
        e.preventDefault();
        var userName = this.state.userName.trim();
        var password = this.state.password.trim();
        if(!userName || !password) {
            return;
        }
        $.ajax({
            url: '/login',
            dataType: 'json',
            type: 'POST',
            data: {
                userName: userName,
                password: password
            }
        })
    },
    render: function() {
        return <div className="ui container center aligned">
            <form className="ui form" onSubmit={this.loginSubmit}>
                <div className="fields">
                    <div className="two wide field"></div>
                    <div className="six wide field">
                        <input
                            type="text"
                            placeholder="name..."
                            value={this.state.userName}
                            onChange={this.handleUserNameChange}
                        />
                    </div>
                    <div className="six wide field">
                        <input
                            type="password"
                            placeholder="password..."
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                        />
                    </div>
                </div>
                <button className="ui blue basic button" type="submit">
                    <h2>
                        GO &nbsp;
                        <i className="pointing right icon"></i>
                    </h2>
                </button>
            </form>
        </div>
    }
})

React.render(
    <Landing />,
    document.getElementById('landing')
);
