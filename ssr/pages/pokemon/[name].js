import Head from "next/head";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

const getPokemon = async (key, name) => {
  if (!name) return;
  const { data } = await axios.get(
    `http://localhost:3000/api/pokemon?name=${escape(name)}`
  );
  return data;
};

const Pokemon = ({ data }) => {
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
              <Row {...{ key }}>
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

export async function getServerSideProps(context) {
  const data = await getPokemon(null, context.params.name);
  return {
    props: { data },
  };
}
