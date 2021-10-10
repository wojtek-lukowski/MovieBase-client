import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

constructor() {
    super();
    this.state = {
        movies: [
            {"_id":{"$oid":"613e5a9446378b95b687fba1"},"Title":"The Terminator","Genre":{"$oid":"6148c5f2096c67597a786f09"},"Director":"6148e24d3a101b5e942ee376","ImagePath":"https://www.imdb.com/title/tt0088247/mediaviewer/rm774208512/","Featured":true,"Description":"A 1984 science fiction action film directed by James Cameron. It stars Arnold Schwarzenegger as the Terminator, a cyborg assassin sent back in time from 2029 to 1984 to kill Sarah Connor (Linda Hamilton), whose unborn son will one day save mankind from extinction by a hostile artificial intelligence in a post-apocalyptic future. Michael Biehn plays Kyle Reese, a soldier sent back in time to protect Sarah. The screenplay is credited to Cameron and producer Gale Anne Hurd, while co-writer William Wisher Jr. received a credit for additional dialogue.","Actors":[{"$oid":"61408a0146378b95b687fbb1"}]}
{"_id":{"$oid":"613e5d0e46378b95b687fba2"},"Title":"Terminator 2: Judgement Day","Genre":{"$oid":"6148c5f2096c67597a786f09"},"Director":"6148e24d3a101b5e942ee376","ImagePath":"terminator2.png","Featured":true,"Description":"A 1991 American science fiction action film produced and directed by James Cameron, who co-wrote the script with William Wisher. It stars Arnold Schwarzenegger, Linda Hamilton, Robert Patrick, Edward Furlong, and Joe Morton. It is the sequel to the 1984 film The Terminator, and the second installment in the Terminator franchise. It follows Sarah Connor (Hamilton) and her ten-year-old son John (Furlong) as they are pursued by a new, more advanced Terminator: the liquid metal, shapeshifting T-1000 (Patrick), sent back in time to kill John and prevent him from becoming the leader of the human resistance. A second, less-advanced Terminator (Schwarzenegger) is also sent by the Resistance to protect John.","Actors":[{"$oid":"61408a0146378b95b687fbb1"}]}
{"_id":{"$oid":"613e5ff246378b95b687fba3"},"Title":"Kill Bill Vol. 1","Description":"A 2003 American martial arts film written and directed by Quentin Tarantino. It stars Uma Thurman as the Bride, who swears revenge on a team of assassins (Lucy Liu, Michael Madsen, Daryl Hannah, and Vivica A. Fox) and their leader, Bill (David Carradine), after they try to kill her and her unborn child. Her journey takes her to Tokyo, where she battles the yakuza.","Genre":{"$oid":"6148c7b62ea4a3d102c06d01"},"Director":"6148e2bb3a101b5e942ee379","ImagePath":"killbill.png","Featured":false,"Actors":[{"$oid":"61408a4846378b95b687fbb2"}]}
{"_id":{"$oid":"613eee1946378b95b687fba4"},"Title":"Kill Bill Vol. 2","Description":"A 2004 American martial arts film written and directed by Quentin Tarantino. It stars Uma Thurman as the Bride, who continues her campaign of revenge against the Deadly Viper Assassination Squad and their leader, who tried to kill her and her unborn child.","Genre":{"$oid":"6148c7b62ea4a3d102c06d01"},"Director":"6148e2bb3a101b5e942ee379","ImagePath":"killbill2.png","Featured":false,"Actors":[{"$oid":"61408a4846378b95b687fbb2"}]}
{"_id":{"$oid":"613f31c446378b95b687fba5"},"Title":"Enter the Dragon","Description":"A 1973 martial arts action film directed by Robert Clouse. It is the most successful martial arts film ever made, a ecord it has held since its release in 1973.","Genre":{"$oid":"6148c7b62ea4a3d102c06d01"},"Director":"6148ec223dd18203732c44ec","ImagePath":"enterthedragon.png","Featured":true,"Actors":[{"$oid":"61408aa246378b95b687fbb3"}]}
{"_id":{"$oid":"613f347c46378b95b687fba6"},"Title":"The Inglorious Bastards","Description":"A 2009 war film written and directed by Quentin Tarantino. The film tells an alternate story of two plots to assassinate the Nazi Germany's leadership.","Genre":{"$oid":"6148c8582ea4a3d102c06d02"},"Director":"6148e2bb3a101b5e942ee379","ImagePath":"ingloriousbastards.png","Featured":false,"Actors":[{"$oid":"61408adf46378b95b687fbb4"}]}
{"_id":{"$oid":"613f362546378b95b687fba7"},"Title":"Django Unchained","Description":"A 2012 American revisionist Western film written and diected by Quentin Tarantino. It is highly-stylilzed and heavily-revisionist tribute to Spaghetti Westerns.","Genre":{"$oid":"6148cb5b2ea4a3d102c06d03"},"Director":"6148e2bb3a101b5e942ee379","ImagePath":"django.png","Featured":false,"Actors":[""]}
{"_id":{"$oid":"613f37f346378b95b687fba8"},"Title":"Rambo: First Blood","Description":"A 1982 American action film directed by Ted Kotcheff and co-writen by Sylvester Stallone, wo also stars as Vietnam War veteran John Rambo.","Genre":{"$oid":"6148c5f2096c67597a786f09"},"Director":"6148ed563dd18203732c44f2","ImagePath":"rambo.png","Featured":true,"Actors":[{"$oid":"61408b6846378b95b687fbb5"}]}
{"_id":{"$oid":"613f3a5746378b95b687fba9"},"Title":"The Girl with the Dragon Tattoo","Description":"A 2011 neo-noir psychological thriller based on the 2005 novel by Stieg Larsson and directed by David Fincher. It tells the story of a journalist investigation to find out what happened to a girl from a wealthy family who disappeared 40 years prior.","Genre":{"$oid":"6148cbab2ea4a3d102c06d04"},"Director":"6148eb763dd18203732c44e9","ImagePath":"thegirlwith.png","Featured":false,"Actors":[""]}
{"_id":{"$oid":"613f3b7746378b95b687fbaa"},"Title":"Fight Club","Description":"A 1999 American film directed by David Fincher. Based on the 1996 novel of the same title by Chuck Palahniuk. It tells the story of the unnamed narator, who is discontented with his white collar-job.","Genre":{"$oid":"6148cbab2ea4a3d102c06d04"},"Director":"6148eb763dd18203732c44e9","ImagePath":"fightclub.png","Featured":false,"Actors":[{"$oid":"61408adf46378b95b687fbb4"}]}
{"_id":{"$oid":"61540024adbba3d9dbfac157"},"Title":"Back to the Future","Description":"Back to the Future is a 1985 American science fiction film directed by Robert Zemeckis. Written by Zemeckis and Bob Gale, it stars Michael J. Fox, Christopher Lloyd, Lea Thompson, Crispin Glover, and Thomas F. Wilson. Set in 1985, the story follows Marty McFly (Fox), a teenager accidentally sent back to 1955 in a time-traveling DeLorean automobile built by his eccentric scientist friend Doctor Emmett /Doc/ Brown (Lloyd). Trapped in the past, Marty inadvertently prevents his future parents' meeting—threatening his existence—and is forced to reconcile the pair and somehow get back to the future.","Actors":[],"__v":0}
{"_id":{"$oid":"61560750ab4f045b1650a32e"},"Title":"Back to the Future Part II","Description":"Back to the Future Part II is a 1989 American science fiction film directed by Robert Zemeckis and written by Bob Gale. It is the sequel to the 1985 film Back to the Future and the second installment in the Back to the Future franchise. The film stars Michael J. Fox, Christopher Lloyd, Lea Thompson, and Thomas F. Wilson. The film follows Marty McFly (Fox) and his friend Dr. Emmett 'Doc' Brown (Lloyd) as they travel from 1985 to 2015 to prevent Marty's son from sabotaging the McFly family's future; when their arch-nemesis Biff Tannen (Wilson) steals Doc's DeLorean time machine and uses it to alter history for his benefit, the duo must return to 1955 to restore the timeline.","Actors":[],"__v":0}
        ],
        // selectedMovie = null
    };
}

setSelectedMovie(newSelectedMovie) {
    this.setState({
        selectedMovie: newSelectedMovie
    });
}

render() {
    const { movies, selectedMovie } = this.state;

    if (selectedMovie) return <MovieView movie={selectedMovie} />;

    if (movies.length === 0) return <div className="main-view">No film tonight</div>;

    return (
        <div className="main-view">
          {selectedMovie
            ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
            : movies.map(movie => (
              <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
            ))
          }
        </div>
      );
}

}
