// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Dashboard from "./Pages/Dashboard";
import NoPage from "./Pages/NoPage";
import CreateAndEditResume from "./Pages/CreateAndEditResume";
import ViewAllResume from "./Pages/ViewAllResume";
import ViewResume from "./Pages/ViewResume";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route index element={<Dashboard />} />
                    <Route path="/create-resume" element={<CreateAndEditResume />} />
                    <Route path="/view-all-resumes" element={<ViewAllResume />} />
                    <Route path="/edit-resume/:id" element={<CreateAndEditResume />} />
                    <Route path="/view-resume/:id" element={<ViewResume />} />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
