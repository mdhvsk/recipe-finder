import React, { useState, FormEvent } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import "./SearchBar.scss"

import { getTrial } from '../services/recipeService';
import axios from 'axios';
import NavComponent from './NavBar';

import { useNavigate } from 'react-router-dom';


const SearchBar: React.FC = () => {
    const [textFields, setTextFields] = useState(['']);
    const [recipeCount, setRecipeCount] = useState(1);
    const [cuisine, setCuisine] = useState('Global')
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);


    const handleAddIngredient = () => {
        setTextFields([...textFields, '']);
    };

    const onLogout = (): string => {
        return 'string'
    }

    const handleRecipeCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRecipeCount(parseInt(e.target.value))
    }

    const handleRemoveIngredient = (index: number) => {
        const newTextFields = textFields.filter((_, i) => i !== index);
        setTextFields(newTextFields);
    };

    const handleTextFieldChange = (index: number, event: React.ChangeEvent<any>) => {
        const newTextFields = [...textFields];
        newTextFields[index] = event.target.value;
        setTextFields(newTextFields);
    };

    const handleCuisineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCuisine(e.target.value)
    }


    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()

        const context = "You are a assistant that returns all answers in json. "
        const msgVariables = "Give me " + recipeCount + " recipes from the " + cuisine + " cuisine that uses " + textFields
        const formatting = "The json should be formatted as a list. Each item of the list will have the following and be named as: name, cook_time, calories, servings, ingredients, cooking instructions. The calories, servings, and cook time should be integers. The ingredients and cooking instructions will be a list of strings"
        const formData = {
            "message": context + msgVariables + formatting
        }

        setIsLoading(true)

        try {
            const response = await axios.post('/chat', formData)
            console.log('Response: ', response.data.message.content)
            navigate('/recipes', { state: response.data.message.content })
        } catch (e) {
            console.error("Error submitting form", e)
        }
    }

    const countries = ['Global', 'American', 'Indian', 'Chinese', 'Greek', 'Mexican', 'Italian', 'Japanese'];

    return (
        <div>


            <NavComponent />

            <Form className='searchBar' onSubmit={handleSubmit}>

                <h2>Search New Recipes</h2>
                <Row>
                    <Col>
                        <Form.Group controlId="formNumber">
                            <Form.Label>Number of Recipes (1-10)</Form.Label>
                            <Form.Control type="number" value={recipeCount} min="1" max="10" onChange={handleRecipeCountChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formCountry">
                            <Form.Label>Country of Origin</Form.Label>
                            <Form.Control value={cuisine} as="select" onChange={handleCuisineChange}>
                                {countries.map(country => (
                                    <option key={country}>{country}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>

                </Row>

                {textFields.map((textField, index) => (
                    <Row key={index}>
                        <Form.Label>Ingredient {index + 1}</Form.Label>

                        <Col>
                            <Form.Group controlId={`formTextField${index}`}>
                                <Form.Control
                                    type="text"
                                    value={textField}
                                    onChange={(e) => handleTextFieldChange(index, e)}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs="auto">
                            <Button variant="danger" onClick={() => handleRemoveIngredient(index)}>
                                Remove
                            </Button>
                        </Col>
                    </Row>
                ))}


                <Row className="d-grid gap-3" id="buttons">
                    <Button variant="secondary" size="sm" onClick={handleAddIngredient}>
                        Add Ingredient +
                    </Button>
                    <Button type="submit" variant="primary" size="lg">
                        Test Get
                    </Button>
                </Row>
            </Form>
            {isLoading && <img src="loading.gif" alt="Loading answer" className='loading' />}
        </div>
    );
};

export default SearchBar;
