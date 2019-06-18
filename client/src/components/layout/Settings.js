import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { logOut } from '../../store/actions/authActions';

export class Settings extends React.Component {
  constructor() {
    super();
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  onLogoutClick(e) {
    e.preventDefault();

    // eslint-disable-next-line react/destructuring-assignment
    this.props.logOut();
    const { history } = this.props;
    history.push('/login');
  }

  render() {
    const { auth } = this.props;
    return (
      <div className="settings container">
        <h1>Settings</h1>
        <h3>Username</h3>
        <p>{auth.user.username}</p>
        <h3>Email</h3>
        <p>{auth.user.email}</p>
        <button type="submit" className="logout-button" onClick={this.onLogoutClick}>Logout</button>
      </div>
    );
  }
}

Settings.propTypes = {
  auth: PropTypes.objectOf(PropTypes.object).isRequired,
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  logOut: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logOut })(withRouter(Settings));
