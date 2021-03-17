var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var App = function (_React$Component) {_inherits(App, _React$Component);
  function App(props) {_classCallCheck(this, App);var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this,
    props));

    _this.state = {
      allPosts: [{
        title: 'LOADING',
        body: 'LOADING',
        name: 'LOADING',
        username: '@LOADING' }],


      userPosts: []

      // The following function (this.sortPosts) is the Fisher-Yates (aka Knuth) Shuffle found in JS at
      // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    };_this.sortPosts = _this.sortPosts.bind(_this);
    _this.matchAccounts = _this.matchAccounts.bind(_this);
    _this.userPost = _this.userPost.bind(_this);

    _this.loaded = false;
    _this.postDataWithoutUserInfo = [];
    _this.newUserPosts = [];return _this;
  }_createClass(App, [{ key: 'componentDidMount', value: function componentDidMount()

    {var _this2 = this;

      if (this.loaded === false) {
        fetch('https://jsonplaceholder.typicode.com/posts').
        then(function (response) {return response.json();}).
        then(function (json) {return _this2.sortPosts(json);}).
        then(function () {
          return fetch('https://jsonplaceholder.typicode.com/users');
        }).
        then(function (response) {return response.json();}).
        then(function (json) {return _this2.matchAccounts(json);}).
        then(function (json) {return _this2.setState({ allPosts: json });}).
        catch(function (error) {return console.log(error);});
      }

      this.loaded = true;
    } }, { key: 'sortPosts', value: function sortPosts(

    array) {
      var currentIndex = array.length,temporaryValue,randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      this.postDataWithoutUserInfo = array;
      return array;
    } }, { key: 'matchAccounts', value: function matchAccounts(

    userData) {
      var completeFeedData = [];
      for (var i = 0; i < this.postDataWithoutUserInfo.length; i++) {
        for (var j = 0; j < userData.length; j++) {
          if (this.postDataWithoutUserInfo[i].userId === userData[j].id) {

            completeFeedData.push(_extends({}, this.postDataWithoutUserInfo[i], userData[j]));
          }
        }
      }

      return completeFeedData;
    } }, { key: 'userPost', value: function userPost(

    post) {
      var totalLength = this.state.allPosts.length + this.state.userPosts.length;
      var newPostData = {
        userId: 11,
        id: totalLength + 2,
        name: 'You',
        username: 'codepen_user',
        body: post,
        userPost: true };


      this.newUserPosts.unshift(newPostData);

      this.setState({
        userPosts: this.newUserPosts });

    } }, { key: 'render', value: function render()
    {

      return (

        React.createElement('div', null,
          React.createElement(Userbar, null),
          React.createElement('div', { className: 'container' },
            React.createElement('div', { className: 'row' },
              React.createElement('div', { className: 'col' },
                React.createElement(CreatePost, { post: this.userPost })))),




          React.createElement('div', { className: 'container' },
            React.createElement(UserFeed, { postData: this.state.userPosts }),
            React.createElement(Feed, { postData: this.state.allPosts }))));




    } }]);return App;}(React.Component);var


Userbar = function (_React$Component2) {_inherits(Userbar, _React$Component2);function Userbar() {_classCallCheck(this, Userbar);return _possibleConstructorReturn(this, (Userbar.__proto__ || Object.getPrototypeOf(Userbar)).apply(this, arguments));}_createClass(Userbar, [{ key: 'render', value: function render()
    {
      return (
        React.createElement('nav', { className: 'navbar fixed-top navbar-expand-sm navbar-dark bg-danger' },
          React.createElement('a', { className: 'navbar-brand', href: '#' }, React.createElement('i', { className: 'fas fa-user' })),
          React.createElement('button', { 'class': 'navbar-toggler', type: 'button', 'data-toggle': 'collapse', 'data-target': '#userLinks', 'aria-controls': 'userLinks', 'aria-expanded': 'false', 'aria-label': 'Toggle navigation' },
            React.createElement('span', { 'class': 'navbar-toggler-icon' })),

          React.createElement('div', { className: 'collapse navbar-collapse', id: 'userLinks' },
            React.createElement('ul', { className: 'navbar-nav ml-auto' },
              React.createElement('li', { className: 'nav-item active' }, React.createElement('a', { className: 'nav-link', href: '#' }, 'Feed')),
              React.createElement('li', { className: 'nav-item' }, React.createElement('a', { className: 'nav-link', href: '#' }, 'Messages')),
              React.createElement('li', { className: 'nav-item' }, React.createElement('a', { className: 'nav-link', href: '#' }, 'Notifications')),
              React.createElement('li', { className: 'nav-item' }, React.createElement('a', { className: 'nav-link', href: '#' }, 'Settings'))))));




    } }]);return Userbar;}(React.Component);var


CreatePost = function (_React$Component3) {_inherits(CreatePost, _React$Component3);
  function CreatePost(props) {_classCallCheck(this, CreatePost);var _this4 = _possibleConstructorReturn(this, (CreatePost.__proto__ || Object.getPrototypeOf(CreatePost)).call(this,
    props));

    _this4.state = {
      postText: '' };


    _this4.updatePostText = _this4.updatePostText.bind(_this4);
    _this4.submitPostText = _this4.submitPostText.bind(_this4);return _this4;
  }_createClass(CreatePost, [{ key: 'updatePostText', value: function updatePostText(

    e) {
      this.setState({
        postText: e.target.value });

    } }, { key: 'submitPostText', value: function submitPostText()

    {
      if (this.state.postText.length > 0) {
        this.props.post(this.state.postText);
        document.getElementById('postField').value = '';

        this.setState({
          postText: '' });

      }
    } }, { key: 'render', value: function render()

    {
      return (
        React.createElement('div', { className: 'mb-2 fixedMenuFix' },
          React.createElement('input', { id: 'postField', onChange: this.updatePostText, type: 'text', className: 'form-control', placeholder: 'What\'s up?' }),
          React.createElement('button', { onClick: this.submitPostText, className: 'btn btn-large btn-warning btn-block' }, React.createElement('span', null, 'Post'))));


    } }]);return CreatePost;}(React.Component);var


UserFeed = function (_React$Component4) {_inherits(UserFeed, _React$Component4);function UserFeed() {_classCallCheck(this, UserFeed);return _possibleConstructorReturn(this, (UserFeed.__proto__ || Object.getPrototypeOf(UserFeed)).apply(this, arguments));}_createClass(UserFeed, [{ key: 'render', value: function render()
    {
      if (this.props.postData.length > 0) {
        return (
          React.createElement('div', null,
            this.props.postData.map(function (post, key) {return (
                React.createElement(Post, { postData: post, key: post.id }));})));



      } else {
        return (
          React.createElement('div', null));

      }
    } }]);return UserFeed;}(React.Component);var


Feed = function (_React$Component5) {_inherits(Feed, _React$Component5);function Feed() {_classCallCheck(this, Feed);return _possibleConstructorReturn(this, (Feed.__proto__ || Object.getPrototypeOf(Feed)).apply(this, arguments));}_createClass(Feed, [{ key: 'render', value: function render()
    {

      return (
        React.createElement('div', null,
          this.props.postData.map(function (post, key) {return (
              React.createElement(Post, { postData: post, key: post.id }));})));




    } }]);return Feed;}(React.Component);var


Post = function (_React$Component6) {_inherits(Post, _React$Component6);
  function Post(props) {_classCallCheck(this, Post);var _this7 = _possibleConstructorReturn(this, (Post.__proto__ || Object.getPrototypeOf(Post)).call(this,
    props));

    _this7.state = {
      replyWindowStyling: { display: 'none' },
      replies: [] };


    _this7.replyWindowOpen = _this7.replyWindowOpen.bind(_this7);
    _this7.addReply = _this7.addReply.bind(_this7);

    _this7.postReplies = [];return _this7;
  }_createClass(Post, [{ key: 'replyWindowOpen', value: function replyWindowOpen()

    {

      if (this.state.replyWindowStyling.display === 'none') {
        this.setState({
          replyWindowStyling: {
            display: 'flex',
            flexWrap: 'wrap' } });


      } else {
        this.setState({
          replyWindowStyling: { display: 'none' } });

      }
    } }, { key: 'addReply', value: function addReply(

    reply) {
      var replyData = {
        name: 'You',
        username: 'codepen_user',
        replyID: this.postReplies.length,
        text: reply,
        userID: 11 };


      this.postReplies.push(replyData);
      this.setState({
        replies: this.postReplies });

    } }, { key: 'render', value: function render()
    {
      return (
        React.createElement('div', { className: 'row mx-auto justify-content-start border mt-1 p-2 w-100 align-items-center' },
          React.createElement(PostContent, { postData: this.props.postData }),
          React.createElement(PostInput, { replyWindowOpen: this.replyWindowOpen }),
          React.createElement(ReplyWindow, { post: this.addReply, replies: this.state.replies, inlineStyling: this.state.replyWindowStyling, replyName: this.props.postData.username })));


    } }]);return Post;}(React.Component);var


PostContent = function (_React$Component7) {_inherits(PostContent, _React$Component7);function PostContent() {_classCallCheck(this, PostContent);return _possibleConstructorReturn(this, (PostContent.__proto__ || Object.getPrototypeOf(PostContent)).apply(this, arguments));}_createClass(PostContent, [{ key: 'render', value: function render()
    {
      var imageSrc = "https://picsum.photos/50?image" + String(this.props.postData.userId);
      return (
        React.createElement('div', null,
          React.createElement('div', { className: 'col-12 d-flex align-items-center' },
            React.createElement('img', { className: "profileThumb", src: imageSrc }),
            React.createElement('h3', { className: 'font-weight-bold ml-2 mb-1 d-inline-block' }, this.props.postData.name),
            React.createElement('a', { href: '#', className: 'ml-2 text-muted' }, '@', this.props.postData.username)),

          React.createElement('div', { className: 'col-12' },
            React.createElement('p', { className: 'mb-0' }, this.props.postData.body))));



    } }]);return PostContent;}(React.Component);var


PostInput = function (_React$Component8) {_inherits(PostInput, _React$Component8);

  function PostInput(props) {_classCallCheck(this, PostInput);var _this9 = _possibleConstructorReturn(this, (PostInput.__proto__ || Object.getPrototypeOf(PostInput)).call(this,
    props));

    _this9.state = {
      liked: false,
      retweeted: false };


    _this9.toggleLike = _this9.toggleLike.bind(_this9);
    _this9.toggleRetweet = _this9.toggleRetweet.bind(_this9);
    var likeStyle = {};
    var rtStyle = {};
    _this9.likeClass = 'far fa-heart mr-4 iconStyling';
    _this9.rtClass = 'fas fa-retweet mr-4 iconStyling';return _this9;
  }_createClass(PostInput, [{ key: 'toggleLike', value: function toggleLike()

    {

      if (this.state.liked) {
        this.likeClass = this.likeClass.replace('fas', 'far');
        this.likeStyle = {};
        this.setState({
          liked: false });

      } else {
        this.likeClass = this.likeClass.replace('far', 'fas');
        this.likeStyle = { color: 'red' };
        this.setState({
          liked: true });

      }
    } }, { key: 'toggleRetweet', value: function toggleRetweet()

    {
      if (this.state.retweeted) {
        this.rtStyle = {};
        this.setState({
          retweeted: false });

      } else {
        this.rtStyle = { color: 'green' };
        this.setState({
          retweeted: true });

      }
    } }, { key: 'render', value: function render()

    {
      return (
        React.createElement('div', { className: 'col-sm-12 mt-1' },
          React.createElement('i', { style: this.likeStyle, onClick: this.toggleLike, className: this.likeClass }),
          React.createElement('i', { style: this.rtStyle, onClick: this.toggleRetweet, className: this.rtClass }),
          React.createElement('i', { onClick: this.props.replyWindowOpen, className: 'fas fa-reply iconStyling' })));



    } }]);return PostInput;}(React.Component);var


ReplyWindow = function (_React$Component9) {_inherits(ReplyWindow, _React$Component9);function ReplyWindow() {_classCallCheck(this, ReplyWindow);return _possibleConstructorReturn(this, (ReplyWindow.__proto__ || Object.getPrototypeOf(ReplyWindow)).apply(this, arguments));}_createClass(ReplyWindow, [{ key: 'render', value: function render()

    {

      return (
        React.createElement('div', { style: this.props.inlineStyling, className: 'w-100' },
          React.createElement(ReplyDisplay, { className: 'col-12', replies: this.props.replies }),
          React.createElement(ReplyField, { replyName: this.props.replyName, post: this.props.post })));


    } }]);return ReplyWindow;}(React.Component);var


ReplyDisplay = function (_React$Component10) {_inherits(ReplyDisplay, _React$Component10);function ReplyDisplay() {_classCallCheck(this, ReplyDisplay);return _possibleConstructorReturn(this, (ReplyDisplay.__proto__ || Object.getPrototypeOf(ReplyDisplay)).apply(this, arguments));}_createClass(ReplyDisplay, [{ key: 'render', value: function render()
    {
      if (this.props.replies.length > 0) {
        return (
          React.createElement('div', { className: 'col-sm-12 mt-2' },
            this.props.replies.map(function (reply, key) {return (
                React.createElement(Reply, { reply: reply, key: key }));})));



      } else {
        return (
          React.createElement('div', null));

      }
    } }]);return ReplyDisplay;}(React.Component);var


Reply = function (_React$Component11) {_inherits(Reply, _React$Component11);function Reply() {_classCallCheck(this, Reply);return _possibleConstructorReturn(this, (Reply.__proto__ || Object.getPrototypeOf(Reply)).apply(this, arguments));}_createClass(Reply, [{ key: 'render', value: function render()
    {
      return (
        React.createElement('div', { className: 'border-top p-2 replyDisplay' },
          React.createElement('div', { className: 'd-flex align-items-center' },
            React.createElement('img', { src: "https://picsum.photos/50?image" + String(this.props.reply.userID) }),
            React.createElement('h5', { className: 'ml-2 font-weight-bold d-inline-block' }, this.props.reply.name),
            React.createElement('a', { href: '#', className: 'ml-2 text-muted' }, '@', this.props.reply.username)),

          React.createElement('p', null, this.props.reply.text)));


    } }]);return Reply;}(React.Component);var


ReplyField = function (_React$Component12) {_inherits(ReplyField, _React$Component12);
  function ReplyField(props) {_classCallCheck(this, ReplyField);var _this13 = _possibleConstructorReturn(this, (ReplyField.__proto__ || Object.getPrototypeOf(ReplyField)).call(this,
    props));

    _this13.state = {
      replyText: '' };


    _this13.updateReplyText = _this13.updateReplyText.bind(_this13);
    _this13.submitReply = _this13.submitReply.bind(_this13);
    _this13.id = 'replyField' + String(Math.floor(Math.random() * 100000));return _this13;
  }_createClass(ReplyField, [{ key: 'updateReplyText', value: function updateReplyText(

    e) {
      this.setState({
        replyText: e.target.value });

    } }, { key: 'submitReply', value: function submitReply()

    {
      if (this.state.replyText.length > 0) {
        this.props.post(this.state.replyText);
        document.getElementById(this.id).value = '';
        this.setState({
          replyText: '' });

      }
    } }, { key: 'render', value: function render()

    {

      return (
        React.createElement('div', { className: 'col-sm-12 form-inline mt-1' },
          React.createElement('div', { className: 'input-group flex-grow-1' },
            React.createElement('div', { 'class': 'input-group-prepend' },
              React.createElement('div', { 'class': 'input-group-text' }, '@', this.props.replyName)),

            React.createElement('input', { type: 'text', onChange: this.updateReplyText, id: this.id, className: 'form-control', placeholder: 'Say something nice!' })),

          React.createElement('button', { className: 'btn btn-warning', onClick: this.submitReply }, React.createElement('span', null, 'Reply'))));


    } }]);return ReplyField;}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));