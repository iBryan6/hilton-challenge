import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen, act, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "isomorphic-unfetch";
import IndexPage from "./index";

const server = setupServer(
  rest.get("https://api.openweathermap.org/*", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        cod: 200,
        name: "Key West",
        weather: [
          {
            description: "broken clouds",
            icon: "04d",
            id: 803,
            main: "Clouds",
          },
        ],
        main: {
          temp: 295.372,
        },
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup;
});
afterAll(() => server.close());

test("it shows form with no results", () => {
  const { getByTestId, queryByTestId } = render(<IndexPage />);

  expect(getByTestId("weather-form")).toBeTruthy();
  expect(getByTestId("weather-input")).toBeTruthy();
  expect(getByTestId("weather-button")).toBeTruthy();
  expect(queryByTestId("weather-city-info-container")).toBeNull();
});

test("it types in input", () => {
  const { getByTestId } = render(<IndexPage />);
  const input = getByTestId("weather-input");

  userEvent.type(input, "Key West");
  expect(input.value).toBe("Key West");
});

test("it searches city and gets results", async () => {
  act(() => {
    render(<IndexPage />);
  });
  const input = screen.getByTestId("weather-input");
  const button = screen.getByTestId("weather-button");
  userEvent.type(input, "Key West");
  expect(input.value).toBe("Key West");
  userEvent.click(button);
  await waitFor(() => {
    expect(screen.getByTestId("weather-city-info-container")).toBeTruthy();
    expect(screen.getByText("broken clouds")).toBeTruthy();
  });
});

test("it handles no results", async () => {
  act(() => {
    render(<IndexPage />);
  });
  server.use(
    rest.get("https://api.openweathermap.org/*", (req, res, ctx) => {
      return res(
        ctx.status(404),
        ctx.json({
          cod: 404,
        })
      );
    })
  );
  const input = screen.getByTestId("weather-input");
  const button = screen.getByTestId("weather-button");
  userEvent.type(input, "SummerlandKey1");
  expect(input.value).toBe("SummerlandKey1");
  userEvent.click(button);
  await waitFor(() => {
    expect(screen.getByTestId("weather-city-info-container")).toBeTruthy();
    expect(screen.getByText("NO RESULTS!")).toBeTruthy();
  });
});
