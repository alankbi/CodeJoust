import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function NavBar({ auth }) {
  return (
    <div className="navbar container">
      <nav>
        <Link to="/">
          Home
        </Link>
        {auth.isAuthenticated ? (
          <Link to="/settings">
            Settings
          </Link>
        ) : (
          <Link to="/login">
            Login
          </Link>
        )}
      </nav>
    </div>
  );
}

NavBar.propTypes = {
  auth: PropTypes.objectOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(NavBar);
