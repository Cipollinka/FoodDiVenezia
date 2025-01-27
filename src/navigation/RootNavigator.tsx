import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Menu from 'app/components/menu';
import Home from 'app/screens/home';
import Notes from 'app/screens/notes';
import NewNote from 'app/screens/new-note';
import NewsScreen from 'app/screens/news';
import NoteDetails from 'app/screens/note-details';
import SuccessScreen from 'app/screens/success';
import DishesScreen from 'app/screens/dishes';
import Recipes from 'app/screens/all-recipes';
import NewRecipe from 'app/screens/new-recipe';
import ProfileScreen from 'app/screens/profile';
import PersonalScreen from 'app/screens/personal';
import Onboarding from 'app/screens/onboarding';
import NewsDetails from 'app/screens/new-details';
import RecipeDetails from 'app/screens/recipe-details';
import NotificationslScreen from 'app/screens/notifications';

import {useAppSelector} from 'app/store/hooks';

const Stack = createNativeStackNavigator();

const hideMenuForRoutes = ['Onboarding'];

function RootNavigator() {
  const {currentRouteName, hideWelcomeScreen} = useAppSelector(
    state => state.core,
  );

  return (
    <>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={hideWelcomeScreen ? 'Home' : 'Onboarding'}>
        <Stack.Screen name="Recipes" component={Recipes} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Success" component={SuccessScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Notes" component={Notes} />
        <Stack.Screen name="Personal" component={PersonalScreen} />
        <Stack.Screen name="News" component={NewsScreen} />
        <Stack.Screen name="NoteDetails" component={NoteDetails} />
        <Stack.Screen name="NewsDetails" component={NewsDetails} />
        <Stack.Screen name="Notifications" component={NotificationslScreen} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="NewRecipe" component={NewRecipe} />
        <Stack.Screen name="NewNote" component={NewNote} />
        <Stack.Screen name="Dishes" component={DishesScreen} />
        <Stack.Screen name="RecipeDetails" component={RecipeDetails} />
      </Stack.Navigator>

      {!currentRouteName ||
        (!hideMenuForRoutes.includes(currentRouteName) && <Menu />)}
    </>
  );
}

export default RootNavigator;
