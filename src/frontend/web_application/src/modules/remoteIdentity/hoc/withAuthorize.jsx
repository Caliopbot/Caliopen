import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withAuthorizePopup } from './withAuthorizePopup';
import { getProvider } from '../services/getProvider';

export const withAuthorize = () => (C) => {
  @withAuthorizePopup()
  class Wrapper extends Component {
    static propTypes = {
      initPopup: PropTypes.func.isRequired,
      authorizePopup: PropTypes.func.isRequired,
    }

    authorize = async ({ providerName }) => {
      const {
        initPopup, authorizePopup,
      } = this.props;
      initPopup({ providerName });

      const provider = await getProvider({ providerName });

      return authorizePopup({ provider });
    }

    render() {
      const {
        initPopup, authorizePopup, ...props
      } = this.props;

      return (
        <C authorize={this.authorize} {...props} />
      );
    }
  }

  return Wrapper;
};
