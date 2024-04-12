export class ListaPeliculas {
    imdbID:string;
    Title:string;
    Type:string;
    Poster:string;
    Year:string;

    constructor(idImdb:string, title:string, type:string, poster:string, year:string){
        this.imdbID = idImdb;
        this.Title = title;
        this.Type = type;
        this.Poster = poster;
        this.Year = year;
    }
    
}