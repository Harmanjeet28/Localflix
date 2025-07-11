// src/components/PosterTest.jsx
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: #000;
  min-height: 100vh;
  padding: 24px;
`;

const Title = styled.h1`
  color: white;
  font-size: 1.75rem;
  margin-bottom: 24px;
  font-weight: 700;
`;

const Row = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 16px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  /* Hide scrollbar on Webkit */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;

const Poster = styled.div`
  flex-shrink: 0;
  width: 144px;
  height: 216px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.75);
  overflow: hidden;
  background-color: #222;
  position: relative;
  scroll-snap-align: center;

  &:hover {
    filter: brightness(1.1);
    cursor: pointer;
    transition: filter 0.2s ease;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  pointer-events: none;
`;

const posters = [
  "https://picsum.photos/id/1011/500/750",
  "https://picsum.photos/id/1012/400/225",
  "https://picsum.photos/id/1013/150/225",
  "https://picsum.photos/id/1014/600/900",
  // Add more poster URLs here
];

export default function PosterTest() {
  return (
    <Container>
      <Title>Netflix Style Posters (Styled Components)</Title>
      <Row>
        {posters.map((src, i) => (
          <Poster key={i}>
            <Img src={src} alt={`Poster ${i}`} draggable={false} />
          </Poster>
        ))}
      </Row>
    </Container>
  );
}
