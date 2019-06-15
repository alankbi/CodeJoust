import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

// Only accessible if logged in
function ProtectedRoute({ component: Component, auth, ...args }) {
  if (auth.isAuthenticated) {
    return <Route {...args} component={Component} />;
  }
  return <Route {...args} render={() => <Redirect to="/login" />} />;
}

ProtectedRoute.propTypes = {
  auth: PropTypes.objectOf(PropTypes.object).isRequired,
  component: PropTypes.objectOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ProtectedRoute);
