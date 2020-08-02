import React, {
 createContext,
 useContext,
 useState,
 useEffect,
 useReducer,
} from 'react';
import axios from 'axios';
import {featuredProducts} from '../utils/helpers';
import url from '../utils/URL';
import { initialState } from './initialState';