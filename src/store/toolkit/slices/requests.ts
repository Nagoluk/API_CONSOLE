import { createSlice } from '@reduxjs/toolkit'
import {IRequests} from '../../../interfaces/requests';


export const requestsSlice = createSlice({
  name: 'requests',
  initialState: {
   requestHistory: [] as IRequests[],
    requestField: "",
    responseField: "",
    requestError: "",
    responseError: "",
  },
  reducers: {
    sendRequest: () => {},

    setResponseField: (state, action) => {
      state.responseField = action.payload
    },

    setRequestField: (state, payload) => {
      state.requestField = payload.payload
    },

    setResponseError: (state, action) => {
      state.responseError = action.payload
    },
    setRequestError: (state, {payload}) => {
      state.requestError = payload;
    },

    addRequest: (state,action) => {
      if(state.requestHistory.length > 20) {
        state.requestHistory.pop()
      }
      if(action.payload.action) {
        state.requestHistory = state.requestHistory.filter(item => item.action !== action.payload.action)
        state.requestHistory.push(action.payload as IRequests)

      }else {
        state.requestHistory = state.requestHistory.filter(item => item.request !== action.payload.request)
        state.requestHistory.push({...action.payload, action: "unknow"} as IRequests)
      }

      localStorage.setItem('requests', JSON.stringify(state.requestHistory));
    },

    clearAll: state => {
      localStorage.removeItem('requests')
      state.requestHistory = []
    },

    getHistoryFromLocalStore: state => {
      const historyTemp = localStorage.getItem('requests')
      if(historyTemp){
        state.requestHistory = JSON.parse(historyTemp)
      }else {
        state.requestHistory = []
      }
    },

    deleteItem: (state, {payload}) => {
      state.requestHistory = state.requestHistory.filter((_, index) => index !== payload)
      localStorage.setItem('requests', JSON.stringify(state.requestHistory));
    }
  }
})

export const { addRequest,
              clearAll,
              getHistoryFromLocalStore,
              deleteItem,
              sendRequest,
              setRequestField,
              setRequestError,
              setResponseError,
              setResponseField
} = requestsSlice.actions

export default requestsSlice.reducer