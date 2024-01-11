import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import NavComponent from './NavBar';

type Props = {

}

interface recipeFormat {
    name: string,
    cook_time: number,
    calories: number,
    servings: number,
    ingredients: string[],
    cooking_instructions: string[]
}

const Recipes = (props: Props) => {
    const { state } = useLocation();
    const [recipes, setRecipes] = useState<recipeFormat[] | null>(null)
    console.log(state)

    useEffect(() => {
        const inLen = state.length
        const parsed = state.substring(8, inLen - 4)
        const parseJson = JSON.parse(parsed)
        setRecipes(parseJson)
    }, [recipes])


    console.group(recipes)

    return (
        <div>
            <NavComponent />
            {recipes?.map((recipe: recipeFormat, index: number) => (
                <div>
                    <h1 key={index}>{recipe.name}</h1>
                    <div className='recipe-state'>
                        <h3>Cook Time: {recipe.cook_time}</h3>
                        <h3>Calories: {recipe.calories}</h3>
                        <h3>Servings: {recipe.servings}</h3>

                    </div>
                </div>
            ))}
        </div>

    )
}

export default Recipes