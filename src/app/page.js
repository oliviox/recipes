"use client"
import { useState, useEffect } from 'react';
import menu from "../data/menu.json" assert { type: "json" };
import { weekDiff, getStoredWeek, setStoredWeek, setStoredLastDate } from '../lib/week';

export default function Home() {
  const [week, setWeek] = useState(0);
  const [selectedDay, setSelectedDay] = useState((new Date().getDay() + 6) % 7);

  useEffect(() => {
    const currentWeek = getStoredWeek(window.localStorage) + weekDiff(window.localStorage) % 4;
    setWeek(currentWeek);
    setStoredLastDate(window.localStorage, new Date());
  }, []);

  const handleWeekChange = (e) => {
    const newWeek = Number(e.target.value);
    setWeek(newWeek);
    setStoredWeek(window.localStorage, newWeek);
  };

  const meals = ["Desayunos", "Comidas o Almuerzos", "Cenas"];
  const daysOfWeek = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];
  const day = daysOfWeek[selectedDay]; // Monday is 0, Sunday is 6
  const mealsOfDay = menu[week].filter((meal) => meal.day === day);

  return (
    <main className="flex min-h-screen">
      <section className="flex-1 p-4">
        <h1 className="text-3xl font-bold mb-4 text-black">Hoy es {day}</h1>
        <div className="mb-4">
          <label htmlFor="week-selector" className="mr-2 text-black">Selecciona la semana:</label>
          <select
            id="week-selector"
            value={week}
            onChange={handleWeekChange}
            className="p-2 border rounded"
          >
            <option value={0}>Semana 1</option>
            <option value={1}>Semana 2</option>
            <option value={2}>Semana 3</option>
            <option value={3}>Semana 4</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="day-selector" className="mr-2 text-black">Selecciona el día:</label>
          <select
            id="day-selector"
            value={selectedDay}
            onChange={(e) => setSelectedDay(Number(e.target.value))}
            className="p-2 border rounded"
          >
            {daysOfWeek.map((day, index) => (
              <option key={index} value={index}>{day}</option>
            ))}
          </select>
        </div>
        {meals.map((meal, index) => (
          <div key={index} className="mb-8 p-4 border rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-semibold mb-2 text-black">{meal}</h2>
            <p className="text-sm opacity-75 text-black">
              <img src={`/planr28-${mealsOfDay[index]?.page - 1}.png`} alt={meal} width={1000} height={1000} />
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
