const MedicalRecordCard = () => {
    return (
      <div className="max-w-sm w-full bg-white/90 shadow-2xl rounded-3xl p-6 border border-pink-100 animate-fade-in">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-4 tracking-tight">
          Próximamente
        </h2>
        <p className="text-gray-600 text-lg mb-6">
          Historias médicas
        </p>
        <div className="flex justify-center">
          <span className="inline-flex items-center px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-semibold">
            En desarrollo...
          </span>
        </div>
      </div>
    );
  };
  
  export default MedicalRecordCard;
  