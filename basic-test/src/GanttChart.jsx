import { onMount, createSignal, createEffect } from "solid-js";
import Gantt from "frappe-gantt";
//import "frappe-gantt/dist/frappe-gantt.css";
//import "./frappe-gantt.css";
import "../styles/gantt.css";
import "../styles/themes.css";

function GanttChart() {
  let ganttRef;
  let ganttInstance;
  const [tasks, setTasks] = createSignal([
    {
      id: "Task 1",
      name: "プロジェクト計画",
      start: "2023-10-01",
      end: "2023-10-05",
      progress: 100,
      dependencies: "",
    },
    {
      id: "Task 2",
      name: "要件定義",
      start: "2023-10-06",
      end: "2023-10-10",
      progress: 50,
      dependencies: "Task 1",
    },
  ]);

  onMount(() => {
    ganttInstance = new Gantt(ganttRef, tasks(), {
      header_height: 50,
      column_width: 30,
      step: 24,
      view_modes: ["Quarter Day", "Half Day", "Day", "Week", "Month"],
      bar_height: 20,
      padding: 18,
      view_mode: "Day",
      date_format: "YYYY-MM-DD",
    });
  });

  // タスクが変更されたらガントチャートを再描画
  createEffect(() => {
    if (ganttInstance) {
      ganttInstance.refresh(tasks());
    }
  });

  return (
    <div>
      {/* このsvg要素にガントチャートが描画される */}
      <svg ref={ganttRef}></svg>
    </div>
  );
}

export default GanttChart;

