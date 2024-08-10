'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function RecipePage() {

    const [recipeItems, setRecipeItems] = useState('');
    const [recipeData, setRecipeData] = useState(null);

    const fetchRecipe = async () => {
      const mockApiResponse = {
        "items": ["eggs", "cheese"],
        "recipe": `
          What a great start!\n\nHere's a simple yet delicious recipe that you can whip up using eggs and cheese:\n\n
          **1. Recipe Name:** Cheesy Scrambled Eggs\n\n
          **2. Brief description:** A classic breakfast dish that's easy to make and packed with flavor. Fluffy scrambled eggs infused with melted cheese - what's not to love?\n\n
          **3. Ingredients:**\n\n
          * 2 eggs\n
          * 1/4 cup grated cheese (any type, e.g., cheddar, mozzarella, or a mix)\n
          * Salt and pepper to taste\n
          * 1 tablespoon butter or oil\n\n
          **4. Instructions:**\n\n
          1. Crack the eggs into a bowl and whisk them together with a pinch of salt and pepper until the whites and yolks are fully incorporated.\n
          2. Heat a non-stick skillet over medium heat and add the butter or oil. Once melted, pour in the eggs.\n
          3. Let the eggs cook for about 30 seconds until the edges start to set.\n
          4. Sprinkle the grated cheese over the eggs.\n
          5. Use a spatula to gently scramble the eggs, breaking them up into curdy bits. Don't overmix!\n
          6. Continue cooking for another 30-45 seconds, until the eggs are cooked through and the cheese is melted and gooey.\n
          Can't wait for you to try this simple yet delicious recipe!
        `
      };
      setRecipeData(mockApiResponse);
      console.log(recipeData);
    };

    const renderRecipe = (recipe) => {
      const parts = recipe.split(/(\*\*[^*]+\*\*)/g); // Split on '**...**' but keep the '**' markers
    
      return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={index}>{part.slice(2, -2)}</strong> // Remove '**' and wrap text in <strong>
          );
        } else {
          return <span key={index}>{part}</span>; // Regular text
        }
      });
    };
    

    const handleSubmit = (e) => {
      e.preventDefault();
      fetchRecipe();
      console.log("recipe items", recipeItems);
    };


    return (
      <div className={styles.container}>
        <Head>
          <title>Recipe Recommender</title>
          <meta name="description" content="Recipe Recommender" />
          <link rel="icon" href="favicon.ico" />
        </Head>

      <main className="bg-gray-100 p-8 min-h-screen w-full">
      <div className="w-full">
        <Link href="/">
          <button className="px-6 py-3 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 ml-8 float-left">
            Back
          </button>
        </Link>
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Recipe Recommender
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recipeItems">
            Recommends recipes from available pantry items
          </label>
          <div className="flex w-full">
            <input
              type="text"
              id="recipeItems"
              name="recipeItems"
              className="flex-grow px-6 py-3 border rounded-l-lg text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter pantry items"
              value={recipeItems}
              onChange={(e) => setRecipeItems(e.target.value)}
            />
            <button type="submit" className="px-6 py-3 ml-2 bg-blue-500 text-white rounded-r-lg font-semibold hover:bg-blue-600">
              Suggest Recipe
            </button>
          </div>
        </div>

      </form>

      {recipeData && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Items:</h2>
            <ul className="list-disc font-semibold pl-5 mb-4 ">
              {recipeData.items.map((item, index) => (
                <li key={index} className="text-gray-700">{item}</li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold mb-4">Recipe:</h2>
            <div className="text-gray-700 whitespace-pre-line">
              {recipeData && renderRecipe(recipeData.recipe)}
            </div>
          </div>
        )}

    </main>
    </div>
    );
  }