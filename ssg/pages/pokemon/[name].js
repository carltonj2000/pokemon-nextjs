import Head from "next/head";
import { Container, Row, Col } from "react-bootstrap";

import pokemon from "../../pokemon.json";

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

export async function getStaticPaths() {
  return {
    paths: pokemon.map(({ name: { english } }) => ({
      params: {
        name: english,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  return {
    props: {
      data: pokemon.filter(
        ({ name: { english } }) => english === context.params.name
      )[0],
    },
  };
}
