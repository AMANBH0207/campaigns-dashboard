function Reports() {
  return (
    <main className="flex-1 overflow-auto p-4 md:p-6 space-y-6 flex flex-col">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
          Reports
        </h1>
        <p className="text-sm text-gray-600">Get reports</p>
      </div>

      {/* Full height card */}
      <div className="flex-1 rounded-xl border bg-white p-6 shadow-sm flex items-center justify-center">
        <p className="text-sm md:text-base text-gray-700 text-center">
          You will get all the reports related data here.
        </p>
      </div>
    </main>
  );
}

export default Reports;
