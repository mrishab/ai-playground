export function getConstraintNodeStyle(
  isSingle: boolean,
  isEmpty: boolean,
  isBeingEvaluated: boolean,
) {
  if (isSingle) {
    return {
      circleClassName:
        "fill-emerald-100 dark:fill-emerald-950 stroke-emerald-500 dark:stroke-emerald-400",
      textClassName: "fill-emerald-900 dark:fill-emerald-100",
      domainClassName: "fill-emerald-700 dark:fill-emerald-300",
    };
  }
  if (isEmpty) {
    return {
      circleClassName:
        "fill-rose-100 dark:fill-rose-950 stroke-rose-500 dark:stroke-rose-400",
      textClassName: "fill-rose-900 dark:fill-rose-100",
      domainClassName: "fill-rose-700 dark:fill-rose-300",
    };
  }
  if (isBeingEvaluated) {
    return {
      circleClassName:
        "fill-purple-100 dark:fill-purple-950 stroke-purple-500 dark:stroke-purple-400",
      textClassName: "fill-purple-900 dark:fill-purple-100",
      domainClassName: "fill-purple-700 dark:fill-purple-300",
    };
  }
  return {
    circleClassName:
      "fill-white dark:fill-slate-900 stroke-blue-500 dark:stroke-blue-400",
    textClassName: "fill-slate-800 dark:fill-slate-100",
    domainClassName: "fill-slate-600 dark:fill-slate-400",
  };
}
