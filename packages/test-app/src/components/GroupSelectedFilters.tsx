import React, {ReactElement} from "react"
import {connect} from "react-redux"
import {setDisMaxQuery, setSelectedFilters, setStart} from "solr-react-faceted-search"
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close'
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import List from "@material-ui/core/List"
import { makeStyles } from '@material-ui/core/styles'

interface IGroupSelectedFilters {
  filters: IFilters;
  setDisMaxQuery: Function;
  setSelectedFilters: Function;
  setStart: Function;
  stringInput: string;
}

interface IFilters {
  [field: string]: string[];
}

const useStyles = makeStyles((): any => ({
  icon: {
    fontSize: 20,
  },
}))


const GroupSelectedFiltersComponent: React.FC<any> = (props: IGroupSelectedFilters): ReactElement => {
  const {filters, setSelectedFilters, setStart} = props
  const classes: any = useStyles()

  const onClose = (field: any, filter: any): void => {
    const newFilters = filters[field].filter((f): any => f !== filter)
    setSelectedFilters({field, filters: newFilters})
    setStart({newStart: 0})
  }

  const buildFilters = (filters): any => {
    const values = Object.values(filters)
    return values && values[0] !== undefined && Object.entries(filters).map(([field, values]): any =>
      (values as []).map((val, key): ReactElement => {
        return (
          <ListItem
            button
            component='div'
            dense key={key}>
            <ListItemText primary={val}/>
            <IconButton
              href=''
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={(): void => onClose(field, val)}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>
          </ListItem>)
      }))
  }

  return (
    <List style={{display: 'flex'}} component="nav">
      {buildFilters(filters)}
    </List>
  )
}

const mapStateToProps = (state): any => ({
  filters: state.query.filters
})

const mapDispatchToProps = {setDisMaxQuery, setSelectedFilters, setStart}

export const GroupSelectedFilters = connect(mapStateToProps, mapDispatchToProps)(GroupSelectedFiltersComponent)