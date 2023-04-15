import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: abortCont.signal }) // Associating the abort controller with the fetch request
        .then((res) => {
          if (!res.ok) {
            throw Error(`There is an error during fetching... ${res.status}: ${res.statusText}`);
          }
          return res.json();
        })
        .then((d) => {
          setData(d);
          setError(null);
          setIsLoading(false);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          } else {
            setIsLoading(false);
            setError(err.message);
          }
        });
    }, 1000);

    return () => abortCont.abort(); // Cleanup function -> Triggering abort of the fetch request
  }, [url]);
  return { data, isLoading, error };
};

export default useFetch;
