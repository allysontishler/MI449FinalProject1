function App() {
  const [reviews, setReviews] = useState([]);
  const [quoteOne, setQuoteOne] = useState('');
  const [quoteTwo, setQuoteTwo] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data, error } = await supabase.from('reviews').select('*');
        if (error) {
          console.error('Error fetching reviews:', error.message);
        } else {
          console.log('Fetched reviews:', data);
          setReviews(data);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error.message);
      }
    };

    const fetchQuotes = async () => {
      try {
        const { data, error } = await supabase.from('quotes').select('*');
        if (error) {
          console.error('Error fetching quotes:', error.message);
        } else {
          console.log('Fetched quotes:', data);
          setQuoteOne(data[0]?.quote || '');
          setQuoteTwo(data[1]?.quote || '');
        }
      } catch (error) {
        console.error('Error fetching quotes:', error.message);
      }
    };

    fetchReviews();
    fetchQuotes();
  }, []);

  return (
    <div className="container flex flex-wrap items-start justify-between">
      <div className="left-section w-full md:w-3/5">
        <header className="header flex justify-between items-center w-full">
          <h1 className="logo text-4xl font-bold">Café Scout</h1>
          <nav className="navigation">
            <ul className="flex text-lg">
              <li className="mr-10"><a href="#">coffee search</a></li>
              <li className="mr-10"><a href="#">about</a></li>
              <li className="mr-10"><a href="#">login</a></li>
            </ul>
          </nav>
        </header>
        <div className="main-content mx-4 md:mx-0 max-w-md md:max-w-none">
          <h2 className="mb-4 text-2xl font-bold">Welcome to Café Scout, your friend for finding hole-in-the-wall coffee shops near you!</h2>
          <p className="mb-4">Get started by entering your zip code below</p>
          <div className="cta-container mb-4">
            <button className="cta-button border-2 border-black bg-white text-grey px-6 py-2 rounded-full font-bold text-lg">Enter Zip Code</button>
          </div>
          <p className="mb-4">Read reviews from others about their experiences!</p>
          <div className="review-container flex flex-wrap justify-between">
            {reviews.map(review => (
              <div className="review w-48 h-72 border-2 border-black p-4 text-center text-sm" key={review.id}>
                <h3>{review.name}</h3>
                <p>{review.shop}</p>
                <p>{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="right-section w-full md:w-2/5">
        <div className="quotes mx-4 md:mx-0">
          <div className="quote-green text-2xl font-bold mb-4">{quoteOne}</div>
          <div className="quote-brown text-2xl font-bold">{quoteTwo}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
