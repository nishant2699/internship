var data = [
{ name: "Annonymus1", number: "+123456789" },
{ name: "Annonymus2", number: "+987654321" }];


var PhoneBookApp = React.createClass({ displayName: "PhoneBookApp",
  loadDataFromVar: function () {
    this.setState({ data: data });
  },
  handleContactSubmit: function (contact) {
    this.props.data.push(contact);
    console.log(this.props.data);
  },
  getInitialState: function () {
    return { data: [] };
  },
  componentDidMount: function () {
    this.loadDataFromVar();
    setInterval(this.loadDataFromVar, this.props.pollInterval);
  },
  render: function () {
    return (
      React.createElement("div", { className: "phoneBookApp" },
      React.createElement("h1", null, "My PhoneBook"),
      React.createElement(AddContactForm, { onContactSubmit: this.handleContactSubmit }),
      React.createElement(PhoneBookList, { data: this.props.data })));


  } });


var PhoneBookList = React.createClass({ displayName: "PhoneBookList",
  render: function () {
    var contactNodes = this.props.data.map(function (contact) {
      return (
        React.createElement(Contact, { name: contact.name, number: contact.number }));

    });
    return (
      React.createElement("div", { className: "phoneBookList" },
      contactNodes));



  } });


var AddContactForm = React.createClass({ displayName: "AddContactForm",
  handleSubmit: function (e) {
    e.preventDefault();
    var name = React.findDOMNode(this.refs.name).value.trim();
    var number = React.findDOMNode(this.refs.number).value.trim();

    if (!name || !number) {
      return;
    }
    this.props.onContactSubmit({ name: name, number: number });

    React.findDOMNode(this.refs.name).value = '';
    React.findDOMNode(this.refs.number).value = '';
    return;
  },
  render: function () {
    return (
      React.createElement("form", { className: "addContactForm", onSubmit: this.handleSubmit },
      React.createElement("input", { type: "text", placeholder: "Name", ref: "name" }),
      React.createElement("input", { type: "text", placeholder: "Number", ref: "number" }),
      React.createElement("button", { type: "submit" }, "Add Contact")));


  } });


var Contact = React.createClass({ displayName: "Contact",
  render: function () {
    return (
      React.createElement("div", { className: "contact" },
      React.createElement("h2", { className: "contactName" }, this.props.name),
      React.createElement("p", null, this.props.number)));


  } });


React.render(
React.createElement(PhoneBookApp, { data: data, pollInterval: 200 }),
document.getElementById('content'));