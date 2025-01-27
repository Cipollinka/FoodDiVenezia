import {createSlice} from '@reduxjs/toolkit';

export interface Recipe {
  recipe_id?: string;
  title: string;
  name?: string;
  color?: string;
  description: string;
  image?: string;
  category?: string;
  preparation_time: string;
}

export interface Note {
  id?: string;
  name: string;
  category?: string;
  color: string;
  description: string;
  images: string[];
}

export interface UserInfo {
  name: string;
  notifications: boolean;
  email: string;
}

export interface CoreState {
  recipies: Recipe[];
  notes: Note[];
  userInfo?: UserInfo | null;
  currentRouteName?: string;
  hideWelcomeScreen: boolean;
}

const initialState: CoreState = {
  recipies: [],
  notes: [],
  userInfo: null,
  hideWelcomeScreen: false,
  currentRouteName: 'Home',
};

export const coreSlice = createSlice({
  name: 'core',
  initialState,
  reducers: {
    reset(state) {
      state.recipies = [];
      state.notes = [];
      state.userInfo = null;
      state.currentRouteName = 'Home';
      state.hideWelcomeScreen = false;
    },
    addNote(state, action) {
      state.notes = [...(state.notes || []), action.payload];
    },
    addRecipe(state, action) {
      state.recipies = [...(state.recipies || []), action.payload];
    },
    removeRecipe(state, action) {
      state.recipies = state.recipies.filter(
        item => item.recipe_id !== action.payload,
      );
    },
    removeNote(state, action) {
      state.notes = state.notes.filter(item => item.id !== action.payload);
    },
    setUserInfo: (state, action) => {
      state.userInfo = {...(state.userInfo || {}), ...action.payload};
    },
    setCurrentRouteName(state, action) {
      state.currentRouteName = action.payload;
    },
    setHideWelcomeScreen(state, action) {
      state.hideWelcomeScreen = action.payload;
    },
  },
});

export const {
  reset,
  addRecipe,
  addNote,
  removeRecipe,
  setUserInfo,
  removeNote,
  setCurrentRouteName,
  setHideWelcomeScreen,
} = coreSlice.actions;
