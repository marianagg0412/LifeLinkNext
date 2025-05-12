import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { MedicalVisit } from "@/interfaces/medical-visits";

interface Props {
  visits: MedicalVisit[];
}

const MedicalVisitsCalendar: React.FC<Props> = ({ visits }) => {
  const [selectedVisit, setSelectedVisit] = useState<MedicalVisit | null>(null);

  // Dates as strings for easy comparison
  const visitDates = visits.map(v => new Date(v.visitDate).toDateString());

  // When a date is clicked, check if there's a visit and show it
  const handleDateClick = (date: Date) => {
    const found = visits.find(
      v => new Date(v.visitDate).toDateString() === date.toDateString()
    );
    setSelectedVisit(found || null);
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month' && visitDates.includes(date.toDateString())) {
      return 'visit-day';
    }
    return '';
  };

  return (
    <>
    <div className="bg-white/90 shadow-xl rounded-3xl p-8 w-full max-w-sm border border-pink-100 animate-fade-in transition-transform hover:scale-105">
      <h2 className="text-2xl font-extrabold text-gray-800 mb-6 flex items-center gap-2">
        📅 Visitas médicas
      </h2>
      <Calendar
        tileClassName={tileClassName}
        className="rounded-2xl border-none w-full calendar-custom"
        prev2Label={null}
        next2Label={null}
        onClickDay={handleDateClick}
      />
      {/* Modal for medical visit */}
      {selectedVisit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-pink-200 shadow-xl animate-fade-in">
            <div className="font-bold text-lg mb-2 text-pink-700">
              Visita médica: {new Date(selectedVisit.visitDate).toLocaleDateString()}
            </div>
            {selectedVisit.reason && (
              <div>
                <span className="font-semibold">Motivo:</span> {selectedVisit.reason}
              </div>
            )}
            {selectedVisit.diagnosis && (
              <div>
                <span className="font-semibold">Diagnóstico:</span> {selectedVisit.diagnosis}
              </div>
            )}
            {selectedVisit.treatment && (
              <div>
                <span className="font-semibold">Tratamiento:</span> {selectedVisit.treatment}
              </div>
            )}
            {selectedVisit.notes && (
              <div>
                <span className="font-semibold">Notas:</span> {selectedVisit.notes}
              </div>
            )}
            <button
              className="mt-6 px-4 py-2 bg-pink-100 text-pink-900 rounded-lg font-semibold hover:bg-pink-200 transition w-full"
              onClick={() => setSelectedVisit(null)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
      <style jsx global>{`
        .calendar-custom {
          font-family: 'Inter', 'Lilita One', sans-serif;
          border-radius: 1.5rem;
          background: transparent;
        }
        .react-calendar {
          border: none;
          background: transparent;
        }
        .react-calendar__navigation {
          margin-bottom: 1rem;
        }
        .react-calendar__navigation button {
          color: #000000;
          font-weight: bold;
          font-size: 1.1rem;
          border-radius: 0.75rem;
          transition: background 0.2s;
        }
        .react-calendar__navigation button:enabled:hover,
        .react-calendar__navigation button:enabled:focus {
          background: #ffe4e6;
        }
        .react-calendar__month-view__weekdays {
          text-align: center;
          text-transform: uppercase;
          font-weight: 600;
          font-size: 0.95rem;
          color: #000000;
          background: #fdf2f8;
          border-radius: 1rem 1rem 0 0;
          overflow: hidden;
        }
        .react-calendar__month-view__weekdays__weekday {
          padding: 0.5em 0;
          color: #be185d !important;
        }
        .react-calendar__tile {
          border-radius: 0.75rem !important;
          font-size: 1.15rem;
          font-weight: 700;
          color: #000000;
          padding: 0.7em 0.2em !important;
          transition: background 0.2s, color 0.2s;
        }
        .react-calendar__tile:enabled:hover,
        .react-calendar__tile:enabled:focus {
          background: #fbcfe8;
          color: #be185d;
        }
        .react-calendar__tile--now {
          background: #ffe4e6 !important;
          color: #be185d !important;
          border: 2px solid #f472b6;
        }
        .react-calendar__tile--active {
          background: #f472b6 !important;
          color: #fff !important;
        }
        .visit-day {
          background: #fbcfe8 !important;
          color: #be185d !important;
          border: 2px solid #f472b6;
          font-weight: 900;
          box-shadow: 0 2px 8px #fbcfe855;
        }
        /* Remove red color from weekends */
        .react-calendar__month-view__days__day--weekend {
          color: #000000 !important;
        }
      `}</style>
    </div>
    </>
  );
};

export default MedicalVisitsCalendar;