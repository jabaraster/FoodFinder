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
    switchSelectedItemStyle: function(pSelectedItem) {
        $(pSelectedItem).parent().find('div.menu-item').removeClass('selected');
        $(pSelectedItem).addClass('selected');
    },
    componentDidMount: function() {
        var self = this;
        $('#guest-menu .menu-item').click(function() {
            self.switchSelectedItemStyle(this);
            $('#top-box').animate({ height: 0, opacity: 0 }, 400, null, function() {
                // 選択した項目に応じた検索画面の表示
                $('#guest-menu .contents').fadeIn('fast');
            });
        });
    },
    render: function() {
        return (
            <div>
                <h2 className="title-single">一人で使う</h2>
                <div className="menu-items">
                    <MenuItem itemName="word-search" iconName="search" itemText="ワード検索" />
                    <MenuItem itemName="genre" iconName="tags" itemText="ジャンル別" />
                    <MenuItem itemName="neighbor" iconName="home" itemText="おとなり" />
                </div>
                <div className="contents">
                    <div className="word-search" />
                </div>
            </div>
        )
    }
});

var MenuItem = React.createClass({
    render: function() {
        var classes = React.addons.classSet('menu-item', this.props.itemName);
        var icon = React.addons.classSet('glyphicon', 'glyphicon-' + this.props.iconName);
        return (
            <div className={classes}>
                <i className={icon}></i>
                {this.props.itemText}
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