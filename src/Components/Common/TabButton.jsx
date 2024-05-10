export function TabButton({ tabData, currenttab, setCurrenttab }) {
  return (
    <div className="flex p-1 my-6 rounded-full bg-vistuatBlue-600 max-w-max shadow-md">
      {tabData.map((btn) => (
        <button
          key={btn.id}
          onClick={() => setCurrenttab(btn.type)}
          className={`${
            currenttab === btn.tabName
              ? "bg-blue-300 text-vistuatBlue-light"
              : "bg-transparent text-vistuatBlue-200 hover:text-vistuatBlue-light"
          } py-2 px-5 rounded-full transition-all duration-300`}
        >
          {btn.tabName}
        </button>
      ))}
    </div>
  );
}
