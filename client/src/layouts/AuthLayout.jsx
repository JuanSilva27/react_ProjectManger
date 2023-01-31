import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
         <Container>
            <Outlet></Outlet>
         </Container>
  );
};
