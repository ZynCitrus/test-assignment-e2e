import axios from 'axios';
import { handleSubmit, createHtml, displayNoResult } from '../movieApp';
import { getData } from '../services/movieservice';
import { IMovie } from '../models/Movie';

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
  test('handleSubmit kallar på getData med korrekt data', async () => {
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
    test("Skapa THML", () => {
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
  
      expect(container.children.length).toBe(2);
  
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
  
  test('displayNoResult visar "No search results" message', () => {
    const container = document.createElement('div');

    displayNoResult(container);

    expect(container.children.length).toBe(1);

    expect(container.children[0].tagName).toBe('P');
    expect(container.innerHTML).toContain('Inga sökresultat att visa');
  });
});
