import React from 'react'
import './RecipeCard.scss'
import { Button } from 'react-bootstrap'
type Props = {
    name: string,
    cook_time: number,
    calories: number,
    servings: number,
    ingredients: string[],
    cooking_instructions: string[]
}

const RecipeCard = (props: Props) => {

    return (
        <div className='recipeCard'>
            <h1 className='recipeHeader'>{props.name}</h1>
            <div className='stats'>
                <div className='item'>
                    <h3>Cook Time</h3>
                    <p>{props.cook_time}</p>
                </div>
                <div className='item'>
                    <h3>Calories</h3>
                    <p>{props.calories}</p>
                </div>
                <div className='item'>
                    <h3>Servings</h3>
                    <p>{props.servings}</p>
                </div>
            </div>
            <div className='details'>
                <h3>Ingredients</h3>
                <ul>
                    {props.ingredients.map((ingredient: string, index: number) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
                <h3>Instructions</h3>
                <ol>
                    {props.cooking_instructions.map((instruction: string, index: number) => (
                        <li key={index}>{instruction}</li>
                    ))}
                </ol>
            </div>
            <div className='buttons'>
                <Button variant='success'>Save Recipe</Button>
                <Button variant='light'>Search Recipe</Button>

            </div>


        </div>
    )
}

export default RecipeCard