import { getLocalIdentities } from './getLocalIdentities';
import { getRemoteIdentities } from './getRemoteIdentities';
import { identitiesSelector } from '../selectors/identitiesSelector';

export const getIdentities = () => async (dispatch, getState) => {
  await Promise.all([
    dispatch(getLocalIdentities()),
    dispatch(getRemoteIdentities()),
  ]);

  return identitiesSelector(getState());
};
