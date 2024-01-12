import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import NavComponent from './NavBar';
import RecipeCard from './RecipeCard';
import { Carousel } from 'react-bootstrap';

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

const Recipes: React.FC = (props: Props) => {
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
            <Carousel>
                {recipes?.map((recipe: recipeFormat, index: number) => (
                    <Carousel.Item>
                        <RecipeCard {...recipe} />
                    </Carousel.Item>

                ))}
            </Carousel>

        </div>

    )
}

export default Recipes