import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { useQuery } from "react-query";

import { Container, FormControl, Row, Col, Card } from "react-bootstrap";

const getPokemon = async (key, q) => {
  const { data } = await axios.get(`/api/search?q=${escape(q)}`);
  return data.map((pokemon) => ({
    ...pokemon,
    image: `/pokemon/${pokemon.name.english
      .toLowerCase()
      .replace(" ", "-")}.jpg`,
  }));
};

export default function Home() {
  const [query, setQuery] = useState("");
  const { data } = useQuery(["q", query], getPokemon);
  return (
    <div className="container">
      <Head>
        <title>Pokemon!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <FormControl
          placeholder="Search"
          aria-label="Search"
          value={query}
          onChange={(evt) => setQuery(evt.target.value)}
        />
        {data && (
          <Row>
            {data.map(({ id, name: { english }, type, image }) => (
              <Col xs={4} key={id} style={{ padding: 5 }}>
                <Link href={`/pokemon/${english}`}>
                  <Card>
                    <Card.Body>
                      <Card.Img
                        variant="top"
                        src={image}
                        style={{ maxHeight: 300 }}
                      />
                      <Card.Title>{english}</Card.Title>
                      <Card.Subtitle>{type.join(", ")}</Card.Subtitle>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}
