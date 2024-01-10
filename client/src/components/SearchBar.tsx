import React, { useState, FormEvent } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import "./SearchBar.scss"

import { getTrial } from '../services/recipeService';
import axios from 'axios';


const SearchBar: React.FC = () => {
    const [textFields, setTextFields] = useState(['']);
    const [recipeCount, setRecipeCount] = useState(1);
    const [country, setCountry] = useState('Global')

    const [trial, setTrial] = useState('')

    const handleAddIngredient = () => {
        setTextFields([...textFields, '']);
    };

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

    const handleTrial = async () => {
        console.log("Made it to trial")
        try {
            const data = await getTrial()
            setTrial(data)
            console.log(trial)
        } catch (e) {
            console.error('Failed to get trial', e)
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        console.log("Made it to sybmit")
        const context = "You are a "
        e.preventDefault()
        const formData = {
            "message": "WHat color is the sky?"
        }

        try {
            const response = await axios.post('/chat', formData)
            console.log('Response: ', response.data.message.content)
        } catch (e) {
            console.error("Error submitting form", e)
        }
    }


    // You can replace this with actual country data
    const countries = ['Global', 'American', 'Indian', 'Chinese', 'Greek', 'Mexican', 'Italian', 'Japanese'];

    return (
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
                        <Form.Control as="select">
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
                <Button variant="primary" size="lg" onClick={handleTrial}>
                    Test Get
                </Button>
                <Button type="submit" variant="primary" size="lg">
                    Test Get
                </Button>
            </Row>
        </Form>
    );
};

export default SearchBar;
