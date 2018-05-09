import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Header, Search, Results, Pages, ResultItem, NoResults } from './components';
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      repositories: [],
      currentPage: 0,
      pageTotal: 0,
      formData: null,
      loading: false,
      empty: false,
    };
    this.fetchResults = this.fetchResults.bind(this);
    this.pagePlusOrDown = this.pagePlusOrDown.bind(this);
  }
  fetchResults(formData, currentPage = 1) {
    let {
      license, fork, query, stars,
    } = formData;

    if (!query && !fork && !license && !stars) return; // empty search escape
    this.setState({ formData, currentPage, loading: true });

    stars = stars ? `stars:${stars}` : '';
    const licenseData = license ? `+license:${formData.license}` : '';

    axios.get(`https://api.github.com/search/repositories?q=${query}${licenseData}${stars}+fork:${fork}&sort=stars&order=desc?&per_page=10&page=${currentPage}`)
      .then((res) => {
        const repositories = res.data.items;
        if (!repositories.length) this.setState({ empty: true });
        if (repositories.length) this.setState({ empty: false });
        const pageTotal = Math.ceil(res.data.total_count / 10);
        this.setState({
          repositories, currentPage, pageTotal, loading: false,
        });
      });
  }

  pagePlusOrDown(action) {
    let { currentPage, pageTotal } = this.state;
    if (action === 'up' && currentPage < pageTotal) {
      this.setState({ currentPage: currentPage += 1 });
      return this.state.currentPage += 1;
    } else if (this.state.currentPage > 1) {
      this.setState({ currentPage: currentPage -= 1 });
      return this.state.currentPage -= 1;
    }
  }

  render() {
    const {
      repositories, currentPage, pageTotal, formData, loading, empty,
    } = this.state;
    return (
      <div>
        <Header />
        <div className="container flex">
          <Search fetchResults={this.fetchResults} loading={loading} />
        </div>
        <hr className="style-one" />
        {!empty ?
          <Fragment>
            <div className="container flex">
              {!loading ?
                <Results>
                  {repositories.length ? repositories.map(repo => (
                    <ResultItem key={repo.id} repo={repo} />
                  )) : null}
                </Results> : <div className="loader" />}
            </div>
            {currentPage ? <Pages pagePlusOrDown={this.pagePlusOrDown} fetchResults={this.fetchResults} currentPage={currentPage} pageTotal={pageTotal} formData={formData} /> : null}
          </Fragment> : <NoResults />}
      </div>
    );
  }
}

export default App;
