import NoteForm from "../forms/note-form";

const CreateNotePage = () => {
  return (
    <div className="p-4 overflow-y-auto">
      <NoteForm mode="create" />
    </div>
  );
};

export default CreateNotePage;
