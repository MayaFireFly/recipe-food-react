import React, {useState} from 'react';

const Search = (props) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChangeInput = (e) => {
    setSearchValue(e.target.value);
  };

  const clearInput = () => {
    setSearchValue('');
  };

  const submitSearch = (e) => {
    e.preventDefault();
    props.search(searchValue);
    clearInput();
  };

  return <form className='form-search'>
    <input type='text' onChange={handleChangeInput} value={searchValue}/>
    <input type='submit' onClick={submitSearch} value='SEARCH'/>
  </form>;
};

export default Search;