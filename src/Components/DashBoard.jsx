// Components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import Charts from './Charts';
import Sidebar from './SideBar';
import './Dashboard.css';

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
        const res = await fetch(
          'https://api.spoonacular.com/recipes/complexSearch?query=pasta&number=50&addRecipeInformation=true&apiKey=4c038f219a20408b8a11a8e4b4a10fda'
        );
        const data = await res.json();
        if (!data?.results) throw new Error("Invalid API response");

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
      } catch (err) {
        console.error('Error fetching:', err);
      }
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDishType =
      !filterDishType ||
      recipe.dishTypes?.some(type => type.toLowerCase().includes(filterDishType.toLowerCase()));
    return matchesSearch && matchesDishType;
  });

  return (
    <div className="page-layout">
      <Sidebar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterDishType={filterDishType}
        setFilterDishType={setFilterDishType}
      />
      <div className="dashboard">
      <h1 style={{
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  fontSize: '3rem',
  fontWeight: 700,
  letterSpacing: '0.15rem',
  color: '#2c3e50',
  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
  padding: '20px 0',
  margin: 0,
  borderBottom: '2px solid #e67e22'
}}>
  SPOONACULAR
</h1>

        <div className="summary-stats">
          <div>Total from API: {stats.total}</div>
          <div>Currently Showing: {filteredRecipes.length}</div>
          <div>Average Prep Time: {stats.averagePrepTime} min</div>
        </div>

        <div className="recipe-list">
          {filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

        <Charts recipes={filteredRecipes} />
      </div>
    </div>
  );
};

export default Dashboard;
