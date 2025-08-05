import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chatbot from "./pages/chatbot";
import Login from "./pages/login";
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = '646463848897-kf0qcet4807pgkiv5vdpntqhgj2kmumh.apps.googleusercontent.com';

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chat" element={<Chatbot />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
