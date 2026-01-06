const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div>
      <h2 className="fixed top-5 left-5 text-xl font-semibold  border border-transparent border-b-black/30 p-2 dark:outline-text-dark">
        NoteGrid.
      </h2>
      {children}
    </div>
  );
};

export default layout;
