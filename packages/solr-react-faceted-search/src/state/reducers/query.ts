import { Action } from "typescript-fsa";
import {ReducerBuilder, reducerWithInitialState} from 'typescript-fsa-reducers'
import {setDisMaxQuery, setQueryFields, setSearchFields, setSelectedFilters, setSortFields, setStart} from "../actions"
const initialState: any = {
  filters: []
};

export const query = reducerWithInitialState(initialState)
  .caseWithAction(setQueryFields, (state, action: any): ReducerBuilder<any> => ({
    ...state,
    group: action.payload.group,
    hl: action.payload.hl,
    pageStrategy: action.payload.pageStrategy,
    searchFields: action.payload.searchFields,
    sortFields: action.payload.sortFields,
    size: action.payload.size,
    start: action.payload.start,
  }))
  .caseWithAction(setDisMaxQuery, (state, action: Action<any>): ReducerBuilder<any> => ({
    ...state,
    stringInput: action.payload.stringInput,
    typeDef: action.payload.typeDef,
  }))
  .caseWithAction(setSearchFields, (state, action: any): ReducerBuilder<any> => ({
    ...state,
    searchFields: action.payload.searchFields,
    start: state.query.pageStrategy === "paginate" ? 0 : null
  }))
  .caseWithAction(setSortFields, (state, action: any): ReducerBuilder<any> => ({
    ...state,
    sortFields: action.payload.sortFields,
    start: state.query.pageStrategy === "paginate" ? 0 : null
  }))
  .caseWithAction(setStart, (state, action: any): ReducerBuilder<any> => ({
    ...state,
    start: action.payload.newStart
  }))
  .caseWithAction(setSelectedFilters, (state, action: any): ReducerBuilder<any> => ({
    ...state,
    filters: action.payload.filters
  }))
