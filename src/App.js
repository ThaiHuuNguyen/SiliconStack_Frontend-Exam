import {  BrowserRouter,
    Routes,
    Route } from 'react-router-dom';
import Search from "./component/Search"
import UserRepos from './component/UserRepos';
import RepositoryCommits from './component/RepositoryCommits';

function App() {
  return (
<BrowserRouter>
<Routes>
      <Route exact path="/" element={<Search />} />
      <Route exact path="/users/:username/repos" element={<UserRepos />} />
      <Route
        exact
        path="/users/:username/repos/:repo/commits"
        element={<RepositoryCommits />}
      />
    </Routes>


</BrowserRouter>
  );
}

export default App;
