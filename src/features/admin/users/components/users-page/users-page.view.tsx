import UsersFilter from "../users-filters/users-filters";
import UsersListContainer from "../users-list/users-list.container";

const UsersPageView = ({ filters, onUpdate, handlePage }: any) => {
  return (
    <>
      <UsersFilter filters={filters} onChange={onUpdate} />
      <UsersListContainer filters={filters} handlePage={handlePage} />
    </>
  );
};

export default UsersPageView;
