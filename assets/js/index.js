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
    componentDidMount: function() {
        $('#guest-menu .menu-item').click(function() {
            alert($(this).text() + "：未実装...");
        });
    },
    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement("h2", {className: "title-single"}, "一人で使う"), 
                React.createElement("div", {className: "menu-items"}, 
                    React.createElement("div", {className: "menu-item word-search"}, 
                        React.createElement("i", {className: "glyphicon glyphicon-user"}), 
                        "ワード検索"
                    ), 
                    React.createElement("div", {className: "menu-item genre"}, 
                        React.createElement("i", {className: "glyphicon glyphicon-tags"}), 
                        "ジャンル別"
                    ), 
                    React.createElement("div", {className: "menu-item neighbor"}, 
                        React.createElement("i", {className: "glyphicon glyphicon-home"}), 
                        "おとなりさん"
                    )
                )
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