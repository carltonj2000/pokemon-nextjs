import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import { useQuery } from "react-query";
import { Container, Row, Col } from "react-bootstrap";

const getPokemon = async (key, name) => {
  if (!name) return;
  const { data } = await axios.get(`/api/pokemon?name=${escape(name)}`);
  return data;
};

const Pokemon = () => {
  const router = useRouter();
  const { data } = useQuery(["name", router.query.name], getPokemon);
  if (!data) return null;
  const { name, type } = data;
  const image = `/pokemon/${name.english.toLowerCase().replace(" ", "-")}.jpg`;
  return (
    <div>
      <Head>
        <title>{(data && data.name.english) || "Pokemon"}</title>
      </Head>

      <Container>
        <h1>{name.english}</h1>
        <Row>
          <Col xs={4}>
            <img src={image} style={{ width: "100%" }} />
          </Col>
          <Col xs={8}>
            {Object.entries(data.base).map(([key, value]) => (
              <Row>
                <Col xs={2}>{key}</Col>
                <Col xs={10}>{value}</Col>
              </Row>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Pokemon;
