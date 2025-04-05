import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import './Dashboard.css';

const dishTypeOptions = [
  'main course', 'side dish', 'dessert', 'appetizer', 'salad',
  'bread', 'breakfast', 'soup', 'beverage', 'sauce',
  'marinade', 'fingerfood', 'snack', 'drink'
];

const Dashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDishType, setFilterDishType] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    averagePrepTime: 0,
    filteredCount: 0,
  });

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          'https://api.spoonacular.com/recipes/complexSearch?query=pasta&number=50&addRecipeInformation=true&apiKey=fa7c5a3f0b204c3e9c4215797217bcca'
        );
        const data = await response.json();

        const shuffled = data.results.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 10);

        const totalTime = selected.reduce((sum, r) => sum + (r.readyInMinutes || 0), 0);
        const averageTime = selected.length ? (totalTime / selected.length).toFixed(1) : 0;

        setRecipes(selected);
        setStats({
          total: data.totalResults,
          averagePrepTime: averageTime,
          filteredCount: selected.length,
        });
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDishType =
      filterDishType === '' ||
      (recipe.dishTypes &&
        recipe.dishTypes.some((type) =>
          type.toLowerCase().includes(filterDishType.toLowerCase())
        ));
    return matchesSearch && matchesDishType;
  });

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Delicious Recipes Dashboard</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={filterDishType}
            onChange={(e) => setFilterDishType(e.target.value)}
          >
            <option value="">All Dish Types</option>
            {dishTypeOptions.map((type) => (
              <option key={type} value={type}>
                {type[0].toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="summary-stats">
          <div>Total from API: {stats.total}</div>
          <div>Currently Showing: {filteredRecipes.length}</div>
          <div>Average Prep Time: {stats.averagePrepTime} mins</div>
        </div>
      </header>
      <div className="recipe-list">
        {filteredRecipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
