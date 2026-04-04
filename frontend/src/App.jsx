import { useEffect, useState } from "react";
import axios from "axios";

const initials = (name) =>
  name.trim().split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "??";

const AVATAR_COLORS = [
  { bg: "#E6F1FB", color: "#185FA5" },
  { bg: "#E1F5EE", color: "#0F6E56" },
  { bg: "#FAEEDA", color: "#854F0B" },
  { bg: "#EEEDFE", color: "#534AB7" },
  { bg: "#FAECE7", color: "#993C1D" },
];

export default function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", age: "", course: "" });
  const [toast, setToast] = useState({ show: false, msg: "" });
  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_API_URL + "/students";

  const getStudents = async () => {
    try {
      const res = await axios.get(API);
      setStudents(res.data);
    } catch {
      showToast("Failed to load students");
    }
  };

  useEffect(() => { getStudents(); }, []);

  const showToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 2200);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const { name, email, age, course } = form;
    if (!name || !email || !age || !course) {
      showToast("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      await axios.post(API, { ...form, age: Number(age) });
      setForm({ name: "", email: "", age: "", course: "" });
      await getStudents();
      showToast("Student enrolled!");
    } catch {
      showToast("Failed to add student");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => { if (e.key === "Enter") handleSubmit(); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: #f5f4f0;
          min-height: 100vh;
          color: #1a1a1a;
        }

        .wrap {
          max-width: 680px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem;
        }

        .header {
          display: flex;
          align-items: flex-end;
          gap: 1rem;
          margin-bottom: 2rem;
          padding-bottom: 1.25rem;
          border-bottom: 0.5px solid rgba(0,0,0,0.1);
        }

        .header-sub {
          font-size: 11px;
          font-weight: 500;
          color: #888;
          letter-spacing: .07em;
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .header-title {
          font-family: 'DM Serif Display', serif;
          font-size: 30px;
          font-weight: 400;
          line-height: 1;
          color: #111;
        }

        .count-badge {
          margin-left: auto;
          background: #E6F1FB;
          color: #185FA5;
          font-size: 11px;
          font-weight: 500;
          padding: 4px 12px;
          border-radius: 20px;
          white-space: nowrap;
        }

        .form-card {
          background: #fff;
          border: 0.5px solid rgba(0,0,0,0.08);
          border-radius: 14px;
          padding: 1.5rem;
          margin-bottom: 1.75rem;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }

        .form-card-title {
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          font-size: 16px;
          color: #666;
          margin-bottom: 1.1rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 14px;
        }

        .field label {
          display: block;
          font-size: 11px;
          font-weight: 500;
          color: #888;
          letter-spacing: .06em;
          text-transform: uppercase;
          margin-bottom: 5px;
        }

        .field input {
          width: 100%;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          background: #f9f8f5;
          border: 0.5px solid rgba(0,0,0,0.1);
          border-radius: 8px;
          padding: 9px 12px;
          color: #111;
          outline: none;
          transition: border-color .2s, background .2s;
        }

        .field input:focus {
          border-color: #378ADD;
          background: #fff;
        }

        .field input::placeholder { color: #bbb; }

        .btn-add {
          width: 100%;
          padding: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: .02em;
          background: #111;
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: opacity .2s, transform .1s;
        }

        .btn-add:hover { opacity: .85; }
        .btn-add:active { transform: scale(.99); }
        .btn-add:disabled { opacity: .5; cursor: not-allowed; }

        .section-label {
          font-size: 11px;
          font-weight: 500;
          color: #888;
          letter-spacing: .07em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .student-list { display: flex; flex-direction: column; gap: 8px; }

        .student-card {
          background: #fff;
          border: 0.5px solid rgba(0,0,0,0.08);
          border-radius: 14px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: border-color .2s, transform .15s, box-shadow .15s;
          animation: fadeIn .25s ease both;
        }

        .student-card:hover {
          border-color: rgba(0,0,0,0.15);
          transform: translateY(-1px);
          box-shadow: 0 3px 10px rgba(0,0,0,0.06);
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 500;
          flex-shrink: 0;
        }

        .s-name {
          font-size: 14px;
          font-weight: 500;
          color: #111;
        }

        .s-email {
          font-size: 12px;
          color: #888;
          margin-top: 1px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .s-info { display: flex; align-items: center; gap: 6px; margin-left: auto; flex-shrink: 0; }

        .s-age {
          font-size: 11px;
          font-weight: 500;
          background: #f2f1ed;
          color: #666;
          padding: 3px 9px;
          border-radius: 20px;
        }

        .s-course {
          font-size: 11px;
          font-weight: 500;
          background: #E1F5EE;
          color: #0F6E56;
          padding: 3px 10px;
          border-radius: 20px;
        }

        .empty {
          text-align: center;
          padding: 2.5rem;
          color: #aaa;
          font-size: 13px;
          font-style: italic;
        }

        .toast {
          position: fixed;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%) translateY(60px);
          background: #111;
          color: #fff;
          padding: 9px 20px;
          border-radius: 20px;
          font-size: 13px;
          pointer-events: none;
          z-index: 99;
          transition: transform .3s cubic-bezier(.34,1.56,.64,1);
          white-space: nowrap;
        }

        .toast.show { transform: translateX(-50%) translateY(0); }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: none; }
        }

        @media (max-width: 480px) {
          .form-grid { grid-template-columns: 1fr; }
          .s-course { display: none; }
        }
      `}</style>

      <div className="wrap">
        {/* Header */}
        <div className="header">
          <div>
            <div className="header-sub">Institute Portal</div>
            <div className="header-title">Student Registry</div>
          </div>
          <div className="count-badge">{students.length} enrolled</div>
        </div>

        {/* Form */}
        <div className="form-card">
          <div className="form-card-title">Add new student</div>
          <div className="form-grid">
            {[
              { name: "name",   label: "Full name", placeholder: "e.g. Arjun Sharma",      type: "text"   },
              { name: "email",  label: "Email",     placeholder: "arjun@example.com",       type: "email"  },
              { name: "age",    label: "Age",       placeholder: "21",                       type: "number" },
              { name: "course", label: "Course",    placeholder: "e.g. Computer Science",   type: "text"   },
            ].map((f) => (
              <div className="field" key={f.name}>
                <label>{f.label}</label>
                <input
                  name={f.name}
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.name]}
                  onChange={handleChange}
                  onKeyDown={handleKey}
                />
              </div>
            ))}
          </div>
          <button className="btn-add" onClick={handleSubmit} disabled={loading}>
            {loading ? "Enrolling…" : "+ Enroll student"}
          </button>
        </div>

        {/* List */}
        <div className="section-label">Enrolled students</div>
        <div className="student-list">
          {students.length === 0 ? (
            <div className="empty">No students yet — add one above.</div>
          ) : (
            students.map((s, i) => {
              const ac = AVATAR_COLORS[i % AVATAR_COLORS.length];
              return (
                <div className="student-card" key={s.id} style={{ animationDelay: `${i * 0.04}s` }}>
                  <div className="avatar" style={{ background: ac.bg, color: ac.color }}>
                    {initials(s.name)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="s-name">{s.name}</div>
                    <div className="s-email">{s.email}</div>
                  </div>
                  <div className="s-info">
                    <span className="s-age">{s.age} yrs</span>
                    <span className="s-course">{s.course}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Toast */}
      <div className={`toast${toast.show ? " show" : ""}`}>{toast.msg}</div>
    </>
  );
}