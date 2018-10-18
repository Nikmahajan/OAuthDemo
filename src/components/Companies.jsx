/* eslint-disable no-script-url,no-return-assign,array-callback-return */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import DataGrid from './DataGrid';
import {
  fetchCompaniesAction,
  fetchTokenSuccess,
  sendESignatureAction,
  fetchSignatureStatusAction,
  emptySignaturesAction,
  fetchAccessToken, sendReminderAction,
} from '../actions';
import { selectors } from './../reducers/companyReducer';
import { selectors as tokenSelector } from './../reducers/tokenReducer';
import { selectors as signatureSelector } from '../reducers/signatureReducer';
import googleLogo from './../images/googlelogo.png';
import { setAuthProvider, getAuthProvider } from './../utils/CookieUtils';

const { getAccessToken, shouldSendAuthRequest, paylocityUserName, paylocityUserRole, paylocityUserPermission } = tokenSelector;
const { isFetchCompaniesLoading, getFetchCompaniesError, getCompanies } = selectors;
const { getSignatures, isSendSignatureLoading, signatureSendSuccess, sendReminderSuccess } = signatureSelector;

class Companies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signatures: [],
      fileUrl: '',
      eSignatureButtonActive: false,
      selectedSigners: this.props.companies,
    };
    this.onClickFetchCompaniesButton = this.onClickFetchCompaniesButton.bind(this);
    this.onClickGoogleAuthButton = this.onClickGoogleAuthButton.bind(this);
    this.onClickPaylocityButton = this.onClickPaylocityButton.bind(this);
    this.onClickESignatureButton = this.onClickESignatureButton.bind(this);
    this.onChangeESignatureUrl = this.onChangeESignatureUrl.bind(this);
    this.onClickGetSignatureStatusButton = this.onClickGetSignatureStatusButton.bind(this);
    this.renderInputBox = this.renderInputBox.bind(this);
    this.handleSelectedSignerChange = this.handleSelectedSignerChange.bind(this);
    this.onClickSendReminderButton = this.onClickSendReminderButton.bind(this);
  }

  componentWillMount() {
    const authProvider = getAuthProvider();
    if (this.props.accessToken) {
      if (authProvider === 'eSignature') {
        this.props.fetchSignatureStatusAction();
      } else {
        this.props.fetchCompaniesAction();
      }
    } else {
      this.props.emptySignaturesAction();
      setAuthProvider('thinkhr');
      this.props.fetchAccessToken();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.accessToken && (this.props.accessToken !== nextProps.accessToken)) {
      nextProps.fetchCompaniesAction();
    }
    if (!this.props.sendAuthRequest && nextProps.sendAuthRequest) {
      if (getAuthProvider() === 'google') {
        this.props.onGoogleAuth();
      } if (getAuthProvider() === 'sso') {
        this.props.onPaylocity();
      } if (getAuthProvider() === 'thinkhr') {
        this.props.onAuth();
      }
    }
    if (!isEmpty(nextProps.signatures)) {
      this.setState({
        signatures: nextProps.signatures,
        selectedSigners: nextProps.signatures,
      });
    } else if (nextProps.companies) {
      this.setState({
        selectedSigners: nextProps.companies,
      });
    }
  }

  getCompaniesData() {
    if (!isEmpty(this.state.signatures)) {
      return this.props.signatures;
    }
    return (this.props.companies) ? (this.props.companies) : null;
  }

  gridHeaderData() {
    if (!isEmpty(this.state.signatures)) {
      return [
        {
          'name': 'SELECT',
          'key': 'checkboxId',
        },
        {
          'name': 'DOCUMENT ID',
          'key': 'documentId',
        },
        {
          'name': 'DOCUMENT TYPE',
          'key': 'documentType',
        },
        {
          'name': 'SIGNER EMAIL',
          'key': 'signerEmail',
        },
        {
          'name': 'STATUS',
          'key': 'status',
        },
      ];
    }
    return [
      {
        'name': 'SELECT',
        'key': 'checkboxId',
      },
      {
        'name': 'USER ID',
        'key': 'userId',
      },
      {
        'name': 'USERNAME',
        'key': 'userName',
      },
      {
        'name': 'EMAIL',
        'key': 'email',
      },
    ];
  }

  onClickFetchCompaniesButton() {
    this.props.emptySignaturesAction();
    setAuthProvider('thinkhr');
    if (this.props.accessToken) {
      this.props.fetchCompaniesAction();
    } else {
      this.props.onAuth();
    }
  }

  onClickPaylocityButton() {
    setAuthProvider('sso');
    if (this.props.accessToken) {
      this.props.fetchCompaniesAction();
    } else {
      this.props.onPaylocity();
    }
  }

  onClickGoogleAuthButton() {
    setAuthProvider('google');
    if (this.props.accessToken) {
      this.props.fetchCompaniesAction();
    } else {
      this.props.onGoogleAuth();
    }
  }

  onClickESignatureButton() {
    const fileUrl = this.state.fileUrl;
    const users = this.state.selectedSigners.filter(obj => obj.isSelected === true);
    this.setState({
      eSignatureButtonActive: false,
    });
    this.props.sendESignatureAction(fileUrl, users);
  }

  onClickGetSignatureStatusButton() {
    setAuthProvider('eSignature');
    this.setState({
      eSignatureButtonActive: false,
      selectedSigners: [],
    });
    if (this.props.accessToken) {
      this.props.fetchSignatureStatusAction();
    } else {
      this.props.onAuth();
    }
  }

  handleSelectedSignerChange(e) {
    this.state.selectedSigners.map((obj) => {
      if (obj.checkboxId.toString() === String(e.target.value)) {
        if (e.target.checked) {
          return (obj.isSelected = true);
        }
        return (obj.isSelected = false);
      }
      return null;
    });
    this.setState({
      checkbox: false,
    });

  }

  onChangeESignatureUrl(e) {
    this.setState({
      eSignatureButtonActive: true,
      fileUrl: e.target.value,
    });
  }

  onClickSendReminderButton() {
    const selectedUsers = this.state.selectedSigners.filter(obj => obj.isSelected === true);
    selectedUsers.map((user) => {
      this.props.sendReminderAction(user);
    });
  }

  renderButton() {
    return (
      <div className="widget-content">
        <div className="container">
          <div className="buttons">
            {/* ********GET USERS BUTTON****STARTS*** */}
            {/* <div className="thinkHR_user">
              <a href="javascript:void(0)" onClick={this.onClickFetchCompaniesButton} className="primary-button">Get Users
              </a>
              <a href="javascript:void(0)" className="primary-link">Login as ThinkHR User</a>
            </div>*/}
            {/* ********GET USERS BUTTON****ENDS*** */}

            {/* ********GOOGLE AUTH BUTTON****STARTS*** */}
            {/*
             <div className="thinkHR_user">
              <div style={{ 'display': 'flex' }}>
                <div style={{
                  'alignSelf': 'center',
                  'background': '#1bd5a7',
                  'padding': '7px 0px 7px 5px',
                  'color': '#f8fcf9',
                  'borderRadius': '10px 0 0 10px',
                  'maxWidth': '150px',
                  'margin': '0 auto 10px',
                }}
                >
                  <img
                    style={{
                      'width': '30px',
                      'borderRadius': '15px',
                    }}
                    src={googleLogo}
                  />
                </div>
                <div>
                  <a
                  style={{ 'borderRadius': '0 10px 10px 0', 'paddingLeft': '5px' }}
                  href="javascript:void(0)" onClick={this.onClickGoogleAuthButton}
                  className="primary-button">Get Law Alerts</a>
                </div>
              </div>
              <div>
                <a href="javascript:void(0)" className="primary-link">Login with Google</a>
              </div>
            </div>*/}
            {/* ********GOOGLE AUTH BUTTON*****ENDS** */}
            {/* ********SEND FOR E-SIGNATURE BUTTON***STARTS**** */}
            <div className={this.state.eSignatureButtonActive ? 'thinkHR_user' : 'thinkHR_user thinkHR_user-disabled'}>
              <a
                onClick={this.onClickESignatureButton}
                className="primary-button"
              >eSignature
              </a>
              <div>
                <a href="javascript:void(0)" className="primary-link">Send For eSignature</a>
              </div>
            </div>
            {/* ********SEND FOR E-SIGNATURE BUTTON***ENDS**** */}

            {/* ********FETCH SIGNATURE STATUS BUTTON***STARTS**** */}
            <div className="thinkHR_user">
              <a href="javascript:void(0)" onClick={this.onClickGetSignatureStatusButton} className="primary-button">Get Status</a>
              <a href="javascript:void(0)" className="primary-link">Get Signature Status</a>
            </div>
            {/* ********SEND SIGNATURE  STATUS BUTTON***ENDS**** */}

            {/* ********SEND REMINDER BUTTON***STARTS**** */}
            <div className="thinkHR_user">
              <a
                onClick={this.onClickSendReminderButton}
                className="primary-button"
              >Send Reminder
              </a>
              <div>
                <a href="javascript:void(0)" className="primary-link">Send Signature Reminder</a>
              </div>
            </div>
            {/* ********SEND REMINDER BUTTON***ENDS**** */}

            {/* ********SSO BUTTON***STARTS**** */}
            {/* <div className="thinkHR_user">
              <a href="javascript:void(0)" onClick={this.onClickPaylocityButton} className="primary-button">SSO</a>
              <a href="javascript:void(0)" className="primary-link">ThinkHR SSO</a>
            </div>*/}
          </div>
        </div>
      </div>
    );
  }

  renderPaylocityUserInfo() {
    if (this.props.paylocityUserName) {
      return (
        <div className="paylocity-user-info">
          <div className="paylocity-user-type">
            <div>
              User
            </div>
            <div>
              Role
            </div>
            <div>
              Permission
            </div>
          </div>
          <div className="paylocity-user-type-value">
            <div>
              {this.props.paylocityUserName}
            </div>
            <div>
              {this.props.paylocityUserRole}
            </div>
            <div>
              {this.props.paylocityUserPermission}
            </div>
          </div>
        </div>
      );
    }
  }

  renderInputBox() {
    if (!isEmpty(this.props.companies) && isEmpty(this.props.signatures)) {
      return (
        <div className="e-signature-input-wrapper">
          <input type="text" placeholder="File Url..." onChange={this.onChangeESignatureUrl} className="e-signature-input" />
        </div>
      );
    }
    return null;
  }

  render() {
    if (this.props.isLoading || this.props.isSendSignatureLoading) {
      return (
        <section className="all">
          <div style={{
            'display': 'flex',
            'justifyContent': 'center',
            'minHeight': '200px',
            'alignItems': 'center',
            'fontWeight': '600',
          }}
          > Loading
            <svg
              version="1.1"
              id="L5"
              x="0px"
              y="0px"
              viewBox="0 0 100 100"
              enableBackground="new 0 0 0 0"
              xmlSpace="preserve"
            >
              <circle fill="black" stroke="none" cx="6" cy="50" r="6">
                <animateTransform
                  attributeName="transform"
                  dur="1s"
                  type="translate"
                  values="0 15 ; 0 -15; 0 15"
                  repeatCount="indefinite"
                  begin="0.1"
                />
              </circle>
              <circle fill="black" stroke="none" cx="30" cy="50" r="6">
                <animateTransform
                  attributeName="transform"
                  dur="1s"
                  type="translate"
                  values="0 10 ; 0 -10; 0 10"
                  repeatCount="indefinite"
                  begin="0.2"
                />
              </circle>
              <circle fill="black" stroke="none" cx="54" cy="50" r="6">
                <animateTransform
                  attributeName="transform"
                  dur="1s"
                  type="translate"
                  values="0 5 ; 0 -5; 0 5"
                  repeatCount="indefinite"
                  begin="0.3"
                />
              </circle>
            </svg>
          </div>
        </section>
      );
    }
    if (this.props.signatureSendSuccess) {
      return (
        <section className="all">
          {this.renderPaylocityUserInfo()}
          <div className="signature-send-success">
            <h2>
             Signature Request Successfully Sent.
            </h2>
          </div>
          <div className="info">
            {this.renderButton()}
          </div>
        </section>

      );
    }
    if (this.props.sendReminderSuccess) {
      return (
        <section className="all">
          {this.renderPaylocityUserInfo()}
          <div className="signature-send-success">
            <h2>
              Reminder Successfully Sent.
            </h2>
          </div>
          <div className="info">
            {this.renderButton()}
          </div>
        </section>

      );
    }
    if (this.props.error && this.props.error.message) {
      return (
        <section className="all">
          {this.renderPaylocityUserInfo()}
          <div style={{
            'padding': '20px',
            'marginTop': '10px',
            'backgroundColor': '#f7caca',
          }}
          >{this.props.error.message}
          </div>
          <div className="info">
            {this.renderButton()}
          </div>
        </section>
      );
    }
    return (
      <section className="all">
        {this.renderPaylocityUserInfo()}
        <DataGrid handleChange={this.handleSelectedSignerChange} data={this.getCompaniesData()} metadata={this.gridHeaderData()} />
        {this.renderInputBox()}
        <div className="info">
          {this.renderButton()}
        </div>
      </section>
    );
  }
}

Companies.propTypes = {
  isLoading: PropTypes.bool,
  companies: PropTypes.array,
  fetchCompaniesAction: PropTypes.func,
  sendESignatureAction: PropTypes.func,
  sendReminderAction: PropTypes.func,
  fetchSignatureStatusAction: PropTypes.func,
  error: PropTypes.object,
  paylocityUserRole: PropTypes.string,
  paylocityUserName: PropTypes.string,
  paylocityUserPermission: PropTypes.string,
  isSendSignatureLoading: PropTypes.bool,
  signatureSendSuccess: PropTypes.bool,
  signatures: PropTypes.array,
  onAuth: PropTypes.func,
  fetchAccessToken: PropTypes.func,
  sendReminderSuccess: PropTypes.bool,
};

Companies.defaultProps = {
  isLoading: false,
  companies: [],
  signatures: [],
  fetchCompaniesAction: () => {
  },
  sendESignatureAction: () => {},
  sendReminderAction: () => {},
  fetchSignatureStatusAction: () => {},
  onAuth: () => {},
  fetchAccessToken: () => {},
  error: null,
  paylocityUserRole: null,
  paylocityUserName: null,
  paylocityUserPermission: null,
  isSendSignatureLoading: false,
  signatureSendSuccess: false,
  sendReminderSuccess: false,
};

const mapStateToProps = state => ({
  isLoading: isFetchCompaniesLoading(state),
  companies: getCompanies(state),
  accessToken: getAccessToken(state),
  error: getFetchCompaniesError(state),
  sendAuthRequest: shouldSendAuthRequest(state),
  paylocityUserName: paylocityUserName(state),
  paylocityUserRole: paylocityUserRole(state),
  paylocityUserPermission: paylocityUserPermission(state),
  signatures: getSignatures(state),
  isSendSignatureLoading: isSendSignatureLoading(state),
  signatureSendSuccess: signatureSendSuccess(state),
  sendReminderSuccess: sendReminderSuccess(state),
});

const mapDispatchToProps = dispatch => ({
  fetchCompaniesAction: () => dispatch(fetchCompaniesAction()),
  fetchTokenSuccessAction: () => dispatch(fetchTokenSuccess('testToken')),
  sendESignatureAction: (fileUrl, users) => dispatch(sendESignatureAction(fileUrl, users)),
  fetchSignatureStatusAction: () => dispatch(fetchSignatureStatusAction()),
  emptySignaturesAction: () => dispatch(emptySignaturesAction()),
  fetchAccessToken: () => dispatch(fetchAccessToken()),
  sendReminderAction: user => dispatch(sendReminderAction(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Companies);
