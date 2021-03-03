import {RootState} from '../store';

export const getHistory = (state: RootState) => (state.requests.requestHistory)