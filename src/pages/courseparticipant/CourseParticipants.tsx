import { IUser, UserList, users } from "../../features/shared/components/UserList";

interface ICourseParticipantsProps {
  users: IUser[];
}

export const CourseParticipants: React.FC = () => {
  return (
    <main className="course-participants-page">
      <h1 className="course-participants-title">Kursdeltagare</h1>
      <UserList users={users} />
    </main>
  );
};
