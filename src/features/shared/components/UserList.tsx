import { IUser } from "../types";
interface IUserListProps {
  users: IUser[];
}

export const UserList: React.FC<IUserListProps> = ({ users }) => {
  return (
    <section className="user-list-container">
    </section>
  );
};
