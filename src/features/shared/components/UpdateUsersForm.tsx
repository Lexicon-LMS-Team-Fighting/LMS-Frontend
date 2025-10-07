import { ReactElement } from 'react';
import "../css/NewCourseForm.css";

export type Role = "Student" | "Teacher";

export type UserDraft = {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password?: string;
  role: Role;
};

type Props = {
  data: UserDraft;
  title: string;
  buttonText: string;
  onChange: (next: UserDraft) => void;
  onSubmit: () => void;
  disabled?: boolean;
};

export default function UpdateUserForm({
  data, title, buttonText, onChange, onSubmit, disabled
}: Props): ReactElement {

  const set = (patch: Partial<UserDraft>) => onChange({ ...data, ...patch });

  return (
    <section className="form-wrapper shadow-sm">
      <h2 className="fs-5 mb-4">{title}</h2>

      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label-bold mb-1">Förnamn *</label>
          <input
            id="firstName"
            type="text"
            className="form-control"
            value={data.firstName}
            onChange={(e) => set({ firstName: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label-bold mb-1">Efternamn *</label>
          <input
            id="lastName"
            type="text"
            className="form-control"
            value={data.lastName}
            onChange={(e) => set({ lastName: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="userName" className="form-label-bold mb-1">Användarnamn *</label>
          <input
            id="userName"
            type="text"
            className="form-control"
            value={data.userName}
            onChange={(e) => set({ userName: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label-bold mb-1">E-post *</label>
          <input
            id="email"
            type="email"
            className="form-control"
            value={data.email}
            onChange={(e) => set({ email: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label-bold mb-1">Lösenord</label>
          <input
            id="password"
            type="password"
            className="form-control"
            value={data.password ?? ""}
            onChange={(e) => set({ password: e.target.value || undefined })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="role" className="form-label-bold mb-1">Roll *</label>
          <select
            id="role"
            className="form-control"
            value={data.role}
            onChange={(e) => set({ role: e.target.value as Role })}
          >
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
          </select>
        </div>

        <div className="create-course-button-wrapper">
          <button type="submit" className="create-course-button" disabled={disabled}>
            {buttonText}
          </button>
        </div>
      </form>
    </section>
  );
}
