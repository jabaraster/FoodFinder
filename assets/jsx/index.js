var LoginBox = React.createClass({
    getInitialState: function() {
        return { autoLogin: true };
    },
    componentDidMount: function() {
        $('#login-box .family').focus();
    },
    handleLogin: function() {
        alert('ログイン処理：未実装...');
        return false;
    },
    handleSignIn: function() {
        alert('サインイン処理：未実装...');
        return false;
    },
    handleAutoLoginChange: function() {
        this.setState({ autoLogin: !this.state.autoLogin });
    },
    render: function() {
        return (
            <fieldset>
                <legend>家族と使う</legend>
                <div className="form-group">
                    <input type="text" className="form-control family" ref="family" placeholder="ファミリー" />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control password" ref="password" placeholder="合言葉" />
                </div>
                <div className="checkbox">
                    <label>
                        <input type="checkbox" name="autoLogin" checked={this.state.autoLogin} onChange={this.handleAutoLoginChange} />
                        ログインしたままにする
                    </label>
                </div>
                <a href="#" onClick={this.handleLogin}>ログイン</a>
                または
                <a className="btn btn-success" onClick={this.handleSignIn}>
                    <i className="glyphicon glyphicon-ok-sign"></i>
                    サインアップ
                </a>
            </fieldset>
        )
    }
});

var GuestMenu = React.createClass({
    componentDidMount: function() {
        $('#guest-menu .menu-item').click(function() {
            alert($(this).text() + "：未実装...");
        });
    },
    render: function() {
        return (
            <div>
                <h2 className="title-single">一人で使う</h2>
                <div className="menu-items">
                    <div className="menu-item word-search">
                        <i className="glyphicon glyphicon-user"></i>
                        ワード検索
                    </div>
                    <div className="menu-item genre">
                        <i className="glyphicon glyphicon-tags"></i>
                        ジャンル別
                    </div>
                    <div className="menu-item neighbor">
                        <i className="glyphicon glyphicon-home"></i>
                        おとなりさん
                    </div>
                </div>
            </div>
        )
    }
});

React.render(
    <LoginBox />,
    document.getElementById('login-box')
);
React.render(
    <GuestMenu />,
    document.getElementById('guest-menu')
);