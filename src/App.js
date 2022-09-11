import React from "react";
import Layout from "./features/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentList from "./features/Students/StudentList";
import Form from "./common/Form";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="student" element={<StudentList />}></Route>
            <Route path="student/:slug" element={<Form />} />
            <Route path="teacher" element={<StudentList />} />
          </Route>
        </Routes>
      </BrowserRouter>
      ,
    </div>
  );
}

export default App;
