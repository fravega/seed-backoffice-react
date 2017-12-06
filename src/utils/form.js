// @flow
/* eslint-disable no-unused-vars, no-return-assign, react/no-multi-comp */
import React, { Component, createElement } from 'react'
import createComponent from 'redux-form-material-ui/lib/createComponent'
import { PriceInput as CustomPriceInput } from '../components/inputs'
import mapError from 'redux-form-material-ui/lib/mapError'
import MuiAutosuggest from '../components/autosuggest'
import PropTypes from 'prop-types'

export {
  Checkbox,
  RadioGroup,
  Select,
  Switch,
  TextField
} from 'redux-form-material-ui'
