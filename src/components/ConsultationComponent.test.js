import React from "react";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import App from "./App";

const mock = new MockAdapter(axios);

test("API call for consultation data", async () => {
  mock.onGet("http://localhost:8000/api/consultations/").reply(200, {
    topic: "Legal Consultation",
    client: "Ali",
    advisor: "Reza",
    price: 100
  });

  render(<App />);
  const message = await screen.findByText(/Consultation Data/);

  expect(message).toBeInTheDocument();
});
