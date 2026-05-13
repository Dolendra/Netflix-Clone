import React, { useEffect, useRef ,useState} from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'



const TitleCards = ({title,category}) => {

  const cardsRef = useRef();

  // const [shows, setShows] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const url = 'https://imdb236.p.rapidapi.com/api/imdb/most-popular-tv';
  //   const options = {
  //     method: 'GET',
  //     headers: {
  //       'x-rapidapi-key': '352cddccd4msh784d774df72f852p10da1ejsncecbaa7d1e6a',
  //       'x-rapidapi-host': 'imdb236.p.rapidapi.com',
  //     },
  //   };

  //   const fetchShows = async () => {
  //     try {
  //       const response = await fetch(url, options);

  //     if (!response.ok) {
  //     // If rate-limited or error
  //     const errorData = await response.json();
  //     throw new Error(errorData.message || 'Failed to fetch');
  //   }

  //       const result = await response.json();
  //       console.log(result);
  //       setShows(result || []); // Use correct key if available, e.g., result.shows
  //     } catch (error) {
  //       console.error('Error fetching TV shows:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchShows();
  // }, []);

      // useEffect(() => {
      //   const handleWheel = (event) => {
      //     cardsRef.current.scrollLeft += event.deltaY;
      //   };
      //   const ref = cardsRef.current;
      //   if (ref) {
      //     ref.addEventListener('wheel', handleWheel);
      //   }
      //   return () => {
      //     if (ref) ref.removeEventListener('wheel', handleWheel);
      //   };
      // }, []);

  
  useEffect(()=>{
      const handleWheel =(event)=>{
          cardsRef.current.scrollLeft +=event.deltaY;
      }
        cardsRef.current.addEventListener('wheel',handleWheel)
    },[]);

  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>        
      <div ref={cardsRef} className="card-list" >
        {cards_data.map((card,index)=>{  //card-data
            return <div className='card' key={index}>
                <img src={card.image} alt="" />
                <p>{card.name}</p>
            </div>
        })}
      </div>
    </div>
  )
}

export default TitleCards
