import React, { Component } from 'react';

function pagination(n, len) {
  if (n === 1 && len === 1) return [1];
  const output = [1];
  const start = (n - 2 > 1) ? n - 2 : 2;
  for (let i = start; i < len; i++) {
    if (i >= len) break;
    if (output.length >= 6) break;
    output.push(i);
  }
  output.push(len);
  return output;
}

class Pages extends Component {
  constructor() {
    super();
    this.handleArrow = this.handleArrow.bind(this);
  }
  handleArrow(action) {
    let { pagePlusOrDown, fetchResults, currentPage, formData  } = this.props;
    const newPage = pagePlusOrDown(action);
    fetchResults(formData, newPage);
  }

  render() {
    const {
      fetchResults, currentPage, pageTotal, formData,
    } = this.props;
    const pages = pagination(currentPage, pageTotal);
    return (
      <div className="pagination container">
        <span onClick={() => (this.handleArrow('down'))}>&laquo;</span>
        {pages.length && pages.map((page) => {
          return (
            page === currentPage ? <span key={page} className="active">{page}</span> :
            <span key={page} onClick={()=>(fetchResults(formData,page))}>{page}</span>
          );
        })
        }
        <span onClick={() => (this.handleArrow('up'))}>&raquo;</span>
      </div>
    );
  }
}


export default Pages;
