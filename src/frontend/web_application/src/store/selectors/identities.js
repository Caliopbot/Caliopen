// @deprecated: use selector from identity module
import { createSelector } from 'reselect';

export const remoteIdentitySelector = state => state.remoteIdentity;
export const localIdentitySelector = state => state.localIdentity;

export const identitiesSelector = createSelector(
  localIdentitySelector, remoteIdentitySelector,
  (localIdentityState, remoteIdentityState) =>
    [...localIdentityState.localIdentities, ...remoteIdentityState.remoteIdentities]
);
