import { IUser } from "../types";
import { UserInfo } from "./UserInfo";

interface IUserListProps {
  users: IUser[];
}

export const UserList: React.FC<IUserListProps> = ({ users }) => {
  return (
    <section className="user-list-container">
    </section>
  );
};
