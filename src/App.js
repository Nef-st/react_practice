import React,{ useState, useEffect } from 'react';
import Collection from './comonents/Collection';
import './index.scss';

const cats = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
];


function App() {
  const [categoryId, setCategoryId] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : ``;

    fetch(`https://635d13dfcb6cf98e56ac5742.mockapi.io/photos?page=${page}&limit=3&${category}`)
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
    })
    .catch ((err) => {
      console.warn(err);
      alert("Error");
    }) 
    .finally (setIsLoading(false))
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {
            cats.map((obj, index) => 
              <li 
                onClick={() => setCategoryId(index)}
                className={categoryId === index ? "active" : ""} 
                key={index}
              >
                {obj.name}
              </li>)
          }
        </ul>
        <input 
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          className="search-input" 
          placeholder="Поиск по названию" 
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Идет загрузка...</h2>
        ) : (
          collections.filter(obj => {
            return obj.name.toLowerCase().includes(searchValue.toLowerCase());  
          }).map((obj, index) => (
            <Collection
              key={index}
              name={obj.name}
              images={obj.photos}
            />
          ))
        )}
      </div>
      <ul className="pagination">
        {
          [...Array(3)].map((_,i) => 
            <li
              onClick={() => setPage(i + 1)}
              className={page === (i + 1) ? "active" : ""}
            >
              {i + 1}
            </li>
          )
        }
      </ul>
    </div>
  );
}

export default App;
