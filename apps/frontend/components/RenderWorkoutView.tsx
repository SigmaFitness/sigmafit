export const RenderWorkoutView = ({
  workoutName, target,
}: {
  workoutName: string;
  target: any[];
}) => (
  <div className="my-3">
    <DescriptionText name="Workout Name:" value={workoutName} />
    <DescriptionText
      name="Target:"
      value={target.map((e: any, indx: number) => (
        <span key={indx} className="badge mx-1 badge-sm">
          {e}
        </span>
      ))} />
  </div>
);

export const DescriptionText = ({
  name, value, size = "small", type = "justify-between",
}: {
  name: string;
  value: any;
  size?: "med" | "small";
  type?: "justify-between" | "gap-2" | "gap-1" | "justify-around";
}) => (
  <div className={"flex flex-col xs:flex-row xs:items-center " + type}>
    <div
      className={"uppercase font-bold  text-gray-500 " +
        (size === "small" ? "text-2xs" : "text-xs")}
    >
      {name}
    </div>
    <div
      className={"text-gray-900 " + (size === "small" ? "text-sm" : "text-sm")}
    >
      {value}
    </div>
  </div>
);
