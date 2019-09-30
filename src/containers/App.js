import React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "../components/header/Header";
import HomePage from "../pages/home/HomePage";
import ChangeLogPage from "../pages/changelog/ChangeLog";
import Modal from "../components/modal/Modal";
import logo from "../assets/crown.svg";
import userIcon from "../assets/user.png";
import "./app.styles.scss";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      fileContent: [],
      showModal: false
    };
  }

  componentDidMount() {
    (async () => {
      const changelog = await this.fetchAPI("api/changelog");
      const content = changelog.content;
      const contentArr = content.split("\n");

      this.setState({ fileContent: contentArr });
    })();
  }

  fetchAPI = async url => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  };

  createCollections = content => {
    const collections = [];
    let collection = {};

    for (let i = 0, l = content.length; i < l; i++) {
      if (content[i].startsWith("## ")) {
        collection.header = content[i].substring(3);

        if (content[i + 1].startsWith("### ")) {
          collection.date = content[i + 1].substring(4);
        }

        let j = i + 2;
        while (content[j] && !content[j].startsWith("#")) {
          if (!collection.description) {
            collection.description = content[j];
          } else {
            collection.description = collection.description +=
              "\n" + content[j];
          }
          j++;
        }

        collections.push(collection);
        collection = {};
      }
    }
    return collections;
  };

  handleToggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  };

  render() {
    const { fileContent, showModal } = this.state;
    const collections = this.createCollections(fileContent);
    console.log(collections);
    return (
      <div className="App">
        <Header
          logo={logo}
          title="Changelog"
          userIcon={userIcon}
          notifications={collections.length ? collections.length : null}
          toggleModal={this.handleToggleModal}
        />
        {showModal ? <Modal collections={collections} /> : null}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/changelog" component={ChangeLogPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
