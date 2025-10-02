import { UserList } from "../../features/shared/components/UserList";
import { users } from "../../features/shared/dummydata";

export const CourseParticipants: React.FC = () => {
  return (
    <main className="course-participants-page">
      <h1 className="course-participants-title">Kursdeltagare</h1>
      <UserList users={users} />
    </main>
  );
};
