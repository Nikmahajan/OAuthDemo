import React, { Component } from 'react';
import md5 from 'md5';

const RowColumn = ({ value, handleChange, isChecked }) => {
  const renderInnerContent = (content) => {
    const e = document.createElement('div');
    e.innerHTML = content;
    return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
  };
  const showColumnPopup = () => {
    document.getElementById('popup').style.display = 'block';
    const htmlIframe = document.getElementById('htmlIframe');
    htmlIframe.src = 'about:blank';
    setTimeout(() => {
      htmlIframe.contentWindow.document.write(renderInnerContent(value));
    }, 300);
  };
  const closePopup = () => {
    document.getElementById('popup').style.display = 'none';
    const htmlIframe = document.getElementById('htmlIframe');
    htmlIframe.close();
  };

  const checkbox = () => (
    <div>
      <input type="checkbox" value={value} checked={isChecked} onChange={handleChange} />
    </div>
  );

  if (typeof value === 'string' && value.search('checkboxId') !== -1) {
    return (
      <td>{checkbox()}</td>
    );
  }
  if (typeof value === 'string' && value.length >= 200) {
    return (
      <td>
        <div id="popup">
          <div onClick={closePopup} className="closeButton">X</div>
          <div className="popup-data">
            <iframe id="htmlIframe" />
          </div>
        </div>
        <div
          style={{
            textDecoration: 'underline',
            color: 'blue',
          }}
          onClick={showColumnPopup}
        >Details
        </div>
      </td>
    );
  }
  return (
    <td>{value}</td>
  );

};


class Row extends Component {
  render() {
    const isChecked = () => {
      if (this.props.data.isSelected) {
        return true;
      }
      return false;
    };
    console.log('porps data in row iterator!!!!!@@', this.props.data);
    return (
      <tr>
        {this.props.metadata.map((colMetaData, index) => (<RowColumn
          value={(this.props.data[colMetaData.key])}
          index={index}
          isChecked={isChecked()}
          handleChange={this.props.handleChange}
          key={md5((Math.random() * 46656).toString())}
                                                          />))}
      </tr>
    );
  }
}

export default Row;
