var LoginBox = React.createClass({displayName: "LoginBox",
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
                        React.createElement("input", {type: "checkbox", checked: true}), 
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
                React.createElement("h1", null, "一人で使う"), 
                React.createElement("div", {className: "menu-items"}, 
                    React.createElement("div", {className: "menu-item word-search"}, "ワード検索"), 
                    React.createElement("div", {className: "menu-item genre"}, "ジャンル別"), 
                    React.createElement("div", {className: "menu-item neighbor"}, "おとなりさん")
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