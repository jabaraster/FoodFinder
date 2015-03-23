var LoginBox = React.createClass({displayName: "LoginBox",
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
            React.createElement("fieldset", null, 
                React.createElement("legend", null, "家族と使う"), 
                React.createElement("div", {className: "form-group"}, 
                    React.createElement("input", {type: "text", className: "form-control family", ref: "family", placeholder: "ファミリー"})
                ), 
                React.createElement("div", {className: "form-group"}, 
                    React.createElement("input", {type: "password", className: "form-control password", ref: "password", placeholder: "合言葉"})
                ), 
                React.createElement("div", {className: "checkbox"}, 
                    React.createElement("label", null, 
                        React.createElement("input", {type: "checkbox", name: "autoLogin", checked: this.state.autoLogin, onChange: this.handleAutoLoginChange}), 
                        "ログインしたままにする"
                    )
                ), 
                React.createElement("a", {href: "#", onClick: this.handleLogin}, "ログイン"), 
                "または", 
                React.createElement("a", {className: "btn btn-success", onClick: this.handleSignIn}, 
                    React.createElement("i", {className: "glyphicon glyphicon-ok-sign"}), 
                    "サインアップ"
                )
            )
        )
    }
});

var GuestMenu = React.createClass({displayName: "GuestMenu",
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
            React.createElement("div", null, 
                React.createElement("h2", {className: "title-single"}, "一人で使う"), 
                React.createElement("div", {className: "menu-items"}, 
                    React.createElement(MenuItem, {itemName: "word-search", iconName: "search", itemText: "ワード検索"}), 
                    React.createElement(MenuItem, {itemName: "genre", iconName: "tags", itemText: "ジャンル別"}), 
                    React.createElement(MenuItem, {itemName: "neighbor", iconName: "home", itemText: "おとなり"})
                ), 
                React.createElement("div", {className: "contents"}, 
                    React.createElement("div", {className: "word-search"})
                )
            )
        )
    }
});

var MenuItem = React.createClass({displayName: "MenuItem",
    render: function() {
        var classes = React.addons.classSet('menu-item', this.props.itemName);
        var icon = React.addons.classSet('glyphicon', 'glyphicon-' + this.props.iconName);
        return (
            React.createElement("div", {className: classes}, 
                React.createElement("i", {className: icon}), 
                this.props.itemText
            )
        )
    }
});

React.render(
    React.createElement(LoginBox, null),
    document.getElementById('login-box')
);
React.render(
    React.createElement(GuestMenu, null),
    document.getElementById('guest-menu')
);