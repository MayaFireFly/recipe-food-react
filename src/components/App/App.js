import React, {useReducer, useEffect} from 'react';
import './App.css';
import Header from '../Header/Header';
import Search from '../Search/Search';
import RecipeCard from '../RecipeCard/RecipeCard';
import Loading from '../Loading/Loading';

const initialState = {
  loading: true,
  recipeCards: [],
  recipe: {},
  errorMessage: null
};

const reducer = (state, action) => {
  switch(action.type){
  case 'SENDING_REQUEST':
    return {
      ...state,
      loading: true,
      recipeCards: [],
      recipe: {},
      errorMessage: null
    };
  case 'RECIPE_CARDS':
    return {
      ...state,
      loading: false,
      recipeCards: action.payload,
      recipe: {},
      errorMessage: null 
    };
  case 'REQUEST_ERROR':
    return {
      ...state,
      loading: false,
      recipeCards: [],
      recipe: {},
      errorMessage: action.error 
    };
  default:
    return state; 
  }
};

//your EDAMAM recipe search api_id and api_key here
const app_id = '';                
const app_key = '';

const URL = `https://api.edamam.com/search?app_id=${app_id}&app_key=${app_key}&q=`;
const INGREDIENTS_QUERY_DEFAULT = 'apple';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(
    ()=>{
      fetch(URL + INGREDIENTS_QUERY_DEFAULT)
        .then(response => {
          if(response.ok){
            return response.json();
          }else{
            throw new Error(response.status + ' ' + response.statusText + ' Error');
          }
        })
        .then(jsonResponse => {                   
          const recipes = jsonResponse.hits.map(recipe=>recipe.recipe);          
          dispatch({
            type: 'RECIPE_CARDS',
            payload: recipes
          });          
        })
        .catch(error => {          
          dispatch({
            type: 'REQUEST_ERROR',
            error: error.message
          });
        });
    },
    []
  );
  

  const search = (searchValue) => {
    dispatch({
      type: 'SENDING_REQUEST'
    });    

    fetch(URL + searchValue)
      .then(response => {
        if(response.ok){
          return response.json();
        }else{
          throw new Error(response.status + ' ' + response.statusText + ' Error');
        }
      })
      .then(jsonResponse => {        
        const recipes = jsonResponse.hits.map(recipe=>recipe.recipe);
        dispatch({
          type: 'RECIPE_CARDS',
          payload: recipes
        });         
      })
      .catch(error => {          
        dispatch({
          type: 'REQUEST_ERROR',
          error: error.message
        });
      });
  }; 

  return <div className='App'>
    <Header text='Recipes from EDAMAM'/>
    <Search search={search}/>
    {state.loading && ! state.errorMessage ? (
      <Loading/>
    ) : state.errorMessage ? (
      <div className='App-error'>{state.errorMessage}</div>
    ) : state.recipeCards.length > 0 ? (
      <div className='App-cards'>
        {state.recipeCards.map((recipeCard, index) => (
          <RecipeCard recipe={recipeCard} key={`${index}-${recipeCard.label}`}/>
        ))}
      </div>
    ) : ''}
  </div>;
};  

export default App;
