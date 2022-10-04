import { useEffect, useState } from "react";
import axios from "axios";

export default function CardList(pageNumber, getDate) {
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [repos, setRepos] = useState([]);

  const query = `created:>${getDate()}`;
  const url = "https://api.github.com/search/repositories";

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios({
      method: "GET",
      url: url,
      params: { q: query, sort: "stars", order: "desc", page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setRepos((prevRepos) => {
          return prevRepos.concat(res.data.items);
        });
        setHasMore(res.data.items.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });
    return () => cancel();
  }, [pageNumber]);

  return { repos, loading, hasMore };
}
