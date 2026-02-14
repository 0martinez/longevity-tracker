import { useState } from "react";
import "./App.css";
import { InboxForm } from "./components/InboxForm";
import { DayViewer } from "./components/DayViewer";
import { DayList } from "./components/DayList";

function todayString(): string {
  return new Date().toLocaleDateString("en-CA");
}

function App() {
  const [selectedDate, setSelectedDate] = useState(todayString());
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => setRefreshKey((k) => k + 1);

  return (
    <div className="app">
      <h1>Longevity Tracker</h1>
      <InboxForm
        date={selectedDate}
        onDateChange={setSelectedDate}
        onAppended={refresh}
      />
      <div className="columns">
        <div className="main-col">
          <DayViewer date={selectedDate} refreshKey={refreshKey} />
        </div>
        <div className="side-col">
          <DayList
            refreshKey={refreshKey}
            onSelect={setSelectedDate}
            selectedDate={selectedDate}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
