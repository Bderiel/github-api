import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const licenseData = [
  { value: 'isc', label: 'ISC' },
  { value: 'mit', label: 'MIT' },
  { value: 'gpl', label: 'GNU General Public License family' },
  { value: 'apache-2.0', label: 'Apache license 2.' },
  { value: 'wtfpl', label: 'Do What The F*ck You Want To Public License' },
];

class Search extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      stars: '',
      license: '',
      fork: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(evt) {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  }

  handleSelect(selected) {
    const { value } = selected;
    this.setState({ license: value });
  }

  handleCheckbox(evt) {
    const { checked } = evt.target;
    this.setState({ fork: checked });
  }
  render() {
    const { fetchResults,loading } = this.props;
    const { license } = this.state;
    return (
      <form className="search flex">
        <div className="input">
          <label>Text</label>
          <input onChange={this.handleChange} name="query" type="text" required disabled={loading} />
        </div>
        <div className="input">
          <label>Stars </label>
          <input onChange={this.handleChange} name="stars" type="text" disabled={loading} />
        </div>
        <div className="input">
          <label>License</label>
          <Select
            onChange={this.handleSelect.bind(this)}
            options={
              licenseData
            }
            value={license}
            disabled={loading}
          />
        </div>
        <div className="input">
          <label>Include Forked
          <input onChange={this.handleCheckbox.bind(this)} name="fork" type="checkbox" disabled={loading} />
          </label>
        </div>
        <div className="button flex">
          <button onClick={((evt) => {
            evt.preventDefault();
            fetchResults(this.state);
          })}
          >SEARCH
          </button>
        </div>
      </form>
    );
  }
}

export default Search;
