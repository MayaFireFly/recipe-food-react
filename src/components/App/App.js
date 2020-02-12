import React, {useReducer, useEffect} from 'react';
import './App.css';
import Header from '../Header/Header';
import Search from '../Search/Search';
import Recipe from '../Recipe/Recipe';
import RecipeCard from '../Recipe/RecipeCard';
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
  case 'RECIPE':
    return {
      ...state,
      loading: false,
      recipeCards: [],
      recipe: action.payload,
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

const x_rapidapi_host = 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com';
const	x_rapidapi_key = '78f79a5905msh6853cb2b3677d2dp117142jsnb799e053d58d';

const URL = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes';
const INGREDIENTS = '/findByIngredients';
const INGREDIENTS_QUERY_DEFAULT = 'number=5&ranking=1&ignorePantry=false&ingredients=apples%2Cflour%2Csugar';
const RECIPE = '/information';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(
    ()=>{
      fetch(URL + INGREDIENTS + '?' + INGREDIENTS_QUERY_DEFAULT, 
        {
          headers:{
            'x_rapidapi_host': x_rapidapi_host,
            'x_rapidapi_key': x_rapidapi_key
          }
        }
      )
        .then(response => response.json())
        .then(jsonResponse => {
          if(!jsonResponse.error){
            dispatch({
              type: 'RECIPE_CARDS',
              payload: jsonResponse
            });
          }else{
            dispatch({
              type: 'REQUEST_ERROR',
              error: jsonResponse.error
            });
          }
        });
    },
    []
  );

  const prepareSearchValue = (searchValue) => {
    let values = '';
    if(searchValue.indexOf(',') !== -1){
      values += searchValue.replace(' ', '');
    }else if(searchValue.indexOf(' ') !== -1){
      const vals = searchValue.split(' ');
      for(let val_id = 0; val_id < vals.length; val_id++){
        values += vals[val_id] + ',';
      }
      values = values.substr(0, values.length - 1);
    }else{
      values = searchValue;
    }
    return values;
  };

  const search = (searchValue) => {
    dispatch({
      type: 'SENDING_REQUEST'
    });

    const ingredients = prepareSearchValue(searchValue);

    fetch(URL + INGREDIENTS + '?' + ingredients,
      {
        headers:{
          'x_rapidapi_host': x_rapidapi_host,
          'x_rapidapi_key': x_rapidapi_key
        }
      }
    )
      .then(response => response.json())
      .then(jsonResponse => {
        if(!jsonResponse.error){
          dispatch({
            type: 'RECIPE_CARDS',
            payload: jsonResponse
          });
        }else{
          dispatch({
            type: 'REQUEST_ERROR',
            error: jsonResponse.error
          });
        }        
      });
  };

  const showRecipe = () => {};

  return <div className='App'>
    <Header text='Recipe food nutrition'/>
    <Search search={search}/>
    {state.loading && ! state.errorMessage ? (
      <Loading/>
    ) : state.errorMessage ? (
      <div className='App-error'>{state.errorMessage}</div>
    ) : state.recipeCards.length > 0 ? (
      state.recipeCards.map((recipeCard, index) => (
        <RecipeCard recipe={recipeCard} key={`${index}-${recipeCard.title}`}/>
      ))
    ) : state.recipe && state.recipe.id && state.recipe.id !== '' ? (
      state.recipe.map((recipe, index) => (
        <Recipe recipe={recipe} key={`${index}-${recipe.id}`}/> 
      ))
    ) : ''}
  </div>;
};  

export default App;