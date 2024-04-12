export class DetallePeliculas {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: Rating[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    Dvd: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    constructor() {
        this.Title = '';
        this.Year = '';
        this.Rated = '';
        this.Released = '';
        this.Runtime = '';
        this.Genre = '';
        this.Director = '';
        this.Writer = '';
        this.Actors = '';
        this.Plot = '';
        this.Language = '';
        this.Country = '';
        this.Awards = '';
        this.Poster = '';
        this.Ratings = [];
        this.Metascore = '';
        this.imdbRating = '';
        this.imdbVotes = '';
        this.imdbID = '';
        this.Type = '';
        this.Dvd = '';
        this.BoxOffice = '';
        this.Production = '';
        this.Website = '';
    }
    
}


type DetallePeliculaLite = Pick<DetallePeliculas, 'Title' | 'Year' | 'Genre' |'Director'|'Actors'|'Plot'|'imdbID'>;

class Rating {
    source: string;
    value: string;
    constructor(){
        this.source = '';
        this.value = '';
    }
}