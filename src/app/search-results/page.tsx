import { Suspense } from "react";
import SearchResults from "../components/search-results/SearchResults";

const page = async () => {
  return (
    <div>
      <div className="container">
        <Suspense>
          <SearchResults />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
