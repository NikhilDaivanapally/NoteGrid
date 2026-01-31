import NoteForm from "../note-form/note-form";

const CreateNote = () => {
  return (
    <div className="p-4 overflow-y-auto">
      <NoteForm mode="create" />
    </div>
  );
};

export default CreateNote;
