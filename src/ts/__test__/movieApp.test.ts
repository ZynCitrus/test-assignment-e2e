import axios from 'axios';
import { handleSubmit, createHtml, displayNoResult } from '../movieApp';
import { getData } from '../services/movieservice';
import { IMovie } from '../models/Movie';

// Mock axios get method and provide a sample response
jest.mock('../services/movieservice');
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockResponse = {
  data: {
    Search: [
      {
        Title: 'Movie 1',
        imdbID: '1',
        Type: 'Movie',
        Poster: 'poster1.jpg',
        Year: '2021',
      },
      {
        Title: 'Movie 2',
        imdbID: '2',
        Type: 'Movie',
        Poster: 'poster2.jpg',
        Year: '2022',
      },
    ],
  },
};
mockedAxios.get.mockResolvedValue(mockResponse);

describe('movieApp functions', () => {
  test('handleSubmit calls getData with the correct search text', async () => {
    // Mock the DOM elements
    document.body.innerHTML = `
      <form id="searchForm">
        <input id="searchText" type="text" value="Avengers">
      </form>
      <div id="movie-container"></div>
    `;
  
    // Call the handleSubmit function
    await handleSubmit();
  
    // Verify that getData is called with the correct search text
    expect(getData).toHaveBeenCalledWith('Avengers');
  });
  

  describe("createHtml", () => {
    test("creates the HTML elements correctly", () => {
      const movies: IMovie[] = [
        {
          Title: "Movie 1",
          imdbID: "1",
          Type: "Movie",
          Poster: "poster1.jpg",
          Year: "2021",
        },
        {
          Title: "Movie 2",
          imdbID: "2",
          Type: "Movie",
          Poster: "poster2.jpg",
          Year: "2022",
        },
      ];
      const container = document.createElement("div");
  
      createHtml(movies, container);
  
      // Verify that the container has the correct number of child elements
      expect(container.children.length).toBe(2);
  
      // Verify that the child elements are created correctly
      expect(container.children[0].tagName).toBe("DIV");
      expect(container.children[0].classList.contains("movie")).toBe(true);
      expect(container.children[0].querySelector("h3")?.innerHTML).toBe("Movie 1");
      expect(container.children[0].querySelector("img")?.src).toContain("poster1.jpg");
  
      expect(container.children[1].tagName).toBe("DIV");
      expect(container.children[1].classList.contains("movie")).toBe(true);
      expect(container.children[1].querySelector("h3")?.innerHTML).toBe("Movie 2");
      expect(container.children[1].querySelector('img')?.src).toContain('poster2.jpg');
    });
  });
  
  describe("displayNoResult", () => {
    test("displays 'Inga sökresultat att visa'", () => {
      const container = document.createElement("div");
  
      displayNoResult(container);
  
      expect(container.innerHTML).toContain('Inga sökresultat att visa');
    });
  });
  
  test('displayNoResult displays the "No search results" message', () => {
    const container = document.createElement('div');

    displayNoResult(container);

    // Verify that the container has the correct child element
    expect(container.children.length).toBe(1);

    // Verify that the child element is created correctly
    expect(container.children[0].tagName).toBe('P');
    expect(container.innerHTML).toContain('Inga sökresultat att visa');
  });
});
