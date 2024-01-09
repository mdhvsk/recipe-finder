import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Col, Nav } from 'react-bootstrap';

type Props = {
    onLogout: () => void; // Callback function when logout is clicked
};

const NavComponent: React.FC<Props> = ({ onLogout }) => {
    const [userName, setUserName] = useState<string>('');

    // Simulate fetching user's name from a database
    useEffect(() => {
        const fetchUserName = async () => {
            // Replace this with your actual API call
            const response = await fetch('/api/user');
            const data = await response.json();
            setUserName(data.name);
        };

        fetchUserName().catch(console.error);
    }, []);


    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">AI Recipe Finder</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Search</Nav.Link>
                        <Nav.Link href="#link">Recipes</Nav.Link>
                    </Nav>
                </Navbar.Collapse>

                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Mark Otto
                    </Navbar.Text>
                    <Col xs="auto">
                        <Button type="submit">Logout</Button>
                    </Col>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

};




export default NavComponent;
