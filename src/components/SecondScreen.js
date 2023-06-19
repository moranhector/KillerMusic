import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

function SecondScreen() {
    const { param1, param2 } = useParams();

    const [album, setAlbum] = useState([]);
    const [tapaAlbum, setTapaAlbum] = useState("");
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        const searchParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + param2
            }
        };

        fetch(`https://api.spotify.com/v1/albums/${param1}/tracks`, searchParameters)
            .then(response => response.json())
            .then(data => {
                setTracks(data.items);
                console.log(data.items);
            });

        fetch(`https://api.spotify.com/v1/albums/${param1}`, searchParameters)
            .then(response => response.json())
            .then(data => {
                setTapaAlbum(data.images[0].url);
            });
    }, [param1, param2]);

    return (
        <Container>
            <Row className="mt-3">
                <Col>
                    <Card>
                        <Card.Img variant="top" src={tapaAlbum} />
                        <Card.Body>
                            <Card.Title>Álbum</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <h2>Lista de canciones</h2>
                    <ListGroup>
                        {tracks.map(track => (
                            <ListGroup.Item key={track.id}>

                                <span>{track.track_number}. </span>
                                {track.name}
                                <span className="ml-2">Duración: {track.duration_ms} ms</span>
                                <input type="number" min="1" max="10" placeholder="Calificación" />

                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
}

export default SecondScreen;
