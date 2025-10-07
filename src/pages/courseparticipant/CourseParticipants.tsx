import { useLoaderData } from "react-router";
import { UserList } from "../../features/shared/components/UserList";
import { IUserParticipants } from "../../features/shared/types";

export const CourseParticipants: React.FC = () => {
  const participants = useLoaderData() as IUserParticipants[];

  return (
    <main className="main-wrapper">
      <h1 className="course-participants-title">Kursdeltagare</h1>
      <UserList users={participants} />
    </main>
  );
};
