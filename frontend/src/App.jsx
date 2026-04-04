import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    course: "",
  });

  const API = import.meta.env.VITE_API_URL + "/students";

  // Fetch students
  const getStudents = async () => {
    const res = await axios.get(API);
    setStudents(res.data);
  };

  useEffect(() => {
    getStudents();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(API, {
      ...form,
      age: Number(form.age),
    });
    setForm({ name: "", email: "", age: "", course: "" });
    getStudents();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Data Management</h2>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="age" placeholder="Age" value={form.age} onChange={handleChange} />
        <input name="course" placeholder="Course" value={form.course} onChange={handleChange} />
        <button type="submit">Add</button>
      </form>

      <hr />

      {/* List */}
      <h3>Students</h3>
      <ul>
        {students.map((s) => (
          <li key={s.id}>
            {s.name} - {s.email} - {s.age} - {s.course}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;